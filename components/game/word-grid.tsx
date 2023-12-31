import GridRow from "@/components/game/grid-row";

type WordGridProps = {
    word: string,
    numRows: number
    gridIndex: number
}

function WordGrid({ word, numRows, gridIndex }: WordGridProps) {
    const arrayOfWords = Array.from({ length: numRows }, () => word)

    return (
        <div>
            {
                arrayOfWords.map((myWord, index) => (
                    <div key={index}>                        
                            <GridRow
                                correctWord={myWord}
                                positionInGrid={index}
                                gridIndex={gridIndex} />
                    </div>
                ))
            }
        </div>

    );
}

export default WordGrid;