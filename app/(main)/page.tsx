
import { FREQUENT_WORDS } from "@/constants"
import Game from "@/components/game/game"
import { GameContextProvider } from "@/context/game-context"
import { useMemo } from "react";
import GameMenu from "@/components/menu/game-menu";
import { Toaster } from "@/components/ui/toaster"
import Keyboard from "@/components/keyboard/keyboard";


async function Home() {

  const allWords: string[] = useMemo(() => (FREQUENT_WORDS.split("\n")), [])

  return (
    <div className="bg-slate-300 h-full w-full pb-24">
      <GameContextProvider>
        <GameMenu />
        <Toaster />
        <Game allWords={allWords} />
        <Keyboard />
      </GameContextProvider>
    </div>

  );
}

export default Home;