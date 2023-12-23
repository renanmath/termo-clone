
import { FREQUENT_WORDS } from "@/constants"
import Game from "@/components/game/game"
import { GameContextProvider } from "@/context/game-context"
import { useMemo } from "react";
import GameMenu from "@/components/menu/game-menu";


async function Home() {  

    const allWords: string[] = useMemo(()=>(FREQUENT_WORDS.split("\n")), [])

    return (
      <GameContextProvider>
        <GameMenu />
        <Game allWords={allWords} />
      </GameContextProvider>

    );
}

export default Home;