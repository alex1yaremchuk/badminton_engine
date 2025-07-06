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
  technique: 7,
  mind: 7,
  physique: 5,
  emotion: 7,
  serve: 5,
};

const logger = new ConsoleLogger(
  new Set<LogLevel>(["game", "rally"]),
  // "rallyDetailed", "rally", "game",
  "ru",
);
simulateMatch(player1, player2, logger);
