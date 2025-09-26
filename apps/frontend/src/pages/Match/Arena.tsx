import { useState, useEffect } from 'react';
import { 
  Flag, 
  RotateCcw, 
  MessageSquare, 
  Settings,
  Crown,
  User,
  ArrowLeft,
  Volume2,
  VolumeX
} from 'lucide-react';

export function Arena() {
  const [whiteTime, setWhiteTime] = useState(600); // 10 minutes in seconds
  const [blackTime, setBlackTime] = useState(600);
  const [currentTurn, setCurrentTurn] = useState('white');
  const [gameStatus, setGameStatus] = useState('playing'); // playing, paused, ended
  const [moveCount, setMoveCount] = useState(1);
  const [showChat, setShowChat] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null);

  // Player data
  const players = {
    white: { name: 'You', rating: 1847, avatar: '♛' },
    black: { name: 'ChessNinja', rating: 1923, avatar: '♚' }
  };

  // Initial board setup
  const initialBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
  ];

  const [board, setBoard] = useState<(string | null)[][]>(initialBoard);

  // Chess piece symbols
  const pieceSymbols = {
    'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
    'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
  };

  // Timer effect
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const timer = setInterval(() => {
      if (currentTurn === 'white') {
        setWhiteTime(prev => Math.max(0, prev - 1));
      } else {
        setBlackTime(prev => Math.max(0, prev - 1));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTurn, gameStatus]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle square click
  const handleSquareClick = (row: number, col: number) => {
    if (selectedSquare) {
      // Move piece
      const newBoard = board.map(r => [...r]);
      const [fromRow, fromCol] = selectedSquare as [number, number];
      newBoard[row][col] = board[fromRow][fromCol];
      newBoard[fromRow][fromCol] = null;
      setBoard(newBoard);
      setSelectedSquare(null);
      setCurrentTurn(currentTurn === 'white' ? 'black' : 'white');
      if (currentTurn === 'white') setMoveCount(prev => prev + 1);
    } else if (board[row][col]) {
      // Select piece
      const piece = board[row][col];
      const isWhitePiece = piece === piece.toUpperCase();
      if ((currentTurn === 'white' && isWhitePiece) || (currentTurn === 'black' && !isWhitePiece)) {
        setSelectedSquare([row, col]);
      }
    }
  };

  // Game actions
  const handleResign = () => {
    setGameStatus('ended');
    // Handle resignation logic
  };

  const handleOfferDraw = () => {
    // Handle draw offer logic
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Lobby
          </button>
          
          <div className="text-center">
            <div className="text-white font-medium">Move {moveCount}</div>
            <div className="text-slate-400 text-sm">Rated Game</div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors"
            >
              {soundEnabled ? 
                <Volume2 className="w-5 h-5 text-slate-400" /> : 
                <VolumeX className="w-5 h-5 text-slate-400" />
              }
            </button>
            <button className="p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* Game Board Section */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Black Player Info */}
            <div className={`
              flex items-center justify-between p-4 rounded-xl border transition-all duration-300
              ${currentTurn === 'black' ? 'bg-slate-700/50 border-slate-600' : 'bg-slate-800/30 border-slate-700/30'}
            `}>
              <div className="flex items-center gap-3">
                <div className="text-2xl">{players.black.avatar}</div>
                <div>
                  <div className="text-white font-medium flex items-center gap-2">
                    {players.black.name}
                    {players.black.rating > players.white.rating && <Crown className="w-4 h-4 text-yellow-400" />}
                  </div>
                  <div className="text-slate-400 text-sm">{players.black.rating}</div>
                </div>
              </div>
              <div className={`
                text-2xl font-mono px-4 py-2 rounded-lg
                ${currentTurn === 'black' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700/50 text-white'}
              `}>
                {formatTime(blackTime)}
              </div>
            </div>

            {/* Chess Board */}
            <div className="bg-slate-800/50 p-6 rounded-2xl">
              <div className="aspect-square max-w-2xl mx-auto">
                <div className="grid grid-cols-8 gap-0 border-2 border-slate-600 rounded-lg overflow-hidden">
                  {board.map((row, rowIndex) =>
                    row.map((piece, colIndex) => {
                      const isLight = (rowIndex + colIndex) % 2 === 0;
                      const isSelected = selectedSquare && selectedSquare[0] === rowIndex && selectedSquare[1] === colIndex;
                      
                      return (
                        <button
                          key={`${rowIndex}-${colIndex}`}
                          onClick={() => handleSquareClick(rowIndex, colIndex)}
                          className={`
                            aspect-square flex items-center justify-center text-4xl font-bold transition-all duration-200 hover:brightness-110
                            ${isLight ? 'bg-amber-100' : 'bg-amber-800'}
                            ${isSelected ? 'ring-4 ring-blue-500' : ''}
                          `}
                        >
                          {piece && pieceSymbols[piece as keyof typeof pieceSymbols]}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* White Player Info */}
            <div className={`
              flex items-center justify-between p-4 rounded-xl border transition-all duration-300
              ${currentTurn === 'white' ? 'bg-slate-700/50 border-slate-600' : 'bg-slate-800/30 border-slate-700/30'}
            `}>
              <div className="flex items-center gap-3">
                <div className="text-2xl">{players.white.avatar}</div>
                <div>
                  <div className="text-white font-medium flex items-center gap-2">
                    {players.white.name} 
                    <User className="w-4 h-4 text-blue-400" />
                    {players.white.rating > players.black.rating && <Crown className="w-4 h-4 text-yellow-400" />}
                  </div>
                  <div className="text-slate-400 text-sm">{players.white.rating}</div>
                </div>
              </div>
              <div className={`
                text-2xl font-mono px-4 py-2 rounded-lg
                ${currentTurn === 'white' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700/50 text-white'}
              `}>
                {formatTime(whiteTime)}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Game Actions */}
            <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/30">
              <h3 className="text-lg font-medium text-white mb-4">Game Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleOfferDraw}
                  className="w-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 rounded-lg py-2 px-4 font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Offer Draw
                </button>
                
                <button
                  onClick={handleResign}
                  className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 rounded-lg py-2 px-4 font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Flag className="w-4 h-4" />
                  Resign
                </button>
              </div>
            </div>

            {/* Move History */}
            <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/30">
              <h3 className="text-lg font-medium text-white mb-4">Move History</h3>
              <div className="max-h-64 overflow-y-auto space-y-1">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-slate-400">1.</div>
                  <div className="text-white">e4</div>
                  <div className="text-white">e5</div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-slate-400">2.</div>
                  <div className="text-white">Nf3</div>
                  <div className="text-slate-400">...</div>
                </div>
              </div>
            </div>

            {/* Chat Toggle */}
            <button
              onClick={() => setShowChat(!showChat)}
              className="w-full bg-slate-800/30 hover:bg-slate-700/50 border border-slate-700/30 rounded-2xl p-4 transition-all duration-300 flex items-center justify-center gap-2 text-white"
            >
              <MessageSquare className="w-5 h-5" />
              {showChat ? 'Hide Chat' : 'Show Chat'}
            </button>

            {/* Chat Panel */}
            {showChat && (
              <div className="bg-slate-800/30 rounded-2xl p-4 border border-slate-700/30">
                <div className="space-y-2 max-h-40 overflow-y-auto mb-3">
                  <div className="text-xs text-slate-400">ChessNinja: Good luck!</div>
                  <div className="text-xs text-slate-400">You: Thanks, you too!</div>
                </div>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50"
                />
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}