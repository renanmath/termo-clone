"use client";

import { checkEndGame, clearBackSpace, handleEnterAction, validateChar } from "@/lib/game-utils";
import { useGame } from "@/context/game-context";
import { BACKSPACE_SYMBOL, ENTER_SYMBOL } from "@/constants";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export type KeyProps = {
    char: string,

}

function KeyBox({ char }: KeyProps) {

    const { gameState, changeGameState, updateWord, configurations } = useGame()

    function handleOnClick() {
        if (validateChar(char)) {
            updateWord(gameState, char.toLowerCase(), configurations.wordSize)
        }
        else if (char.toLowerCase() === BACKSPACE_SYMBOL.toLowerCase()) {
            const newState = clearBackSpace(gameState)
            changeGameState(newState)
        }
        else if (char.toLowerCase() === ENTER_SYMBOL.toLowerCase()) {
            const newState = handleEnterAction(gameState, configurations)
            if (newState) {
                changeGameState(newState)
                checkEndGame(newState, configurations)
            }
        }
    }

    const baseCss = "text-white border p-1 bg-slate-900 rounded-sm font-bold text-center hover:bg-slate-800"

    return (

        <Button
            onClick={handleOnClick}
            className={cn("text-xs lg:text-lg w-[28px] lg:w-[32px] h-[28px] lg:h-[32px]", baseCss)}>
            {char.toUpperCase()}
        </Button>
    );
}

export default KeyBox;