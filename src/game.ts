import { Player, GameResult } from './types.js';
import { simulateRally } from './engine.js';

export function simulateGame(playerA: Player, playerB: Player, server: Player): GameResult {
  let scoreA = 0;
  let scoreB = 0;
  let serving = server;
  while (true) {
    const receiver = serving === playerA ? playerB : playerA;
    const { winner } = simulateRally(serving, receiver);
    if (winner === serving) {
      if (serving === playerA) scoreA++; else scoreB++;
    } else {
      if (receiver === playerA) scoreA++; else scoreB++;
      serving = receiver;
    }
    if ((scoreA >= 21 || scoreB >= 21) && Math.abs(scoreA - scoreB) >= 2) break;
    if (scoreA === 30 || scoreB === 30) break;
  }
  return { winner: scoreA > scoreB ? playerA : playerB, scoreA, scoreB };
}
