import GridRow from "@/components/game/grid-row";
import { useGameState } from "@/context/game-state-context";

type WordGridProps = {
    word: string,
    numRows: number
}

function WordGrid({ word, numRows }: WordGridProps) {
    const arrayOfWords = Array.from({ length: numRows }, () => word)
    const {gameState} = useGameState()

    return (
        <div>
            {
                arrayOfWords.map((myWord, index) => (
                    <div key={index}>
                        
                            <GridRow
                                correctWord={myWord}
                                selectedColumnIndex={gameState.activeColumn} />
                    </div>
                ))
            }
        </div>

    );
}

export default WordGrid;