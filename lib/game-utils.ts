"use client";

import { toast } from "@/components/ui/use-toast";
import { BIG_M, GameConfigurationInterface, GameStateInterface, MAX_WORD_SIZE } from "@/constants";

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

export function checkEndGame(gameState: GameStateInterface, configurations: GameConfigurationInterface){
  const maxRows = configurations.numWords + configurations.wordSize + configurations.adtionalRows
  
  let getAllAnswers = true
  for (let i=0; i< configurations.numWords; i++){
    if (gameState.gridValidation[i] === BIG_M){
      getAllAnswers = false
    }
  }
  
  if ((gameState.typedWords.length === maxRows) || getAllAnswers){
    toast({
      title: "Fim de Jogo",
      description: "Resposta:\n" + gameState.answers.join(", ")
    })
  }
}

export function handleEnterAction(gameState: GameStateInterface, configurations:GameConfigurationInterface) {
  const newState = { ...gameState }
  const typedWord = newState.currentWord.join("")
  const unidecode = require('unidecode');

  if (newState.unidecodedWords.includes(typedWord)) {
    newState.activeRow = newState.activeRow + 1
    newState.typedWords.push(typedWord)
    newState.currentWord = Array.from({ length: MAX_WORD_SIZE }, () => "")
    newState.activeColumn = 0

    for (let i = 0; i < configurations.numWords; i++) {
      if (unidecode(newState.answers[i]) == typedWord) {
        newState.gridValidation[i] = newState.activeRow - 1
      }
    }
    return newState
  }
  else {
    toast({ title: "Ops!",
    description: "Não é uma palavra válida" })
  }
  return null
}