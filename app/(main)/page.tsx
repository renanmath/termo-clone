import axios from "axios"

import { WORDS_API_URL, WordData } from "@/constants"
import Game from "@/components/game/game"


async function Home() {

    try {

        const response = await axios.get(WORDS_API_URL)
        const rawData: string = response.data
        const allData: string[] = rawData.split("\n")
        const allWordData: WordData[] = allData.slice(1).map(data => {
            const dataSplited = data.split(",")
            return { word: dataSplited[0], frequency: Number(dataSplited[1]) } as WordData
        })

        return (
            <Game allWordData={allWordData} />
        );
    }

    catch (error) {
        return (
            <div>
                404
            </div>
        )

    }
}

export default Home;