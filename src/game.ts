import { Player, GameResult, Logger } from './types.js';
import { simulateRally } from './engine.js';

export function simulateGame(
  playerA: Player,
  playerB: Player,
  server: Player,
  logger?: Logger
): GameResult {
  let scoreA = 0;
  let scoreB = 0;
  let serving = server;
  logger?.log('game', `Game start. Server ${server.name}`);
  while (true) {
    const receiver = serving === playerA ? playerB : playerA;
    const { winner } = simulateRally(serving, receiver, 5, 1, logger);
    if (winner === serving) {
      if (serving === playerA) scoreA++; else scoreB++;
    } else {
      if (receiver === playerA) scoreA++; else scoreB++;
      serving = receiver;
    }
    logger?.log('game', `${scoreA}-${scoreB} serving ${serving.name}`);
    if ((scoreA >= 21 || scoreB >= 21) && Math.abs(scoreA - scoreB) >= 2) break;
    if (scoreA === 30 || scoreB === 30) break;
  }
  const winner = scoreA > scoreB ? playerA : playerB;
  logger?.log('game', `Game winner ${winner.name}`);
  return { winner, scoreA, scoreB };
}
