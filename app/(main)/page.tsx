
import { FREQUENT_WORDS } from "@/constants"
import Game from "@/components/game/game"
import { GameStateContextProvider } from "@/context/game-state-context"
import { useMemo } from "react";
import GameMenu from "@/components/menu/game-menu";


async function Home() {  

    const allWords: string[] = useMemo(()=>(FREQUENT_WORDS.split("\n")), [])

    return (
      <GameStateContextProvider>
        <GameMenu />
        <Game allWords={allWords} />
      </GameStateContextProvider>

    );
}

export default Home;