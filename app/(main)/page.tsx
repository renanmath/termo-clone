
import { FREQUENT_WORDS } from "@/constants"
import Game from "@/components/game/game"
import { GameStateContextProvider } from "@/context/game-state-context"
import { useMemo } from "react";


async function Home() {  

    const allWords: string[] = useMemo(()=>(FREQUENT_WORDS.split("\n")), [])

    return (
      <GameStateContextProvider>
        <Game allWords={allWords} />
      </GameStateContextProvider>

    );
}

export default Home;