import { Player, RallyResult } from './types.js';

export function calculateResponse(player: Player, incoming: number, risk = 1): number {
  const product = player.technique * player.mind * player.physique * player.emotion;
  let quality = (product / 1000) * ((10 - incoming) / 10) * risk;
  if (quality > 10) quality = 10;
  if (quality < 0) quality = 0;
  return quality;
}

export function simulateRally(server: Player, receiver: Player, firstShot = 5, risk = 1): RallyResult {
  let hitter = receiver;
  let defender = server;
  let incoming = firstShot;
  const log = [incoming];
  while (true) {
    const response = calculateResponse(hitter, incoming, risk);
    log.push(response);
    if (response >= 9) {
      return { winner: hitter, log };
    }
    if (response <= 2) {
      return { winner: defender, log };
    }
    incoming = response;
    [hitter, defender] = [defender, hitter];
  }
}
