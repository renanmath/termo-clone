
import { FREQUENT_WORDS } from "@/constants"
import Game from "@/components/game/game"
import { GameContextProvider } from "@/context/game-context"
import { useMemo } from "react";
import GameMenu from "@/components/menu/game-menu";
import { Toaster } from "@/components/ui/toaster"


async function Home() {  

    const allWords: string[] = useMemo(()=>(FREQUENT_WORDS.split("\n")), [])

    return (
      <GameContextProvider>
        <GameMenu />
        <Toaster/>
        <Game allWords={allWords} />
      </GameContextProvider>
    );
}

export default Home;