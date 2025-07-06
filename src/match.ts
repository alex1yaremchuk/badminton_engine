import { Player, MatchResult, GameResult, Logger } from './types.js';
import { simulateGame } from './game.js';
import { logMessages } from './logMessages.js';

export function simulateMatch(
  playerA: Player,
  playerB: Player,
  logger?: Logger
): MatchResult {
  let startingServer = playerA;
  const games: GameResult[] = [];
  let winsA = 0;
  let winsB = 0;
  logger?.log(
    'match',
    logMessages.matchStart(
      logger?.language ?? 'en',
      playerA.name,
      playerB.name,
    ),
  );
  while (winsA < 2 && winsB < 2) {
    const result = simulateGame(playerA, playerB, startingServer, logger);
    games.push(result);
    if (result.winner === playerA) winsA++; else winsB++;
    logger?.log(
      'match',
      logMessages.gameFinished(
        logger?.language ?? 'en',
        result.scoreA,
        result.scoreB,
        result.winner.name,
      ),
    );
    startingServer = startingServer === playerA ? playerB : playerA;
  }
  const winner = winsA > winsB ? playerA : playerB;
  logger?.log(
    'match',
    logMessages.matchWinner(logger?.language ?? 'en', winner.name),
  );
  return { winner, games };
}
