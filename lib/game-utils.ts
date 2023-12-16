export function validateChar(char: string) {
    return /^[a-zA-Z]$/.test(char);
  }

export function createNewWord(word:string[], index:number, char:string){
    const newWord = [...word]
    newWord[index] = char
    return newWord
}