"use client";

import GameBoard from "./game-board"
import { useEffect, useMemo, useState } from "react"
import { useGameState } from "@/context/game-state-context";
import { validateChar } from "@/lib/game-utils";
import { GameStateInterface, MAX_WORD_SIZE } from "@/constants";

type GameProps = {
  allWords: string[]
}

function Game({ allWords }: GameProps) {
  const unidecode = require('unidecode');

  const wordSize = 5
  const numWords = 4

  const filteredWords = allWords.filter(w => w.length === wordSize)
  const unidecodedWords = filteredWords.map(w => unidecode(w))

  const listOfWords = useMemo(() => Array.from({ length: numWords }, () => {
    const wordIndex = Math.floor(Math.random() * filteredWords.length)
    return filteredWords[wordIndex]
  }), [])

  const { gameState, changeGameState, updateWord } = useGameState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const newState = { ...gameState }
    newState.answers = listOfWords
    changeGameState(newState)
  }, [])

  function clearBackSpace(state: GameStateInterface) {

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

  function moveIndex(state: GameStateInterface, delta:number, size:number){
    const newIndex = Math.max(Math.min(gameState.activeColumn + delta,size-1),0)
    const newState = {...state}
    newState.activeColumn = newIndex
    return newState
  }


  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      console.log('Current stage', gameState, event.key);
      if (validateChar(event.key)) {
        updateWord(gameState, event.key, wordSize)
      }

      else if (event.key=== 'ArrowLeft'){
        const newState = moveIndex(gameState, -1,wordSize)
        changeGameState(newState)
      }

      else if (event.key=== 'ArrowRight'){
        const newState = moveIndex(gameState, 1,wordSize)
        changeGameState(newState)
      }

      else if (event.key === 'Backspace') {
        const newState = clearBackSpace(gameState)
        changeGameState(newState)
      }
      else if (event.key === 'Enter') {

        const newState = { ...gameState }
        const typedWord = newState.currentWord.join("")

        if (unidecodedWords.includes(typedWord)) {
          newState.activeRow = newState.activeRow + 1
          newState.typedWords.push(typedWord)
          newState.currentWord = Array.from({ length: MAX_WORD_SIZE }, () => "")
          newState.activeColumn = 0

          for (let i = 0; i < numWords; i++) {
            if (unidecode(newState.answers[i]) == typedWord) {
              newState.gridValidation[i] = newState.activeRow-1
            }
          }

          changeGameState(newState)
        }
        // TODO: use toast here
        else {
          console.log("Não é uma palavra válida")
        }
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [gameState]);

  useEffect(() => { setLoading(false) }, [])

  if (loading) {
    return null
  }

  return (
    <div>
      <GameBoard
        listOfWords={listOfWords}
        numRows={wordSize + numWords} />
    </div>
  );
}

export default Game;