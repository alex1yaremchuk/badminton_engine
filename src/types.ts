export interface Player {
  name: string;
  technique: number;
  mind: number;
  physique: number;
  emotion: number;
  serve: number;
  fatigue?: number;
  emotionState?: number;
}

export interface RallyResult {
  winner: Player;
  log: number[];
}

export interface GameResult {
  winner: Player;
  scoreA: number;
  scoreB: number;
}

export interface MatchResult {
  winner: Player;
  games: GameResult[];
}

export type LogLevel = "debug" | "rallyDetailed" | "rally" | "game" | "match";

import type { Language } from "./logMessages.js";

export interface LogMessage {
  level: LogLevel;
  text: string;
}

export interface Logger {
  language: Language;
  log(message: LogMessage): void;
}

export class ConsoleLogger implements Logger {
  constructor(
    private enabled: Set<LogLevel>,
    public language: Language = "en",
  ) {}

  log(message: LogMessage): void {
    if (this.enabled.has(message.level)) {
      console.log(`[${message.level}] ${message.text}`);
    }
  }
}

export class HtmlLogger implements Logger {
  private logs: string[] = [];
  constructor(
    private enabled: Set<LogLevel>,
    public language: Language = "en",
  ) {}

  log(message: LogMessage): void {
    if (this.enabled.has(message.level)) {
      this.logs.push(`<p>[${message.level}] ${message.text}</p>`);
    }
  }

  toHtml(): string {
    return this.logs.join("");
  }
}

export class MultiLogger implements Logger {
  public language: Language;

  constructor(private loggers: Logger[], language?: Language) {
    this.language = language ?? this.loggers[0]?.language ?? "en";
  }

  log(message: LogMessage): void {
    for (const logger of this.loggers) {
      logger.log(message);
    }
  }
}
