"use client";

import { OptionSelector } from "@/components/menu/option-selector";
import { GameConfigurationInterface, MAX_WORD_SIZE, MIN_WORD_SIZE } from "@/constants";
import { useGame } from "@/context/game-context";




function GameMenu() {
    const {configurations, changeGameConfigurations} = useGame()


    const configParameters = [
        {
            label: "Quantidade de palavras",
            options: ["1", "2", "4"],
            default: "1",
            configuration: "numWords",
            changeFunction: (config: GameConfigurationInterface, value:string) => {
                const newConfig = {...config}
                newConfig.numWords = parseInt(value)
                return newConfig
            }
        },
        {
            label: "Tamanho da palavra",
            options: Array.from({ length: MAX_WORD_SIZE - MIN_WORD_SIZE + 1 }, (_, index) => String(index + MIN_WORD_SIZE)),
            default: String(MIN_WORD_SIZE),
            configuration: "wordSize",
            changeFunction: (config: GameConfigurationInterface, value:string) => {
                const newConfig = {...config}
                newConfig.wordSize = parseInt(value)
                return newConfig
            }
        },
        {
            label: "Linhas adicionais",
            options: ["0", "1", "2", "3"],
            default: "0",
            configuration: "aditionalRows",
            changeFunction: (config: GameConfigurationInterface, value:string) => {
                const newConfig = {...config}
                newConfig.adtionalRows = parseInt(value)
                return newConfig
            }
        }
    ]

    return (
    <div className="flex justify-between bg-slate-800 m-1 px-60 py-2 text-blue-600">
        {configParameters.map( config => (
            <div key={config.label}>
                <OptionSelector 
                placeholder={config.label}
                options={config.options}
                defaultValue={config.default}
                onValueChange={(value)=>{
                    const newConfig = config.changeFunction(configurations, value)
                    changeGameConfigurations(newConfig)
                }} />
            </div>
        )          
        )}
    </div>);
}

export default GameMenu;