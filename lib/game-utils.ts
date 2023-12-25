import { GameStateInterface } from "@/constants";

export function validateChar(char: string) {
  return /^[a-zA-Z]$/.test(char);
}

export function createNewWord(word: string[], index: number, char: string) {
  const newWord = [...word]
  newWord[index] = char
  return newWord
}

export function clearBackSpace(state: GameStateInterface) {

  let indexToClear: number = 0

  if (state.currentWord[state.activeColumn].trim() === "") {
    indexToClear = Math.max(state.activeColumn - 1, 0)

  }
  else {
    indexToClear = state.activeColumn
  }
  const newStage = { ...state }
  newStage.currentWord[indexToClear] = ""
  newStage.activeColumn = Math.max(indexToClear, 0)

  return newStage
}
