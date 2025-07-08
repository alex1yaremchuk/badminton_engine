# badminton-engine

Simulation engine for badminton matches and tournaments written in TypeScript.

## Installation

```bash
npm install badminton-engine
```

## Build from sources

```bash
npm install
npm run build
```

Compiled files will be placed into the `dist` directory and bundled to `engine.js`.

## Usage

```ts
import {
  simulateMatch,
  ConsoleLogger,
  HtmlLogger,
  MultiLogger,
  Player,
} from 'badminton-engine';

const playerA: Player = {
  name: 'Alice',
  technique: 8,
  mind: 7,
  physique: 8,
  emotion: 5,
  serve: 3,
};

const playerB: Player = {
  name: 'Bob',
  technique: 7,
  mind: 7,
  physique: 6,
  emotion: 7,
  serve: 6,
};

const consoleLogger = new ConsoleLogger(new Set(['match', 'game']), 'en');
const htmlLogger = new HtmlLogger(new Set(['match', 'game']), 'en');
const logger = new MultiLogger([consoleLogger, htmlLogger]);

const result = simulateMatch(playerA, playerB, logger);
console.log(result);
// HTML logger content is available via htmlLogger.toHtml();
```
Each logger accepts a language code (`'en'` or `'ru'`) and a set of log levels.
The snippet above runs a single match simulation, prints the results to the console and collects HTML output for further inspection.

## License

[MIT](LICENSE)
