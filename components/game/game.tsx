"use client";

import GameBoard from "./game-board"
import { useEffect, useMemo, useState } from "react"
import { useGameState } from "@/context/game-state-context";
import { validateChar } from "@/lib/game-utils";

type GameProps = {
  allWords: string[]
}

function Game({ allWords }: GameProps) {
  const wordSize = 5
  const numWords = 4

  const filteredWords = allWords.filter(w => w.length === wordSize)
  const listOfWords = useMemo(()=>Array.from({ length: numWords }, () => {
    const wordIndex = Math.floor(Math.random() * filteredWords.length)
    return filteredWords[wordIndex]
  }), [])

  const { gameState, changeGameState, updateWord } = useGameState()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      console.log('Current stage', gameState);
      if (validateChar(event.key)) {
        updateWord(gameState, event.key, wordSize)
      }

      else if (event.key === 'Backspace'){
        const newState = {...gameState}
        newState.currentWord[newState.activeColumn] = ""
        changeGameState(newState)
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [gameState]);

  useEffect(()=>{setLoading(false)}, [])

  if (loading){
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