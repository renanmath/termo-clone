import CharBox from "@/components/game/char-box";
import { useGame } from "@/context/game-context";


type GridRowProps = {
    correctWord: string
    positionInGrid: number
    gridIndex: number
}

function GridRow({ correctWord, positionInGrid = 0, gridIndex = 0 }: GridRowProps) {
    
    const { gameState } = useGame()
    const rowWord = positionInGrid < gameState.typedWords.length ? gameState.typedWords[positionInGrid] : positionInGrid === gameState.typedWords.length ? gameState.currentWord : ""
    
    return (
        <div className="flex justify-between px-1 lg:py-1">
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