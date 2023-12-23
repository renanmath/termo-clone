"use client";

import GameBoard from "./game-board"
import { useEffect, useMemo, useState } from "react"
import { useGame } from "@/context/game-context";
import { validateChar } from "@/lib/game-utils";
import { GameStateInterface, MAX_WORD_SIZE } from "@/constants";

type GameProps = {
  allWords: string[]
}

function Game({ allWords }: GameProps) {
  const unidecode = require('unidecode');

  const { gameState,configurations, changeGameState, updateWord } = useGame()

  const filteredWords = allWords.filter(w => w.length === configurations.wordSize)
  const unidecodedWords = filteredWords.map(w => unidecode(w))

  const listOfWords = useMemo(() => Array.from({ length: configurations.numWords }, () => {
    const wordIndex = Math.floor(Math.random() * filteredWords.length)
    return filteredWords[wordIndex]
  }), [])

  
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
        updateWord(gameState, event.key, configurations.wordSize)
      }

      else if (event.key=== 'ArrowLeft'){
        const newState = moveIndex(gameState, -1,configurations.wordSize)
        changeGameState(newState)
      }

      else if (event.key=== 'ArrowRight'){
        const newState = moveIndex(gameState, 1,configurations.wordSize)
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

          for (let i = 0; i < configurations.numWords; i++) {
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
  }, [gameState, configurations]);

  useEffect(() => { setLoading(false) }, [])

  if (loading) {
    return null
  }

  return (
    <div>
      <GameBoard
        listOfWords={listOfWords}
        numRows={configurations.wordSize + configurations.numWords + configurations.adtionalRows} />
    </div>
  );
}

export default Game;