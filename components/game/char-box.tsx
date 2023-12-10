"use client";

import { cn } from "@/lib/utils"
import { Input } from "../ui/input";

type CharBoxProps = {
    correctChar: string
    currentValue: string
    isValidated: boolean
    isSelected: boolean
    positionInRow: number
}

function CharBox({ correctChar, currentValue = "X", isValidated = false, isSelected = false, positionInRow = 0 }: CharBoxProps) {
    const borderClass = isValidated ? "border-pink-500" : "border-blue-900";
    const backgroundClass = currentValue === correctChar
        ? "bg-slate-300"
        : "bg-slate-900";
    const shadowClass = isSelected ? "shadow-md" : "";
    return (
        <div>
            <Input
            value={correctChar.toUpperCase()}
                disabled={false}
                className={cn("text-white border border-cyan-900 p-1 bg-slate-900 rounded-sm text-lg font-bold w-[32px] h-[32px] text-center hover:bg-red-700", borderClass, backgroundClass, shadowClass)}/>
        </div>

    );
}

export default CharBox;