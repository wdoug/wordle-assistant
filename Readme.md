# Wordle Assistant

A little project for fun for helping solve the New York Time's [Wordle game](https://www.nytimes.com/games/wordle/index.html).

## Setup

Setup steps:

1. Install [Node.js](https://nodejs.org)
2. Make sure you have `npm` installed (this should be bundled with Node.js). You can check by running `npm -v`
3. Clone this repo and cd into it
4. Run `npm install`
5. Run `npm run -s prepare`

## Testing

To run the tests in watch mode, run:

```sh
npm -s test
```

## Linting

If you install an eslint plugin in your editor you should be able to see lint errors inline next to your code. You can also run eslint from the command line with `npm run -s lint`

## TypeChecking

You should be able to configure your editor to show TypeScript type errors inline. Alternatively, you can run the type checker from the command line with:

```sh
npm run -s typecheck
```

## Running as a script

To run the index.ts file as a script run:

```sh
npm -s start
```
