"use client";

import { cn } from "@/lib/utils"
import { useGameState } from "@/context/game-state-context";
import { useCallback, useState } from "react";
import { Button } from "../ui/button";

type CharBoxProps = {
    correctChar: string
    currentValue: string
    isValidated: boolean
    positionInRow: number
    isSelected: boolean
}

function CharBox({ correctChar, currentValue = "X", isValidated = false, positionInRow = 0, isSelected=false }: CharBoxProps) {

    
    const { gameState, changeGameState } = useGameState()

    const [char, setChar] = useState(gameState.currentChar)

    function handleOnClick(){
        const newGameState = {...gameState}
        newGameState.activeColumn = positionInRow
        changeGameState(newGameState)
    }


    const borderClass = isValidated ? "border-green-300 bg-slate-800" : "border-blue-900";
    const backgroundClass = currentValue === correctChar
        ? "bg-slate-300"
        : "bg-slate-900";
    const shadowClass = isSelected ? "border-pink-900" : "";


    return (

        <Button
            onClick={handleOnClick}
            className={cn("text-white border border-cyan-900 p-1 bg-slate-900 rounded-sm text-lg font-bold w-[32px] h-[32px] text-center hover:bg-slate-800", borderClass, backgroundClass, shadowClass)}>
            {char.toUpperCase()}
        </Button>
    );
}

export default CharBox;