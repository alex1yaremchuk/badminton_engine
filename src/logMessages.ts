export type Language = "en" | "ru";
import type { LogMessage, LogLevel } from './types.js';

function msg(level: LogLevel, text: string): LogMessage {
  return { level, text };
}

export const logMessages = {
  rallyStart: (lang: Language, server: string, first: number): LogMessage =>
    msg(
      'rally',
      lang === 'ru'
        ? `Розыгрыш начинается. Подает ${server}, первый удар ${first}`
        : `Rally starts. Server ${server} first ${first}`,
    ),
  rallyWinner: (lang: Language, winner: string, score: string): LogMessage =>
    msg('rally', lang === 'ru' ? `Очко выигрывает ${winner}. Счёт: ${score}` : `Rally winner ${winner}. Score is ${score}.`),
  rallyResponse: (
    lang: Language,
    player: string,
    quality: number,
    incoming: number,
  ) =>
    msg(
      'debug',
      lang === 'ru'
        ? `${player} отвечает ${quality.toFixed(2)} на ${incoming}`
        : `${player} responds ${quality.toFixed(2)} to ${incoming}`,
    ),
  gameStart: (lang: Language, server: string): LogMessage =>
    msg('game', lang === 'ru' ? `Начало гейма. Подает ${server}` : `Game start. Server ${server}`),
  clutchValue: (lang: Language, player: string, value: number): LogMessage =>
    msg('debug',
      lang === 'ru'
        ? `Показатель клатча для ${player} равен ${value} `
        : `Clutch value for ${player} is ${value} `,
    ),
  beforeRally: (
    lang: Language,
    aName: string,
    aFatigue: number,
    aEmotion: number,
    bName: string,
    bFatigue: number,
    bEmotion: number,
  ) =>
    msg(
      'debug',
      lang === 'ru'
        ? `Перед розыгрышем: ${aName} Уст:${aFatigue.toFixed(2)} Эм:${aEmotion.toFixed(
            2,
          )} | ${bName} Уст:${bFatigue.toFixed(2)} Эм:${bEmotion.toFixed(2)}`
        : `Before rally: ${aName} F:${aFatigue.toFixed(2)} E:${aEmotion.toFixed(
            2,
          )} | ${bName} F:${bFatigue.toFixed(2)} E:${bEmotion.toFixed(2)}`,
    ),
  score: (lang: Language, a: number, b: number, serving: string): LogMessage =>
    msg('rally', lang === 'ru' ? `${a}-${b} подает ${serving}` : `${a}-${b} serving ${serving}`),
  gameWinner: (lang: Language, winner: string): LogMessage =>
    msg('game', lang === 'ru' ? `Победа в гейме ${winner}` : `Game winner ${winner}`),
  matchStart: (lang: Language, a: string, b: string): LogMessage =>
    msg('game', lang === 'ru' ? `🏸 Матч: ${a} против ${b}` : `🏸 Match: ${a} vs ${b}`),
  gameFinished: (
    lang: Language,
    scoreA: number,
    scoreB: number,
    winner: string,
  ) =>
    msg(
      'game',
      lang === 'ru'
        ? `Гейм завершен ${scoreA}-${scoreB} победитель ${winner}`
        : `Game finished ${scoreA}-${scoreB} winner ${winner}`,
    ),
  matchWinner: (lang: Language, winner: string, loser: string, scores: number[]): LogMessage =>
    msg(
      'match',
      lang === 'ru'
        ? `🏆 ${winner} победил ${loser} (${scores.join(', ')})`
        : `🏆 ${winner} defeated  ${loser} (${scores.join(', ')})`,
    ),
  matchResultHeader: (lang: Language) =>
    msg('match', lang === 'ru' ? 'Результат матча:' : 'Match result:'),
  matchResultGame: (
    lang: Language,
    game: number,
    scoreA: number,
    scoreB: number,
    winner: string,
  ) =>
    msg(
      'game',
      lang === 'ru'
        ? `Гейм ${game}: ${scoreA}-${scoreB} победитель: ${winner}`
        : `Game ${game}: ${scoreA}-${scoreB} winner: ${winner}`,
    ),
} as const;
