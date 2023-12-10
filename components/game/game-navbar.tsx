"use client";

import { OptionSelector } from "@/components/game/option-selector";

const configurations = [
    {
        label: "Tamanho da palavra",
        options: ["4", "5", "6", "7", "8", "9", "10"],
        default: "4"
    },
    {
        label: "Linhas adicionais",
        options: ["0", "1", "2", "3"],
        default: "0"
    }
]

function GameNavbar() {
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

export default GameNavbar;