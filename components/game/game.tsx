"use client";

import GameBoard from "./game-board"
import { useEffect, useState } from "react"
import { useGameState } from "@/context/game-state-context";

type GameProps = {
  allWords: string[]
}

function Game({ allWords }: GameProps) {
  const wordSize = 5
  const numWords = 4

  const filteredWords = allWords.filter(w => w.length === wordSize)
  const listOfWords = Array.from({ length: numWords }, () => {
    const wordIndex = Math.floor(Math.random() * filteredWords.length)
    return filteredWords[wordIndex]
  })

  const { gameState, changeGameState } = useGameState()
  console.log("Rendering Game")
  const [loading, setLoading] = useState(true)

  function validateChar(char: string) {
    return /^[a-zA-Z]$/.test(char);
  }

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      console.log('Current stage', gameState);
      if (validateChar(event.key)) {
        const newState = { ...gameState }
        newState.currentChar = event.key
        console.log("New State", newState)
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