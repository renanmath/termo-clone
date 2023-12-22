"use client";

import { GameStateInterface, MAX_NUM_WORDS, MAX_WORD_SIZE } from '@/constants';
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
        currentWord: Array.from({ length: MAX_WORD_SIZE }, () => ""),
        currentChar: "",
        typedWords: [],
        answers: [],
        gridValidation: Array.from({ length: MAX_NUM_WORDS }, () => MAX_WORD_SIZE+1)
    })

    function changeGameState(state: GameStateInterface) {
        setGameState(state)
    }

    function updateWord(state: GameStateInterface, char: string, size: number) {

        const newWord = createNewWord(state.currentWord, state.activeColumn, char)
        const newState = { ...state }
        newState.currentWord = newWord
        newState.activeColumn = (newState.activeColumn +1) % size
        setGameState(newState)

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