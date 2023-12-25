export type KeyProps = {
    char: string,

}

function KeyBox({char}: KeyProps) {
    return (
    <div className="bg-slate-800 p-1 rounded-sm text-lg text-white font-bold w-[32px] h-[32px] text-center hover:bg-slate-900">
        <button>
            {char.toUpperCase()}
        </button>
    </div> );
}

export default KeyBox;