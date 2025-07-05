import { Player, MatchResult, GameResult, Logger } from './types.js';
import { simulateGame } from './game.js';

export function simulateMatch(
  playerA: Player,
  playerB: Player,
  logger?: Logger
): MatchResult {
  let startingServer = playerA;
  const games: GameResult[] = [];
  let winsA = 0;
  let winsB = 0;
  logger?.log('match', `Match start ${playerA.name} vs ${playerB.name}`);
  while (winsA < 2 && winsB < 2) {
    const result = simulateGame(playerA, playerB, startingServer, logger);
    games.push(result);
    if (result.winner === playerA) winsA++; else winsB++;
    logger?.log(
      'match',
      `Game finished ${result.scoreA}-${result.scoreB} winner ${result.winner.name}`
    );
    startingServer = startingServer === playerA ? playerB : playerA;
  }
  const winner = winsA > winsB ? playerA : playerB;
  logger?.log('match', `Match winner ${winner.name}`);
  return { winner, games };
}
