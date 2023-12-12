"use client";

import WordGrid from "@/components/game/word-grid";
import { GameStateContextProvider } from "@/context/game-state-context";

type GameBoardProps = {
    listOfWords: string[]
    numRows: number
}

function GameBoard({ listOfWords, numRows }: GameBoardProps) {

    return (
            <div className="flex justify-between mx-32 gap-x-4 p-1 bg-gray-400">
                {listOfWords.map((word, index) => (
                    <div key={index}>
                        <WordGrid
                            word={word}
                            numRows={numRows} />
                    </div>
                ))}
            </div>
    );
}

export default GameBoard;