import { Player, MatchResult, GameResult } from './types.js';
import { simulateGame } from './game.js';

export function simulateMatch(playerA: Player, playerB: Player): MatchResult {
  let startingServer = playerA;
  const games: GameResult[] = [];
  let winsA = 0;
  let winsB = 0;
  while (winsA < 2 && winsB < 2) {
    const result = simulateGame(playerA, playerB, startingServer);
    games.push(result);
    if (result.winner === playerA) winsA++; else winsB++;
    startingServer = startingServer === playerA ? playerB : playerA;
  }
  return { winner: winsA > winsB ? playerA : playerB, games };
}
