export interface Player {
  name: string;
  technique: number;
  mind: number;
  physique: number;
  emotion: number;
  serve: number;
  fatigue?: number;
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

export interface Logger {
  log(level: LogLevel, message: string): void;
}

export class ConsoleLogger implements Logger {
  constructor(private enabled: Set<LogLevel>) {}

  log(level: LogLevel, message: string): void {
    if (this.enabled.has(level)) {
      console.log(`[${level}] ${message}`);
    }
  }
}
