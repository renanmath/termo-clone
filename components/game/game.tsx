"use client";

import { WordData } from "@/constants"
import GameBoard from "./game-board"
import { useEffect, useMemo } from "react"
import { useGameState } from "@/context/game-state-context";

type GameProps = {
    allWordData: WordData[]
}

function Game({ allWordData }: GameProps) {    
    const wordSize = 5
    const numWords = 4
    const frequencyThreshold = 10000

    const allWords = useMemo(() => allWordData.filter(data => data.frequency >= frequencyThreshold).map(data => data.word), [allWordData, frequencyThreshold]);


    const filteredWords = allWords.filter(w => w.length === wordSize)
    const listOfWords = Array.from({ length: numWords }, () => {
        const wordIndex = Math.floor(Math.random() * filteredWords.length)
        return filteredWords[wordIndex]
    })

    const {gameState, changeGameState} = useGameState()
    console.log("Rendering Game")

    function validateChar(char:string) {
      return /^[a-zA-Z]$/.test(char);
    }

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
          console.log('Current stage', gameState);
          if (validateChar(event.key)){
            const newState = {...gameState}
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
    

    return (
        <div>
            <GameBoard
                listOfWords={listOfWords}
                numRows={wordSize + numWords} />
        </div>
    );
}

export default Game;