"use client";

import GameBoard from "./game-board"
import { useEffect, useMemo, useState } from "react"
import { useGame } from "@/context/game-context";
import { handleEnterAction, validateChar, clearBackSpace, checkEndGame } from "@/lib/game-utils";
import { GameStateInterface } from "@/constants";

type GameProps = {
  allWords: string[]
}

function Game({ allWords }: GameProps) {
  const unidecode = require('unidecode');

  const { gameState, configurations, changeGameState, updateWord } = useGame()

  const filteredWords = useMemo(() => { return allWords.filter(w => w.length === configurations.wordSize) }, [configurations, gameState.match])
  const unidecodedWords = filteredWords.map(w => unidecode(w))

  const listOfWords = useMemo(() => Array.from({ length: configurations.numWords }, () => {
    const wordIndex = Math.floor(Math.random() * filteredWords.length)
    return filteredWords[wordIndex]
  }), [configurations, gameState.match])


  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const newState = { ...gameState }
    newState.answers = listOfWords
    newState.unidecodedWords = unidecodedWords
    changeGameState(newState)
  }, [configurations, gameState.match])


  function moveIndex(state: GameStateInterface, delta: number, size: number) {
    const newIndex = Math.max(Math.min(gameState.activeColumn + delta, size - 1), 0)
    const newState = { ...state }
    newState.activeColumn = newIndex
    return newState
  }

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      console.log('Current stage', gameState, event.key);
      if (validateChar(event.key)) {
        updateWord(gameState, event.key, configurations.wordSize)
      }

      else if (event.key === 'ArrowLeft') {
        const newState = moveIndex(gameState, -1, configurations.wordSize)
        changeGameState(newState)
      }

      else if (event.key === 'ArrowRight') {
        const newState = moveIndex(gameState, 1, configurations.wordSize)
        changeGameState(newState)
      }

      else if (event.key === 'Backspace') {
        const newState = clearBackSpace(gameState)
        changeGameState(newState)
      }
      else if (event.key === 'Enter') {
        const newState = handleEnterAction(gameState, configurations)
        if (newState) {
          changeGameState(newState)
          checkEndGame(newState, configurations)
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

