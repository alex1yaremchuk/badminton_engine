export type Language = 'en' | 'ru';

export const logMessages = {
  rallyStart: (lang: Language, server: string, first: number) =>
    lang === 'ru'
      ? `Розыгрыш начинается. Подает ${server}, первый удар ${first}`
      : `Rally starts. Server ${server} first ${first}`,
  rallyWinner: (lang: Language, winner: string) =>
    lang === 'ru'
      ? `Очко выигрывает ${winner}`
      : `Rally winner ${winner}`,
  rallyResponse: (
    lang: Language,
    player: string,
    quality: number,
    incoming: number,
  ) =>
    lang === 'ru'
      ? `${player} отвечает ${quality.toFixed(2)} на ${incoming}`
      : `${player} responds ${quality.toFixed(2)} to ${incoming}`,
  gameStart: (lang: Language, server: string) =>
    lang === 'ru'
      ? `Начало игры. Подает ${server}`
      : `Game start. Server ${server}`,
  clutchValue: (lang: Language, player: string, value: number) =>
    lang === 'ru'
      ? `Показатель клатча для ${player} равен ${value} `
      : `Clutch value for ${player} is ${value} `,
  beforeRally: (
    lang: Language,
    aName: string,
    aFatigue: number,
    aEmotion: number,
    bName: string,
    bFatigue: number,
    bEmotion: number,
  ) =>
    lang === 'ru'
      ? `Перед розыгрышем: ${aName} Уст:${aFatigue.toFixed(2)} Эм:${aEmotion.toFixed(
          2,
        )} | ${bName} Уст:${bFatigue.toFixed(2)} Эм:${bEmotion.toFixed(2)}`
      : `Before rally: ${aName} F:${aFatigue.toFixed(2)} E:${aEmotion.toFixed(
          2,
        )} | ${bName} F:${bFatigue.toFixed(2)} E:${bEmotion.toFixed(2)}`,
  score: (lang: Language, a: number, b: number, serving: string) =>
    lang === 'ru'
      ? `${a}-${b} подает ${serving}`
      : `${a}-${b} serving ${serving}`,
  gameWinner: (lang: Language, winner: string) =>
    lang === 'ru' ? `Победа в игре ${winner}` : `Game winner ${winner}`,
  matchStart: (lang: Language, a: string, b: string) =>
    lang === 'ru'
      ? `Матч начинается ${a} против ${b}`
      : `Match start ${a} vs ${b}`,
  gameFinished: (
    lang: Language,
    scoreA: number,
    scoreB: number,
    winner: string,
  ) =>
    lang === 'ru'
      ? `Игра окончена ${scoreA}-${scoreB} победитель ${winner}`
      : `Game finished ${scoreA}-${scoreB} winner ${winner}`,
  matchWinner: (lang: Language, winner: string) =>
    lang === 'ru' ? `Матч выиграл ${winner}` : `Match winner ${winner}`,
  matchResultHeader: (lang: Language) =>
    lang === 'ru' ? 'Результат матча:' : 'Match result:',
  matchResultGame: (
    lang: Language,
    game: number,
    scoreA: number,
    scoreB: number,
    winner: string,
  ) =>
    lang === 'ru'
      ? `Игра ${game}: ${scoreA}-${scoreB} победитель: ${winner}`
      : `Game ${game}: ${scoreA}-${scoreB} winner: ${winner}`,
} as const;
