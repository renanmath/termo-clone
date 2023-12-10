import GridRow from "@/components/game/grid-row";

type WordGridProps = {
    word: string,
    numRows: number
}

function WordGrid({ word, numRows }: WordGridProps) {
    const arrayOfWords = Array.from({ length: numRows }, () => word)

    return (
        <div>
            {
                arrayOfWords.map((myWord, index) => (
                    <div key={index}>
                        <GridRow
                            correctWord={myWord}
                            selectedBoxIndex={0} />
                    </div>
                ))
            }
        </div>

    );
}

export default WordGrid;