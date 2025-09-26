import { useState, useEffect } from 'react';
import { 
  Clock, 
  Users, 
  Settings, 
  Play, 
  X,
  Zap,
  Target,
  Crown,
  Timer
} from 'lucide-react';

export default function GameArena() {
  const [selectedTimeControl, setSelectedTimeControl] = useState('10+0');
  const [selectedRating, setSelectedRating] = useState('any');
  const [isSearching, setIsSearching] = useState(false);
  const [searchTime, setSearchTime] = useState(0);
  const [playersOnline, setPlayersOnline] = useState(1247);

  const timeControls = [
    { id: '1+0', label: '1 min', type: 'Bullet', icon: <Zap className="w-4 h-4" /> },
    { id: '3+0', label: '3 min', type: 'Blitz', icon: <Zap className="w-4 h-4" /> },
    { id: '5+0', label: '5 min', type: 'Blitz', icon: <Timer className="w-4 h-4" /> },
    { id: '10+0', label: '10 min', type: 'Rapid', icon: <Target className="w-4 h-4" /> },
    { id: '15+10', label: '15+10', type: 'Rapid', icon: <Target className="w-4 h-4" /> },
    { id: '30+0', label: '30 min', type: 'Classical', icon: <Crown className="w-4 h-4" /> }
  ];

  const ratingRanges = [
    { id: 'any', label: 'Any Rating', range: 'All players' },
    { id: '1200-1400', label: '1200-1400', range: 'Beginner' },
    { id: '1400-1600', label: '1400-1600', range: 'Intermediate' },
    { id: '1600-1800', label: '1600-1800', range: 'Advanced' },
    { id: '1800+', label: '1800+', range: 'Expert+' }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSearching) {
      interval = setInterval(() => {
        setSearchTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSearching]);

  useEffect(() => {
    const onlineInterval = setInterval(() => {
      setPlayersOnline(prev => prev + Math.floor(Math.random() * 10 - 5));
    }, 5000);
    return () => clearInterval(onlineInterval);
  }, []);

  const handleStartSearch = () => {
    setIsSearching(true);
    setSearchTime(0);
    
    // Simulate finding a match after 3-8 seconds
    const matchTime = Math.random() * 5000 + 3000;
    setTimeout(() => {
      // Navigate to arena (in real app, you'd use navigate('/arena'))
      console.log('Match found! Redirecting to arena...');
      setIsSearching(false);
    }, matchTime);
  };

  const handleCancelSearch = () => {
    setIsSearching(false);
    setSearchTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isSearching) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-8">
          
          {/* Searching Animation */}
          <div className="relative">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-transparent border-t-emerald-500 rounded-full animate-spin animation-delay-150"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl">⚔️</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-light text-white">Finding opponent...</h2>
              <p className="text-slate-400">Searching for {selectedTimeControl} • {selectedRating}</p>
              <div className="text-lg font-mono text-blue-400">{formatTime(searchTime)}</div>
            </div>
          </div>

          {/* Search Stats */}
          <div className="bg-slate-800/50 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Players online</span>
              <span className="text-emerald-400 font-medium">{playersOnline.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Time control</span>
              <span className="text-white">{selectedTimeControl}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Rating range</span>
              <span className="text-white">{selectedRating}</span>
            </div>
          </div>

          {/* Cancel Button */}
          <button
            onClick={handleCancelSearch}
            className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 rounded-xl py-3 px-6 font-medium transition-all duration-300 flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" />
            Cancel Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-light text-white">Find a Match</h1>
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <Users className="w-4 h-4" />
            <span>{playersOnline.toLocaleString()} players online</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Time Controls */}
          <div className="space-y-6">
            <h2 className="text-xl font-light text-white flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Time Control
            </h2>
            
            <div className="grid grid-cols-2 gap-3">
              {timeControls.map((control) => (
                <button
                  key={control.id}
                  onClick={() => setSelectedTimeControl(control.id)}
                  className={`
                    p-4 rounded-xl border transition-all duration-300 text-left
                    ${selectedTimeControl === control.id 
                      ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' 
                      : 'bg-slate-800/30 border-slate-700/30 text-white hover:border-slate-600/50'
                    }
                  `}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {control.icon}
                    <span className="font-medium">{control.label}</span>
                  </div>
                  <div className="text-sm text-slate-400">{control.type}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Rating Range */}
          <div className="space-y-6">
            <h2 className="text-xl font-light text-white flex items-center gap-2">
              <Target className="w-5 h-5" />
              Rating Range
            </h2>
            
            <div className="space-y-3">
              {ratingRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setSelectedRating(range.id)}
                  className={`
                    w-full p-4 rounded-xl border transition-all duration-300 text-left
                    ${selectedRating === range.id 
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                      : 'bg-slate-800/30 border-slate-700/30 text-white hover:border-slate-600/50'
                    }
                  `}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{range.label}</span>
                    <span className="text-sm text-slate-400">{range.range}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Match Settings Summary */}
        <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Match Settings
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-slate-400 text-sm mb-1">Time Control</div>
              <div className="text-white font-medium">{selectedTimeControl}</div>
            </div>
            <div>
              <div className="text-slate-400 text-sm mb-1">Rating Range</div>
              <div className="text-white font-medium">{selectedRating}</div>
            </div>
            <div>
              <div className="text-slate-400 text-sm mb-1">Game Type</div>
              <div className="text-white font-medium">Rated</div>
            </div>
          </div>
        </div>

        {/* Play Button */}
        <div className="text-center">
          <button
            onClick={handleStartSearch}
            className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-medium py-4 px-12 rounded-2xl text-lg transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto"
          >
            <Play className="w-6 h-6" />
            Find Match
          </button>
        </div>

      </div>
    </div>
  );
}