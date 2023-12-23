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

function CharBox({ correctChar, currentValue = "", positionInRow = 0, rowIndex = 0, gridIndex = 0 }: CharBoxProps) {

    const unidecode = require('unidecode');
    
    const { gameState, changeGameState } = useGameState()

    function handleOnClick() {
        const newGameState = { ...gameState }
        newGameState.activeColumn = positionInRow
        changeGameState(newGameState)
    }

    const isSelected = gameState.activeColumn == positionInRow
    const isValidated = gameState.activeRow > rowIndex
    const isCorrect = currentValue === unidecode(correctChar)
    const isPartialCorrect = !isCorrect && gameState.answers[gridIndex].includes(currentValue)

    let borderClass:string="", backgroundClass:string="", shadowClass:string="";
    let char = currentValue

    if (isValidated) {
        borderClass = "border-green-300";
        if (isCorrect) {
            backgroundClass = "bg-green-900";
            char = correctChar;
        } else if (isPartialCorrect) {
            backgroundClass = "bg-yellow-800";
        } else {
            backgroundClass = "bg-black";
        }
    } else {
        backgroundClass = "bg-slate-900";
    }
    
    if (rowIndex > gameState.gridValidation[gridIndex]){
        char = ""
        backgroundClass = "bg-slate-900"
    }

    shadowClass = isSelected ? "border-white" : "";

    return (

        <Button
            onClick={handleOnClick}
            className={cn("text-white border border-cyan-900 p-1 bg-slate-900 rounded-sm text-lg font-bold w-[32px] h-[32px] text-center hover:bg-slate-800", borderClass, backgroundClass, shadowClass)}>
            {char.toUpperCase()}
        </Button>
    );
}

export default CharBox;