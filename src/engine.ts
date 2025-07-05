import { Player, RallyResult, Logger } from './types.js';

export function calculateResponse(
  player: Player,
  incoming: number,
  risk = 1,
  rallyFatigue = 0,
  logger?: Logger
): number {
  const globalFatigue = player.fatigue ?? 0;
  const physique = Math.max(0, player.physique - globalFatigue - rallyFatigue);
  const mean =
    (player.technique + player.mind + physique + player.emotion) / 4;
  let quality = (mean + (5 - incoming)) * risk;
  quality += Math.random() * 4 - 2;
  if (quality > 10) quality = 10;
  if (quality < 0) quality = 0;
  logger?.log(
    'rallyDetailed',
    `${player.name} responds ${quality.toFixed(2)} to ${incoming}`
  );
  return quality;
}

export function simulateRally(
  server: Player,
  receiver: Player,
  risk = 1,
  logger?: Logger
): RallyResult {
  let hitter = receiver;
  let defender = server;
  const rallyFatigue = new Map<Player, number>([
    [server, 0],
    [receiver, 0],
  ]);
  let incoming = server.serve + Math.random() * 4 - 2;
  rallyFatigue.set(server, 0.2);
  const log = [incoming];
  logger?.log('rally', `Rally starts. Server ${server.name} first ${incoming}`);
  const finishRally = (winner: Player): RallyResult => {
    for (const p of [server, receiver]) {
      const f = rallyFatigue.get(p) ?? 0;
      p.fatigue = (p.fatigue ?? 0) + f * 0.1;
      rallyFatigue.set(p, 0);
    }
    logger?.log('rally', `Rally winner ${winner.name}`);
    return { winner, log };
  };
  while (true) {
    const hitterFatigue = rallyFatigue.get(hitter) ?? 0;
    const response = calculateResponse(hitter, incoming, risk, hitterFatigue, logger);
    log.push(response);
    if (response >= 9) {
      return finishRally(hitter);
    }
    if (response <= 2) {
      return finishRally(defender);
    }
    incoming = response;
    rallyFatigue.set(hitter, hitterFatigue + 0.2);
    [hitter, defender] = [defender, hitter];
  }
}
