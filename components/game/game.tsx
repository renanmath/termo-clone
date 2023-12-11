import { WordData } from "@/constants"
import GameBoard from "./game-board"

type GameProps = {
    allWordData: WordData[]
}

function Game({ allWordData }: GameProps) {    
    const wordSize = 5
    const numWords = 4
    const frequencyThreshold = 10000

    const allWords: string[] = allWordData.filter(data => data.frequency >= frequencyThreshold).map(
        data => data.word
    )

    const filteredWords = allWords.filter(w => w.length === wordSize)
    const listOfWords = Array.from({ length: numWords }, () => {
        const wordIndex = Math.floor(Math.random() * filteredWords.length)
        return filteredWords[wordIndex]
    })

    return (
        <div>
            <GameBoard
                listOfWords={listOfWords}
                numRows={wordSize + numWords} />
        </div>
    );
}

export default Game;