import { Chess } from 'chess.js'
import { useState } from "react"

export const ChessBoard = (props: {chess: Chess}) => {

    const [clicked, setClicked] = useState<number[] | null>(null);
        // const [fen, setFen] = useState(chess.fen());
        const pieceMap = {R: '♜', N: '♞', B: '♝', Q: '♛', K: '♚', P: '♟', r: '♖', n: '♘', b: '♗', q: '♕', k: '♔', p: '♙'};
        // props.chess.move('e4');
        // props.chess.move('d5');
        const ChessBoard: string[][] = []
        const board = props.chess.board();
        for (let i = 0; i < 8; i++) {
            const row = [];
            for (let j = 0; j < 8; j++) {
                const piece = board[i][j];
                // console.log(piece?.square+" "+piece?.type+" "+piece?.color+" "+i+" "+j);
                if (piece) {
                    row.push(piece.color === 'w' ? pieceMap[piece.type] : pieceMap[piece.type].toUpperCase());
                } else {
                    row.push('');
                }
            }
            ChessBoard.push(row);
        }
        console.log('clicked.', clicked);
    return (
        <div id="board" className="grid grid-cols-8 sm:w-[420px] sm:h-[420px] lg:w-[540px] lg:h-[540px] aspect-square overflow-hidden bg-black/80 border border-white/20 shadow-md animate-fadeInUp duration-200">
                  {/* <!-- Squares --> */}
                  {Array.from({ length: 8 }).map((_, rowIndex) => {
                      return Array.from({ length: 8 }).map((_, colIndex) => {
                          const isLightSquare = (rowIndex + colIndex) % 2 === 0;
                          return (
                              <div key={`${rowIndex}-${colIndex}`} className={` group relative w-full h-full flex items-center justify-center 
                               ${isLightSquare ? 'bg-white/10' : 'bg-black/20'} ${clicked && clicked[0]==rowIndex && clicked[1]==colIndex ? 'ring-4 bg-black ring-white/20' : ''}`}>
                                  {/* <!-- Placeholder for piece --> */}
                                <div className="absolute z-0 bottom-1 right-1 text-xs text-white/20" id={`${String.fromCharCode(97+colIndex)}${8-rowIndex}`}>
                                    {String.fromCharCode(97+colIndex)}{8-rowIndex}
                                </div>
                                <div className="absolute text-2xl">
                                    {/* //render piece using fen */}
                                    <button onClick={ ()=>{
                                        console.log(clicked+" "+clicked);
                                        if(clicked==null)
                                            setClicked([rowIndex, colIndex]);
                                        console.log(clicked+" "+clicked);
                                    } } className="hover:cursor-grab">
                                        {ChessBoard[rowIndex][colIndex]}
                                    </button>
                                    {/* {ChessBoard[rowIndex][colIndex]} */}
                                </div>
                              </div>
                          );
                      });
                  })}
              </div>
    )
}