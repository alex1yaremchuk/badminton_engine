import { Player, GameResult, Logger } from "./types.js";
import { simulateRally } from "./engine.js";
import { adjustByAttribute } from "./utils.js";

export function simulateGame(
  playerA: Player,
  playerB: Player,
  server: Player,
  logger?: Logger,
): GameResult {
  let scoreA = 0;
  let scoreB = 0;
  let serving = server;
  logger?.log("game", `Game start. Server ${server.name}`);
  while (true) {
    const scoreDiff = Math.abs(scoreA - scoreB);
    const scoreAny = Math.max(scoreA, scoreB);
    const isTenseMoment = scoreDiff <= 1 || scoreAny >= 19;
    if (isTenseMoment) {
      for (const p of [playerA, playerB]) {
        const clutchPenalty = adjustByAttribute(2, p.emotion);
        logger?.log(
          "rallyDetailed",
          `Clutch value for ${p.name} is ${clutchPenalty} `,
        );
        p.emotionState = (p.emotionState ?? 0) - clutchPenalty;
      }
    }

    logger?.log(
      "rallyDetailed",
      `Before rally: ${playerA.name} F:${(playerA.fatigue ?? 0).toFixed(
        2,
      )} E:${(playerA.emotionState ?? 0).toFixed(2)} | ` +
        `${playerB.name} F:${(playerB.fatigue ?? 0).toFixed(2)} E:${(
          playerB.emotionState ?? 0
        ).toFixed(2)}`,
    );

    const receiver = serving === playerA ? playerB : playerA;
    const { winner } = simulateRally(serving, receiver, 1, logger);
    const loser = winner === serving ? receiver : serving;
    if (winner === serving) {
      if (serving === playerA) scoreA++;
      else scoreB++;
    } else {
      if (receiver === playerA) scoreA++;
      else scoreB++;
      serving = receiver;
    }
    const penalty = adjustByAttribute(0.5, loser.emotion);
    loser.emotionState = (loser.emotionState ?? 0) - penalty;
    winner.emotionState = 0;
    logger?.log("game", `${scoreA}-${scoreB} serving ${serving.name}`);
    if ((scoreA >= 21 || scoreB >= 21) && Math.abs(scoreA - scoreB) >= 2) break;
    if (scoreA === 30 || scoreB === 30) break;
  }
  const winner = scoreA > scoreB ? playerA : playerB;
  logger?.log("game", `Game winner ${winner.name}`);
  return { winner, scoreA, scoreB };
}
