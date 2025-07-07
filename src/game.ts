import { Player, GameResult, Logger } from "./types.js";
import { simulateRally } from "./rally.js";
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
  let streakA = 0;
  let streakB = 0;
  // logger?.log(logMessages.gameStart(logger?.language ?? "en", server.name));
  while (true) {
    const prevScoreA = scoreA;
    const prevScoreB = scoreB;
    const scoreDiff = Math.abs(scoreA - scoreB);
    const isClose = scoreDiff <= 1;
    const tensePlayers: Player[] = [];
    if (isClose) {
      tensePlayers.push(playerA, playerB);
    }
    if (scoreA >= 19) tensePlayers.push(playerA);
    if (scoreB >= 19) tensePlayers.push(playerB);
    for (const p of tensePlayers) {
      const clutchPenalty = adjustByAttribute(2, p.emotion);
      logger?.log(
        logMessages.clutchValue(
          logger?.language ?? "en",
          p.name,
          clutchPenalty,
        ),
      );
      p.emotionState = (p.emotionState ?? 0) - clutchPenalty;
    }

    logger?.log(
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
    if (loser === playerA) {
      streakA++;
      streakB = 0;
      if (streakA <= 3) {
        const penalty = adjustByAttribute(0.5, playerA.emotion);
        playerA.emotionState = (playerA.emotionState ?? 0) - penalty;
      }
      playerB.emotionState = 0;
    } else {
      streakB++;
      streakA = 0;
      if (streakB <= 3) {
        const penalty = adjustByAttribute(0.5, playerB.emotion);
        playerB.emotionState = (playerB.emotionState ?? 0) - penalty;
      }
      playerA.emotionState = 0;
    }

    const reached11 =
      (scoreA === 11 && prevScoreA === 10) ||
      (scoreB === 11 && prevScoreB === 10);
    if (reached11) {
      playerA.emotionState = 0;
      playerB.emotionState = 0;
    }
    logger?.log(
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
  playerA.emotionState = 0;
  playerB.emotionState = 0;
  // logger?.log(logMessages.gameWinner(logger?.language ?? "en", winner.name));
  return { winner, scoreA, scoreB };
}
