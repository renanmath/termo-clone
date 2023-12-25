import KeyBox from "@/components/keyboard/key-box";
import { BACKSPACE_SYMBOL, ENTER_SYMBOL } from "@/constants";

const arrayOfKyes = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", BACKSPACE_SYMBOL],
    ["Z", "X", "C", "V", "B", "N", "M", ENTER_SYMBOL]
]

export type KeyboardRowProps = {
    keys: string[]
}

export function KeyboardRow({ keys }: KeyboardRowProps) {
    return (
        <div className="flex gap-x-8 justify-center">
            {keys.map(char => (
                <div key={char}>
                    <KeyBox char={char} />
                </div>
            ))}
        </div>
    )
}

function GameKeyboar() {
    return (
        <div className="flex flex-col gap-y-2 my-10 justify-center">
            {arrayOfKyes.map((line, index) => (
                <div key={index}>
                    <KeyboardRow keys={line} />
                </div>
            ))}
        </div>
    );
}

export default GameKeyboar;