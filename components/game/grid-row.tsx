import CharBox from "@/components/game/char-box";


type GridRowProps = {
    correctWord: string
    positionInGrid: number
}

function GridRow({ correctWord, positionInGrid = 0 }: GridRowProps) {
    
    return (
        <div className="flex justify-between gap-x-2 px-2 py-1">
            {correctWord.split("").map((char, index) => (
                <div key={index}>
                        <CharBox
                            correctChar={char}
                            currentValue="X"
                            isValidated={false}
                            positionInRow={index}
                            rowIndex={positionInGrid}
                            isSelected={positionInGrid==index} />
                </div>
            ))}
        </div>
    );
}

export default GridRow;