import { createContext, useContext, useMemo, useState } from 'react';

type CharContextProps = {
    charValue: string,
    changeCharValue: (char: string) => void
}

const CharContext = createContext<CharContextProps>({} as CharContextProps)

export function CharContextProvider({ children }: { children: React.ReactNode }) {
    const [charValue, setCharValue] = useState("X")

    function changeChar(char: string) {
        setCharValue(char)
    }

    const contextValue = useMemo(() => {
        return { charValue: charValue, changeCharValue: changeChar };
    }, [charValue]);

    return (
        <CharContext.Provider value={contextValue}>
            {children}
        </CharContext.Provider>
    )
}

export function useChar(){
    const context = useContext(CharContext)
    return context
}