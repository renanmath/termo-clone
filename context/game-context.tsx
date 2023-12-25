"use client";

import { BIG_M, GameConfigurationInterface, GameStateInterface, MAX_NUM_WORDS, MAX_WORD_SIZE, MIN_NUM_WORDS, MIN_WORD_SIZE } from '@/constants';
import { createNewWord } from '@/lib/game-utils';
import { createContext, useContext, useMemo, useState } from 'react';

type GameContextProps = {
    gameState: GameStateInterface,
    configurations: GameConfigurationInterface,
    changeGameState: (state: GameStateInterface) => void
    updateWord: (state: GameStateInterface, char: string, size: number) => void
    changeGameConfigurations: (configurations: GameConfigurationInterface) => void
}

const GameContext = createContext<GameContextProps>({} as GameContextProps)

export function GameContextProvider({ children }: { children: React.ReactNode }) {
    const [gameState, setGameState] = useState<GameStateInterface>({
        activeRow: 0,
        activeColumn: 0,
        currentWord: Array.from({ length: MAX_WORD_SIZE }, () => ""),
        currentChar: "",
        typedWords: [],
        answers: [],
        gridValidation: Array.from({ length: MAX_NUM_WORDS }, () => BIG_M),
        match: 0,
        unidecodedWords: []
    })

    const [gameConfigurations, setGameConfigurations] = useState<GameConfigurationInterface>({
        numWords: MIN_NUM_WORDS,
        wordSize: MIN_WORD_SIZE,
        adtionalRows: 0,
        
    })

    function changeGameState(state: GameStateInterface) {
        setGameState(state)
    }

    function changeGameConfigurations(configurations: GameConfigurationInterface) {
        setGameConfigurations(configurations)
    }

    function updateWord(state: GameStateInterface, char: string, size: number) {

        const newWord = createNewWord(state.currentWord, state.activeColumn, char)
        const newState = { ...state }
        newState.currentWord = newWord
        newState.activeColumn = Math.min(newState.activeColumn + 1, size - 1)
        setGameState(newState)

    }

    const contextValue = useMemo(() => {
        return {
            gameState: gameState,
            configurations: gameConfigurations,
            changeGameState: changeGameState,
            updateWord: updateWord,
            changeGameConfigurations: changeGameConfigurations
        };
    }, [gameState, gameConfigurations]);

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    )
}

export function useGame() {
    const context = useContext(GameContext)
    return context
}