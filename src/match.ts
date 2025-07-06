import { Player, MatchResult, GameResult, Logger } from "./types.js";
import { simulateGame } from "./game.js";
import { logMessages } from "./logMessages.js";

export function simulateMatch(
  playerA: Player,
  playerB: Player,
  logger?: Logger,
): MatchResult {
  let startingServer = playerA;
  const games: GameResult[] = [];
  let winsA = 0;
  let winsB = 0;
  logger?.log(
    logMessages.matchStart(
      logger?.language ?? "en",
      playerA.name,
      playerB.name,
    ),
  );
  while (winsA < 2 && winsB < 2) {
    const result = simulateGame(playerA, playerB, startingServer, logger);
    games.push(result);
    if (result.winner === playerA) winsA++;
    else winsB++;
    // logger?.log(
    //   'match',
    //   logMessages.gameFinished(
    //     logger?.language ?? 'en',
    //     result.scoreA,
    //     result.scoreB,
    //     result.winner.name,
    //   ),
    // );
    startingServer = startingServer === playerA ? playerB : playerA;
  }
  const winner = winsA > winsB ? playerA : playerB;
  // logger?.log("match", logMessages.matchResultHeader(logger?.language ?? "en"));
  games.forEach((g, i) =>
    logger?.log(
      logMessages.matchResultGame(
        logger?.language ?? "en",
        i + 1,
        g.scoreA,
        g.scoreB,
        g.winner.name,
      ),
    ),
  );
  const losingScores = games.map((g) => {
    if (g.winner === winner) {
      return g.winner === playerA ? g.scoreB : g.scoreA;
    }
    return -(g.winner === playerA ? g.scoreA : g.scoreB);
  });
  logger?.log(
    logMessages.matchWinner(
      logger?.language ?? "en",
      winner.name,
      losingScores,
    ),
  );
  return { winner, games };
}
