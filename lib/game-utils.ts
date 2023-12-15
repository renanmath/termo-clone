export function validateChar(char: string) {
    return /^[a-zA-Z]$/.test(char);
  }

export function createNewWord(word:string, index:number, char:string){
    return word.slice(0,index) + char + word.slice(index, word.length)
}