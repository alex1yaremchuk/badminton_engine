import { Player, RallyResult, Logger } from "./types.js";
import { adjustByAttribute } from "./utils.js";
import { logMessages } from "./logMessages.js";

function formatRallyLog(
  server: Player,
  receiver: Player,
  log: number[],
): [string, string] {
  const width = 2;
  const gap = "";

  const maxNameLength = Math.max(server.name.length, receiver.name.length);

  let lineServer = `${server.name.padEnd(maxNameLength, " ")}: `;
  let lineReceiver = `${receiver.name.padEnd(maxNameLength, " ")}: `;
  for (let i = 0; i < log.length; i++) {
    const val = log[i].toFixed(1).padStart(width);
    if (i % 2 === 0) {
      lineServer += gap + val;
      lineReceiver += gap + " ".repeat(width);
    } else {
      lineReceiver += gap + val;
      lineServer += gap + " ".repeat(width);
    }
  }
  return [lineServer, lineReceiver];
}

export function calculateResponse(
  player: Player,
  incoming: number,
  risk = 1,
  rallyFatigue = 0,
  logger?: Logger,
): number {
  const globalFatigue = player.fatigue ?? 0;
  const physique = Math.max(0, player.physique - globalFatigue - rallyFatigue);
  const emotion = Math.max(0, player.emotion + (player.emotionState ?? 0));
  const mean = (player.technique + player.mind + physique + emotion) / 4;
  let quality = (mean + (5 - incoming)) * risk;
  quality += Math.random() * 4 - 2;
  if (quality > 10) quality = 10;
  if (quality < 0) quality = 0;
  // logging of every stroke is removed; rally summary will be logged at the end
  // with the new compact representation
  return quality;
}

export function simulateRally(
  server: Player,
  receiver: Player,
  risk = 1,
  logger?: Logger,
): RallyResult {
  let hitter = receiver;
  let defender = server;
  const rallyFatigue = new Map<Player, number>([
    [server, 0],
    [receiver, 0],
  ]);
  const serveEmotion = Math.max(0, server.emotion + (server.emotionState ?? 0));
  let incoming = (server.serve + serveEmotion) / 2 + Math.random() * 4 - 2;
  rallyFatigue.set(server, 0.2);
  const log = [incoming];
  const finishRally = (winner: Player): RallyResult => {
    for (const p of [server, receiver]) {
      const f = rallyFatigue.get(p) ?? 0;
      const baseFatigue = f * 0.1;
      const fatigueGain = adjustByAttribute(baseFatigue, p.physique);
      p.fatigue = (p.fatigue ?? 0) + fatigueGain;
      rallyFatigue.set(p, 0);
    }
    const [line1, line2] = formatRallyLog(server, receiver, log);
    logger?.log({ level: "rallyDetailed", text: line1 });
    logger?.log({ level: "rallyDetailed", text: line2 });
    logger?.log(
      logMessages.rallyWinner(logger?.language ?? "en", winner.name),
    );
    return { winner, log };
  };
  while (true) {
    const hitterFatigue = rallyFatigue.get(hitter) ?? 0;
    const response = calculateResponse(
      hitter,
      incoming,
      risk,
      hitterFatigue,
      logger,
    );
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
