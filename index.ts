import { open } from "node:fs/promises";
import { join as pathJoin } from "node:path";
import { Board, getPossibleRemainingWords } from "./wordle/analyzeBoard";

const boardInfo: Board = [
  [
    { letter: "d", state: "correctSpot" },
    { letter: "o", state: "correctSpot" },
    { letter: "u", state: "unused" },
    { letter: "g", state: "differentSpot" },
    { letter: "h", state: "unused" },
  ],
];

async function getWordleWords() {
  let fileHandle;
  try {
    fileHandle = await open(
      pathJoin(__dirname, "./wordle/allowed-answers.txt"),
      "r",
    );
    const allowedAnswerWords = [];
    for await (const line of fileHandle.readLines()) {
      allowedAnswerWords.push(line);
    }

    const possibleRemainingWords = getPossibleRemainingWords(
      boardInfo,
      allowedAnswerWords,
    );
    console.log("possible words", possibleRemainingWords);
  } finally {
    await fileHandle?.close();
  }
}

/**
 * NOTE: If this setup is updated to use actual Promises instead of transpiled code
 * the node process will exit before this promise is resolved. See: https://www.stefanjudis.com/today-i-learned/top-level-promise-handling-in-node-js/
 * The solution then would be to use top-level await:
 * ```ts
 * await getWordleWords();
 * ```
 * This just isn't possible currently due to the TypeScript and package module configuration
 */
// eslint-disable-next-line @typescript-eslint/no-floating-promises
getWordleWords().catch((err) => {
  console.error("There was an error trying to execute getWordleWords");
  console.error(err);
});
