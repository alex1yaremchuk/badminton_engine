export interface Player {
  name: string;
  technique: number;
  mind: number;
  physique: number;
  emotion: number;
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
