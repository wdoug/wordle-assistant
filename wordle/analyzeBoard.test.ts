import { getPossibleRemainingWords, Board, BoardWord } from "./analyzeBoard";

describe("getPossibleRemainingWords", () => {
  it("works with everything empty", () => {
    const result = getPossibleRemainingWords([], []);
    expect(result).toEqual([]);
  });

  it("works with words but no board information", () => {
    const possibleFinalWords = ["abcde", "fghij"];
    const result = getPossibleRemainingWords([], possibleFinalWords);
    expect(result).toEqual(possibleFinalWords);
  });

  it("properly removes words with unused letters", () => {
    const possibleFinalWords = ["abcde", "fdsaj", "fghij"];
    const unusedLetters = [..."aaaaa"];
    const board = [
      unusedLetters.map((l) => ({ letter: l, state: "unused" })),
    ] as Board;
    const result = getPossibleRemainingWords(board, possibleFinalWords);
    expect(result).toEqual(["fghij"]);
  });

  it("properly removes words with letters in the wrong place", () => {
    const possibleFinalWords = ["abcde"];
    const boardWord: BoardWord = [
      { letter: "a", state: "differentSpot" },
      { letter: "z", state: "unused" },
      { letter: "z", state: "unused" },
      { letter: "z", state: "unused" },
      { letter: "z", state: "unused" },
    ];
    const board = [boardWord];
    const result = getPossibleRemainingWords(board, possibleFinalWords);
    expect(result).toEqual([]);
  });

  it("properly removes words missing letters in the right place", () => {
    const possibleFinalWords = ["abcde"];
    const boardWord: BoardWord = [
      { letter: "b", state: "correctSpot" },
      { letter: "z", state: "unused" },
      { letter: "z", state: "unused" },
      { letter: "z", state: "unused" },
      { letter: "z", state: "unused" },
    ];
    const board = [boardWord];
    const result = getPossibleRemainingWords(board, possibleFinalWords);
    expect(result).toEqual([]);
  });

  it("properly removes words that are missing a required letter", () => {
    const possibleFinalWords = ["abcde"];
    const boardWord: BoardWord = [
      { letter: "f", state: "differentSpot" },
      { letter: "z", state: "unused" },
      { letter: "z", state: "unused" },
      { letter: "z", state: "unused" },
      { letter: "z", state: "unused" },
    ];
    const board = [boardWord];
    const result = getPossibleRemainingWords(board, possibleFinalWords);
    expect(result).toEqual([]);
  });

  it("properly handles information from multiple board words", () => {
    const possibleFinalWords = ["abcde", "defgh", "afghi", "abcfg"];
    const board: Board = [
      [
        { letter: "f", state: "differentSpot" },
        { letter: "z", state: "unused" },
        { letter: "z", state: "unused" },
        { letter: "z", state: "unused" },
        { letter: "z", state: "unused" },
      ],
      [
        { letter: "a", state: "correctSpot" },
        { letter: "z", state: "unused" },
        { letter: "z", state: "unused" },
        { letter: "z", state: "unused" },
        { letter: "z", state: "unused" },
      ],
      [
        { letter: "z", state: "unused" },
        { letter: "z", state: "unused" },
        { letter: "z", state: "unused" },
        { letter: "z", state: "unused" },
        { letter: "i", state: "unused" },
      ],
    ];
    const result = getPossibleRemainingWords(board, possibleFinalWords);
    expect(result).toEqual(["abcfg"]);
  });

  it("properly removes words that have too many of a given letter", () => {
    const possibleFinalWords = ["mummy"];
    const boardWord: BoardWord = [
      { letter: "m", state: "correctSpot" },
      { letter: "o", state: "unused" },
      { letter: "m", state: "correctSpot" },
      { letter: "z", state: "unused" },
      { letter: "m", state: "unused" },
    ];
    const board = [boardWord];
    const result = getPossibleRemainingWords(board, possibleFinalWords);
    expect(result).toEqual([]);
  });

  it("should work properly for second unused letter", () => {
    const possibleFinalWords = ["leggy"];
    const board: Board = [
      [
        { letter: "e", state: "differentSpot" },
        { letter: "l", state: "differentSpot" },
        { letter: "v", state: "unused" },
        { letter: "e", state: "unused" },
        { letter: "n", state: "unused" },
      ],
    ];
    const result = getPossibleRemainingWords(board, possibleFinalWords);
    expect(result).toEqual(["leggy"]);
  });
});
