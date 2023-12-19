import CharBox from "@/components/game/char-box";
import { useGameState } from "@/context/game-state-context";


type GridRowProps = {
    correctWord: string
    positionInGrid: number
    gridIndex: number
}

function GridRow({ correctWord, positionInGrid = 0, gridIndex = 0 }: GridRowProps) {
    
    const { gameState } = useGameState()
    const rowWord = positionInGrid < gameState.typedWords.length ? gameState.typedWords[positionInGrid] : positionInGrid === gameState.typedWords.length ? gameState.currentWord : ""
    
    return (
        <div className="flex justify-between gap-x-2 px-2 py-1">
            {correctWord.split("").map((char, index) => (
                <div key={index}>
                        <CharBox
                            correctChar={char}
                            currentValue={rowWord[index]}
                            positionInRow={index}
                            rowIndex={positionInGrid}
                            gridIndex={gridIndex}
                             />
                </div>
            ))}
        </div>
    );
}

export default GridRow;