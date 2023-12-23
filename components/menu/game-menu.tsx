"use client";

import { OptionSelector } from "@/components/menu/option-selector";
import { MAX_WORD_SIZE, MIN_WORD_SIZE } from "@/constants";

const configurations = [
    {
        label: "Quantidade de palavras",
        options: ["1", "2", "4"],
        default: "1"
    },
    {
        label: "Tamanho da palavra",
        options: Array.from({ length: MAX_WORD_SIZE - MIN_WORD_SIZE + 1 }, (_, index) => String(index + MIN_WORD_SIZE)),
        default: String(MIN_WORD_SIZE)
    },
    {
        label: "Linhas adicionais",
        options: ["0", "1", "2", "3"],
        default: "0"
    }
]

function GameMenu() {
    return (
    <div className="flex justify-between bg-slate-800 m-1 px-60 py-2 text-blue-600">
        {configurations.map( config => (
            <div key={config.label}>
                <OptionSelector 
                placeholder={config.label}
                options={config.options}
                defaultValue={config.default}
                onValueChange={(value)=>{console.log(value)}} />
            </div>
        )          
        )}
    </div>);
}

export default GameMenu;