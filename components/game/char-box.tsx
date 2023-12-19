"use client";

import { cn } from "@/lib/utils"
import { useGameState } from "@/context/game-state-context";
import { Button } from "../ui/button";

type CharBoxProps = {
    correctChar: string
    currentValue: string
    positionInRow: number
    rowIndex: number
    gridIndex: number
}

function CharBox({ correctChar, currentValue = "", positionInRow = 0, rowIndex = 0, gridIndex = 0}: CharBoxProps) {

    
    const { gameState, changeGameState } = useGameState()

    function handleOnClick(){
        const newGameState = {...gameState}
        newGameState.activeColumn = positionInRow
        changeGameState(newGameState)
    }

    const isSelected = gameState.activeColumn == positionInRow
    const isValidated = gameState.activeRow > rowIndex
    const isCorrect = currentValue === correctChar
    const isPartialCorrect = !isCorrect && gameState.answers[gridIndex].includes(currentValue)

    const borderClass = isValidated ? "border-green-300" : "border-blue-900";
    const backgroundClass = isCorrect && isValidated
        ? "bg-green-900"
        : isPartialCorrect && isValidated? "bg-yellow-800" : "bg-slate-900";
    const shadowClass = isSelected ? "border-pink-900" : "";


    return (

        <Button
            onClick={handleOnClick}
            className={cn("text-white border border-cyan-900 p-1 bg-slate-900 rounded-sm text-lg font-bold w-[32px] h-[32px] text-center hover:bg-slate-800", borderClass, backgroundClass, shadowClass)}>
            {currentValue.toUpperCase()}
        </Button>
    );
}

export default CharBox;