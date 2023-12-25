"use client";

import { validateChar } from "@/lib/game-utils";
import { useGame } from "@/context/game-context";

export type KeyProps = {
    char: string,

}

function KeyBox({char}: KeyProps) {

    const {gameState, updateWord, configurations} = useGame()

    function handleOnClick(){
        if (validateChar(char)){
            console.log(gameState)
            updateWord(gameState, char.toLowerCase(), configurations.wordSize)
        }
    }

    return (
    <div className="bg-slate-800 p-1 rounded-sm text-lg text-white font-bold w-[32px] h-[32px] text-center hover:bg-slate-900">
        <button
        onClick={handleOnClick}>
            {char.toUpperCase()}
        </button>
    </div> );
}

export default KeyBox;