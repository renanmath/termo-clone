"use client";

import WordGrid from "@/components/game/word-grid";

type GameBoardProps = {
    listOfWords: string[]
    numRows: number
}

function GameBoard({ listOfWords, numRows }: GameBoardProps) {

    return (
            <div className="flex justify-center mx-12 mt-6 gap-x-4 p-1">
                {listOfWords.map((word, index) => (
                    <div key={index}>
                        <WordGrid
                            word={word}
                            numRows={numRows}
                            gridIndex={index} />
                    </div>
                ))}
            </div>
    );
}

export default GameBoard;