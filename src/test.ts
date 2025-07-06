import { simulateMatch } from "./match.js";
import { Player, ConsoleLogger, LogLevel } from "./types.js";

const player1: Player = {
  name: "Alice",
  technique: 8,
  mind: 7,
  physique: 8,
  emotion: 4,
  serve: 3,
};
const player2: Player = {
  name: "Bob",
  technique: 8,
  mind: 7,
  physique: 5,
  emotion: 7,
  serve: 5,
};

const logger = new ConsoleLogger(
  new Set<LogLevel>(["rallyDetailed", "rally", "game", "match"]),
  "ru",
);

const result = simulateMatch(player1, player2, logger);
console.log("Match result:");
result.games.forEach((g, i) => {
  console.log(
    `Game ${i + 1}: ${g.scoreA}-${g.scoreB} winner: ${g.winner.name}`,
  );
});
console.log(`Match winner: ${result.winner.name}`);
