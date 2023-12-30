"use client";

import WordGrid from "@/components/game/word-grid";

type GameBoardProps = {
    listOfWords: string[]
    numRows: number
}

function GameBoard({ listOfWords, numRows }: GameBoardProps) {

    return (
            <div className="flex flex-wrap gap-x-1 justify-center">
                {listOfWords.map((word, index) => (
                    <div key={index}
                    className="sm:w-1/2 md:w-1/4 p-2 mx-4">
                        <WordGrid
                            word={word}
                            numRows={numRows}
                            gridIndex={index}
                             />
                    </div>
                ))}
            </div>
    );
}

export default GameBoard;