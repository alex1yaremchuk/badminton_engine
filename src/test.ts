import { simulateMatch } from './match.js';
import { Player } from './types.js';

const player1: Player = { name: 'Alice', technique: 8, mind: 7, physique: 8, emotion: 6 };
const player2: Player = { name: 'Bob', technique: 7, mind: 7, physique: 7, emotion: 7 };

const result = simulateMatch(player1, player2);
console.log('Match result:');
result.games.forEach((g, i) => {
  console.log(`Game ${i + 1}: ${g.scoreA}-${g.scoreB} winner: ${g.winner.name}`);
});
console.log(`Match winner: ${result.winner.name}`);
