"use client";

import { cn } from "@/lib/utils"
import { useGame } from "@/context/game-context";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

type CharBoxProps = {
    correctChar: string
    currentValue: string
    positionInRow: number
    rowIndex: number
    gridIndex: number
}

function CharBox({ correctChar, currentValue = "", positionInRow = 0, rowIndex = 0, gridIndex = 0 }: CharBoxProps) {

    const [loading, setLoading] = useState(true)
    useEffect(() => { setLoading(false) }, [])

    const { gameState, changeGameState } = useGame()

    if (loading) {
        return null
    }

    const unidecode = require('unidecode');


    function handleOnClick() {
        const newGameState = { ...gameState }
        newGameState.activeColumn = positionInRow
        changeGameState(newGameState)
    }

    const isSelected = gameState.activeColumn == positionInRow
    const isValidated = gameState.activeRow > rowIndex
    const isCorrect = currentValue === unidecode(correctChar)
    const isPartialCorrect = !isCorrect && gameState.answers[gridIndex].includes(currentValue)

    let borderClass: string = "", backgroundClass: string = "", shadowClass: string = "";
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

    if (rowIndex > gameState.gridValidation[gridIndex]) {
        char = ""
        backgroundClass = "bg-slate-900"
    }

    shadowClass = isSelected ? "border-white" : "";
    const baseCss = "text-white border p-1 bg-slate-900 rounded-sm font-bold text-center hover:bg-slate-800"

    return (

        <Button
            onClick={handleOnClick}
            className={cn("text-xs lg:text-lg w-[24px] lg:w-[32px] h-[24px] lg:h-[32px]",baseCss, borderClass, backgroundClass, shadowClass)}>
            {char.toUpperCase()}
        </Button>
    );
}

export default CharBox;