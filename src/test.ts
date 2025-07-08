import { simulateMatch } from "./match.js";
import {
  Player,
  ConsoleLogger,
  HtmlLogger,
  MultiLogger,
  LogLevel,
} from "./types.js";

const player1: Player = {
  name: "Alice",
  technique: 8,
  mind: 7,
  physique: 8,
  emotion: 5,
  serve: 3,
};
const player2: Player = {
  name: "Bob",
  technique: 7,
  mind: 7,
  physique: 6,
  emotion: 7,
  serve: 6,
};

const consoleLogger = new ConsoleLogger(
  new Set<LogLevel>(["game", "debug", "rallyDetailed", "rally", "match"]),
  "ru",
);
const htmlLogger = new HtmlLogger(
  new Set<LogLevel>(["game", "debug", "rallyDetailed", "rally", "match"]),
  "ru",
);
const logger = new MultiLogger([consoleLogger, htmlLogger]);

simulateMatch(player1, player2, logger);
console.log(htmlLogger.toHtml());
