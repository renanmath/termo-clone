"use client";

import { checkEndGame, clearBackSpace, handleEnterAction, validateChar } from "@/lib/game-utils";
import { useGame } from "@/context/game-context";
import { BACKSPACE_SYMBOL, ENTER_SYMBOL } from "@/constants";

export type KeyProps = {
    char: string,

}

function KeyBox({ char }: KeyProps) {

    const { gameState, changeGameState, updateWord, configurations } = useGame()

    function handleOnClick() {
        if (validateChar(char)) {
            console.log(gameState)
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

    return (
        <div className="bg-slate-800 p-1 rounded-sm text-lg text-white font-bold w-[32px] h-[32px] text-center hover:bg-slate-900">
            <button
                onClick={handleOnClick}>
                {char.toUpperCase()}
            </button>
        </div>);
}

export default KeyBox;