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

export type LogLevel = 'rallyDetailed' | 'rally' | 'game' | 'match';

import type { Language } from './logMessages.js';

export interface Logger {
  language: Language;
  log(level: LogLevel, message: string): void;
}

export class ConsoleLogger implements Logger {
  constructor(
    private enabled: Set<LogLevel>,
    public language: Language = 'en',
  ) {}

  log(level: LogLevel, message: string): void {
    if (this.enabled.has(level)) {
      console.log(`[${level}] ${message}`);
    }
  }
}

export class HtmlLogger implements Logger {
  private logs: string[] = [];
  constructor(
    private enabled: Set<LogLevel>,
    public language: Language = 'en',
  ) {}

  log(level: LogLevel, message: string): void {
    if (this.enabled.has(level)) {
      this.logs.push(`<p>[${level}] ${message}</p>`);
    }
  }

  toHtml(): string {
    return this.logs.join('\n');
  }
}
