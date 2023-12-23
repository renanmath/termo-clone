"use client";

import { OptionSelector } from "@/components/menu/option-selector";
import { GameConfigurationInterface, MAX_WORD_SIZE, MIN_WORD_SIZE } from "@/constants";
import { useGame } from "@/context/game-context";
import { useState } from "react";
import { Button } from "../ui/button";




function GameMenu() {
    const {gameState, changeGameState, configurations, changeGameConfigurations } = useGame()
    const [nextConfig, setNextConfig] = useState<GameConfigurationInterface>(configurations)

    const configParameters = [
        {
            label: "Quantidade de palavras",
            options: ["1", "2", "4"],
            default: "1",
            configuration: "numWords",
            changeFunction: (config: GameConfigurationInterface, value: string) => {
                const newConfig = { ...config }
                newConfig.numWords = parseInt(value)
                return newConfig
            }
        },
        {
            label: "Tamanho da palavra",
            options: Array.from({ length: MAX_WORD_SIZE - MIN_WORD_SIZE + 1 }, (_, index) => String(index + MIN_WORD_SIZE)),
            default: String(MIN_WORD_SIZE),
            configuration: "wordSize",
            changeFunction: (config: GameConfigurationInterface, value: string) => {
                const newConfig = { ...config }
                newConfig.wordSize = parseInt(value)
                return newConfig
            }
        },
        {
            label: "Linhas adicionais",
            options: ["0", "1", "2", "3"],
            default: "0",
            configuration: "aditionalRows",
            changeFunction: (config: GameConfigurationInterface, value: string) => {
                const newConfig = { ...config }
                newConfig.adtionalRows = parseInt(value)
                return newConfig
            }
        }
    ]

    function handleOnClick(){
        if (nextConfig){
            console.log("Novo jogo!")
            const newState = {...gameState}
            newState.match = newState.match + 1
            newState.typedWords = []
            newState.activeRow = 0
            newState.activeColumn = 0
            changeGameState(newState)
            changeGameConfigurations(nextConfig)
        }        
    }

    return (
        <div className="flex gap-x-2 justify-between bg-slate-800 py-2 px-16">
            <Button className="bg-slate-600 hover:bg-slate-700"
            onClick={handleOnClick}>Novo Jogo</Button>
            <div className="flex justify-between gap-x-16">
                {configParameters.map(config => (
                    <div key={config.label}>
                        <OptionSelector
                            placeholder={config.label}
                            options={config.options}
                            defaultValue={config.default}
                            onValueChange={(value) => {
                                const newConfig = config.changeFunction(nextConfig, value)
                                setNextConfig(newConfig);
                            }} />
                    </div>
                )
                )}
            </div>
        </div>
    );

}

export default GameMenu;