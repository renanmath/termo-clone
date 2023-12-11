import { GameStateInterface } from '@/constants';
import { createContext, useContext, useMemo, useState } from 'react';

type GameStateContextProps = {
    gameState: GameStateInterface,
    changeGameState: (state: GameStateInterface) => void
}

const GameStateContext = createContext<GameStateContextProps>({} as GameStateContextProps)

export function GameStateContextProvider({ children }: { children: React.ReactNode }) {
    const [gameState, setGameState] = useState<GameStateInterface>({
        activeRow: 0,
        activeColumn: 0,
        currentChar: "",
        typedWord: ""
    })

    function changeGameState(state: GameStateInterface) {
        setGameState(state)
    }

    const contextValue = useMemo(() => {
        return { gameState: gameState, changeGameState: changeGameState };
    }, [gameState]);

    return (
        <GameStateContext.Provider value={contextValue}>
            {children}
        </GameStateContext.Provider>
    )
}

export function useGameState(){
    const context = useContext(GameStateContext)
    return context
}