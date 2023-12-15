"use client";

import { GameStateInterface } from '@/constants';
import { createNewWord } from '@/lib/game-utils';
import { createContext, useContext, useMemo, useState } from 'react';

type GameStateContextProps = {
    gameState: GameStateInterface,
    changeGameState: (state: GameStateInterface) => void
    updateWord: (state: GameStateInterface, char: string, size: number) => void

}

const GameStateContext = createContext<GameStateContextProps>({} as GameStateContextProps)

export function GameStateContextProvider({ children }: { children: React.ReactNode }) {
    const [gameState, setGameState] = useState<GameStateInterface>({
        activeRow: 0,
        activeColumn: 0,
        currentWord: "",
        currentChar: "",
        typedWords: []
    })

    function changeGameState(state: GameStateInterface) {
        setGameState(state)
    }

    function updateWord(state: GameStateInterface, char: string, size: number) {
        if (state.currentWord.length < size) {
            const newWord = createNewWord(state.currentWord, state.activeColumn, char)
            const newState = { ...state }
            newState.currentWord = newWord
            newState.activeColumn = newWord.length % size
            setGameState(newState)
        }
    }

    const contextValue = useMemo(() => {
        return { gameState: gameState, changeGameState: changeGameState, updateWord: updateWord };
    }, [gameState]);

    return (
        <GameStateContext.Provider value={contextValue}>
            {children}
        </GameStateContext.Provider>
    )
}

export function useGameState() {
    const context = useContext(GameStateContext)
    return context
}