import { Player, RallyResult, Logger } from './types.js';

export function calculateResponse(
  player: Player,
  incoming: number,
  risk = 1,
  logger?: Logger
): number {
  const mean =
    (player.technique + player.mind + player.physique + player.emotion) / 4;
  let quality = (mean + (5 - incoming)) * risk;
  if (quality > 10) quality = 10;
  if (quality < 0) quality = 0;
  logger?.log('rallyDetailed', `${player.name} responds ${quality.toFixed(2)} to ${incoming}`);
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
  let incoming = server.serve;
  const log = [incoming];
  logger?.log('rally', `Rally starts. Server ${server.name} first ${incoming}`);
  while (true) {
    const response = calculateResponse(hitter, incoming, risk, logger);
    log.push(response);
    logger?.log('rallyDetailed', `${hitter.name} -> ${response.toFixed(2)}`);
    if (response >= 9) {
      logger?.log('rally', `Rally winner ${hitter.name}`);
      return { winner: hitter, log };
    }
    if (response <= 2) {
      logger?.log('rally', `Rally winner ${defender.name}`);
      return { winner: defender, log };
    }
    incoming = response;
    [hitter, defender] = [defender, hitter];
  }
}
