import { Player, GameResult, Logger } from "./types.js";
import { simulateRally } from "./engine.js";
import { adjustByAttribute } from "./utils.js";
import { logMessages } from "./logMessages.js";

export function simulateGame(
  playerA: Player,
  playerB: Player,
  server: Player,
  logger?: Logger,
): GameResult {
  let scoreA = 0;
  let scoreB = 0;
  let serving = server;
  logger?.log(
    "game",
    logMessages.gameStart(logger?.language ?? "en", server.name),
  );
  while (true) {
    const scoreDiff = Math.abs(scoreA - scoreB);
    const scoreAny = Math.max(scoreA, scoreB);
    const isTenseMoment = scoreDiff <= 1 || scoreAny >= 19;
    if (isTenseMoment) {
      for (const p of [playerA, playerB]) {
        const clutchPenalty = adjustByAttribute(2, p.emotion);
        logger?.log(
          "rallyDetailed",
          logMessages.clutchValue(
            logger?.language ?? "en",
            p.name,
            clutchPenalty,
          ),
        );
        p.emotionState = (p.emotionState ?? 0) - clutchPenalty;
      }
    }

    logger?.log(
      "rallyDetailed",
      logMessages.beforeRally(
        logger?.language ?? "en",
        playerA.name,
        playerA.fatigue ?? 0,
        playerA.emotionState ?? 0,
        playerB.name,
        playerB.fatigue ?? 0,
        playerB.emotionState ?? 0,
      ),
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
    logger?.log(
      "game",
      logMessages.score(
        logger?.language ?? "en",
        scoreA,
        scoreB,
        serving.name,
      ),
    );
    if ((scoreA >= 21 || scoreB >= 21) && Math.abs(scoreA - scoreB) >= 2) break;
    if (scoreA === 30 || scoreB === 30) break;
  }
  const winner = scoreA > scoreB ? playerA : playerB;
  logger?.log(
    "game",
    logMessages.gameWinner(logger?.language ?? "en", winner.name),
  );
  return { winner, scoreA, scoreB };
}
