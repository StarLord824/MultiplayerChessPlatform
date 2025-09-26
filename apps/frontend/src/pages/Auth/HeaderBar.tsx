
export const HeaderBar = (props: {whitePlayer: string, blackPlayer: string}) => {
    const time= new Date().getTime();
    return (
        <div>
            <div className='flex justify-center items-center w-full h-20 bg-emerald-500 text-white font-bold text-4xl'>
                <h1>Chess.com</h1>
            </div>
            <div className='flex justify-around items-center w-full h-14 bg-gray-800 text-white font-bold text-2xl rounded-b-md'>
                <div>
                    White Player : {props.whitePlayer}
                </div>
                <div>
                    Timer : {time}
                </div>
                <div>
                    Black Player : {props.blackPlayer}
                </div>
            </div>
            <div>
                <button>
                    Leave
                </button>
            </div>
        </div>
  )
}
