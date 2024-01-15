// type Output = {
//   possibleWordCount: number;
//   possibleRemainingWords: string[];
//   suggestedNextWords: string[];
// };

export type Character = {
  letter: string;
  state: "unused" | "correctSpot" | "differentSpot";
};

export type BoardWord = [Character, Character, Character, Character, Character];

export type Board = BoardWord[];

const wordLength = 5;

function processBoardInformation(board: Board) {
  const correctLetters = Array.from(Array(wordLength)) as (
    | string
    | undefined
  )[];
  type NotAllowedLetterLocations = { [character: string]: Set<number> };
  const notAllowedLetterLocations: NotAllowedLetterLocations = {};
  const unusedLetters = new Set();
  type LetterCount = { [character: string]: number };
  const knownLetterCounts: LetterCount = {};
  // TODO: Figure out multiple character
  for (const boardWord of board) {
    const knownWordLetterCounts: LetterCount = {};
    for (let i = 0; i < wordLength; i++) {
      const char = boardWord[i];
      if (!char) {
        throw new Error(
          `Unexpected missing board character. Tried to index a character at ${i} in a boardWord of length ${boardWord.length}`,
        );
      }

      if (char.state === "unused") {
        unusedLetters.add(char.letter);
      } else if (char.state === "correctSpot") {
        correctLetters[i] = char.letter;
        knownWordLetterCounts[char.letter] =
          (knownWordLetterCounts[char.letter] ?? 0) + 1;
        // Future proof in case additional valid states are added
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      } else if (char.state === "differentSpot") {
        knownWordLetterCounts[char.letter] =
          (knownWordLetterCounts[char.letter] ?? 0) + 1;

        if (!notAllowedLetterLocations[char.letter]) {
          notAllowedLetterLocations[char.letter] = new Set();
        }
        notAllowedLetterLocations[char.letter]?.add(i);
      }
    }
    // console.log("knownWordLetterCounts", knownWordLetterCounts);
    for (const letter of Object.keys(knownWordLetterCounts)) {
      knownLetterCounts[letter] = Math.max(
        knownWordLetterCounts[letter] ?? 0,
        knownLetterCounts[letter] ?? 0,
      );
    }
  }
  return {
    correctLetters,
    notAllowedLetterLocations,
    unusedLetters,
    knownLetterCounts,
  };
}

type BoardInfo = ReturnType<typeof processBoardInformation>;

function filterRemainingBoardWords(
  boardInfo: BoardInfo,
  possibleFinalWords: string[],
) {
  const {
    correctLetters,
    notAllowedLetterLocations,
    unusedLetters,
    knownLetterCounts,
  } = boardInfo;
  return possibleFinalWords.filter((possibleWord) => {
    type LetterCount = { [character: string]: number };
    const possibleWordLetterCounts: LetterCount = {};
    for (let i = 0; i < wordLength; i++) {
      const letter = possibleWord[i];
      if (!letter) {
        throw new Error(
          `Unexpected possible word ${possibleWord} that is shorter than the expected word length: ${wordLength}`,
        );
      }
      possibleWordLetterCounts[letter] =
        (possibleWordLetterCounts[letter] ?? 0) + 1;

      const correctLetter = correctLetters[i];
      if (
        (correctLetter && correctLetter !== letter) ||
        unusedLetters.has(letter) ||
        notAllowedLetterLocations[letter]?.has(i)
      ) {
        return false;
      }
    }

    for (const letter of Object.keys(knownLetterCounts)) {
      const possibleWordLetterCount = possibleWordLetterCounts[letter];
      const letterCount = knownLetterCounts[letter];
      if (
        !possibleWordLetterCount ||
        (typeof letterCount === "number" &&
          possibleWordLetterCount < letterCount)
      ) {
        return false;
      }
    }

    return true;
  });
}

export function getPossibleRemainingWords(
  board: Board,
  possibleFinalWords: string[],
) {
  const boardInfo = processBoardInformation(board);
  return filterRemainingBoardWords(boardInfo, possibleFinalWords);
}

export function analyzeBoard(
  board: Board,
  allowedInputWords: string[],
  possibleFinalWords: string[],
) {
  return {
    possibleRemainingWords: getPossibleRemainingWords(
      board,
      possibleFinalWords,
    ),
  };
}
