import { analyzeBoard, Board, BoardWord } from "./index";

describe("analyzeBoard", () => {
  it("works with everything empty", () => {
    const result = analyzeBoard([], [], []);
    expect(result.possibleRemainingWords).toEqual([]);
  });

  it("works with words but no board information", () => {
    const possibleFinalWords = ["abcde", "fghij"];
    const result = analyzeBoard([], [], possibleFinalWords);
    expect(result.possibleRemainingWords).toEqual(possibleFinalWords);
  });

  it("properly removes words with unused letters", () => {
    const possibleFinalWords = ["abcde", "fghij"];
    const unusedLetters = [..."aaaaa"];
    const board = [
      unusedLetters.map((l) => ({ letter: l, state: "unused" })),
    ] as Board;
    const result = analyzeBoard(board, [], possibleFinalWords);
    expect(result.possibleRemainingWords).toEqual(["fghij"]);
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
    const result = analyzeBoard(board, [], possibleFinalWords);
    expect(result.possibleRemainingWords).toEqual([]);
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
    const result = analyzeBoard(board, [], possibleFinalWords);
    expect(result.possibleRemainingWords).toEqual([]);
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
    const result = analyzeBoard(board, [], possibleFinalWords);
    expect(result.possibleRemainingWords).toEqual([]);
  });

  it.todo("properly removes words that have too many of a given letter");
});
