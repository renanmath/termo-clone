import CharBox from "@/components/game/char-box";
import { CharContextProvider } from "@/context/char-context";

type GridRowProps = {
    correctWord: string
    selectedBoxIndex: number
}

function GridRow({ correctWord, selectedBoxIndex = 0 }: GridRowProps) {
    return (
        <div className="flex justify-between gap-x-2 px-2 py-1">
            {correctWord.split("").map((char, index) => (
                <div key={index}>
                    <CharContextProvider>
                        <CharBox
                            correctChar={char}
                            currentValue="X"
                            isSelected={index === selectedBoxIndex}
                            isValidated={false}
                            positionInRow={index} />
                    </CharContextProvider>

                </div>
            ))}
        </div>
    );
}

export default GridRow;