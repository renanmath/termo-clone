export const WORDS_API_URL = 'https://raw.githubusercontent.com/fserb/pt-br/master/data'

export type WordData = {
    word: string
    frequency: number
}

export type GameStateInterface = {
    activeRow: number,
    activeColumn: number,
    currentChar: string,
    typedWord: string
}

export type GameConfigurationInterface = {
    numWords: number,
    wordSize: number,
    listOfWords: string[]
}

export type GameManagerInterface = {
    gameState: GameStateInterface,
    configurations: GameConfigurationInterface
    changeState: (state:GameStateInterface) => void
}