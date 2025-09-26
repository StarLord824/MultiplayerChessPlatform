import { useState, useEffect, useMemo } from 'react';
import { 
//   Play, 
  Trophy, 
  Users, 
  Clock, 
  Target, 
  Zap, 
  Star, 
  TrendingUp,
//   Calendar,
  Award,
  Crown,
  Swords,
  ChevronRight,
  Timer,
  Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animatedStats, setAnimatedStats] = useState({
    rating: 0,
    gamesWon: 0,
    winRate: 0
  });

  // Mock user data - replace with real data from your auth context/API
  const userData = useMemo(() => ({
    name: "Chess Master",
    rating: 1847,
    rank: "Expert",
    gamesPlayed: 156,
    gamesWon: 98,
    winRate: 63,
    lastPlayed: "2 hours ago",
    avatar: "♛" // Chess piece as avatar
  }), []);

  const quickActions = [
    { 
      title: "Quick Match", 
      description: "Find an opponent instantly",
      icon: <Zap className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      action: () => navigate("/match")
    },
    { 
      title: "Tournament", 
      description: "Join ongoing tournaments",
      icon: <Trophy className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
      action: () => navigate("/tournaments")
    },
    { 
      title: "Practice", 
      description: "Improve with puzzles",
      icon: <Target className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      action: () => navigate("/practice")
    },
    { 
      title: "Friends", 
      description: "Play with friends",
      icon: <Users className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      action: () => navigate("/friends")
    }
  ];

  const recentGames = [
    { opponent: "GrandMaster_99", result: "Won", time: "10+5", rating: "+12", duration: "23 min" },
    { opponent: "ChessNinja", result: "Lost", time: "5+3", rating: "-8", duration: "18 min" },
    { opponent: "QueenSlayer", result: "Won", time: "15+10", rating: "+15", duration: "34 min" },
    { opponent: "PawnStorm", result: "Draw", time: "10+0", rating: "+2", duration: "28 min" }
  ];

  const activeTournaments = [
    { name: "Weekly Blitz Championship", players: 1247, timeLeft: "2h 34m", prize: "Premium Badge" },
    { name: "Rapid Masters Cup", players: 856, timeLeft: "1d 4h", prize: "1000 Points" },
    { name: "Classic Tournament", players: 2043, timeLeft: "3d 12h", prize: "Gold Trophy" }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Animate stats
    const statsInterval = setInterval(() => {
      setAnimatedStats(prev => ({
        rating: prev.rating < userData.rating ? prev.rating + 23 : userData.rating,
        gamesWon: prev.gamesWon < userData.gamesWon ? prev.gamesWon + 2 : userData.gamesWon,
        winRate: prev.winRate < userData.winRate ? prev.winRate + 1 : userData.winRate
      }));
    }, 40);

    setTimeout(() => clearInterval(statsInterval), 2000);
    
    return () => {
      clearInterval(timeInterval);
      clearInterval(statsInterval);
    };
  }, [ userData ]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-blue-500/2 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-emerald-500/2 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-32 text-4xl text-white/[0.01] select-none">♛</div>
        <div className="absolute bottom-40 left-20 text-3xl text-white/[0.01] select-none">♞</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Header */}
        <div 
          className={`
            transform transition-all duration-1000 delay-200
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
          `}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{userData.avatar}</div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-light text-white/95">
                    Welcome back, <span className="font-semibold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">{userData.name}</span>
                  </h1>
                  <p className="text-slate-400 font-light">Ready for your next chess adventure?</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="text-emerald-400">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div 
          className={`
            grid grid-cols-1 md:grid-cols-4 gap-6 transform transition-all duration-1000 delay-400
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
          `}
        >
          <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 hover:border-slate-700/50 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Star className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-light text-white/90">{animatedStats.rating}</div>
                <div className="text-slate-400 text-sm font-light">Current Rating</div>
                <div className="text-xs text-blue-400 font-medium">{userData.rank}</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 hover:border-slate-700/50 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <Trophy className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="text-2xl font-light text-white/90">{animatedStats.gamesWon}</div>
                <div className="text-slate-400 text-sm font-light">Games Won</div>
                <div className="text-xs text-emerald-400 font-medium">of {userData.gamesPlayed} played</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 hover:border-slate-700/50 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-light text-white/90">{animatedStats.winRate}%</div>
                <div className="text-slate-400 text-sm font-light">Win Rate</div>
                <div className="text-xs text-purple-400 font-medium">Last 30 days</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 hover:border-slate-700/50 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-xl">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <div className="text-2xl font-light text-white/90">2h</div>
                <div className="text-slate-400 text-sm font-light">Last Played</div>
                <div className="text-xs text-yellow-400 font-medium">ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div 
          className={`
            transform transition-all duration-1000 delay-600
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
          `}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-white/95">Quick Actions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="group relative bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 hover:border-slate-700/50 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:-translate-y-1 text-left overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                <div className="relative space-y-4">
                  <div className={`inline-flex p-3 bg-gradient-to-br ${action.color} bg-opacity-20 rounded-xl text-white`}>
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white/90 group-hover:text-white transition-colors">{action.title}</h3>
                    <p className="text-slate-400 text-sm font-light">{action.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Recent Games */}
          <div 
            className={`
              lg:col-span-2 bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6
              transform transition-all duration-1000 delay-800
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
            `}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-light text-white/95 flex items-center gap-2">
                <Swords className="w-5 h-5" />
                Recent Games
              </h2>
              <button className="text-slate-400 hover:text-white text-sm font-light transition-colors">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentGames.map((game, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-colors duration-200">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      game.result === 'Won' ? 'bg-emerald-400' : 
                      game.result === 'Lost' ? 'bg-red-400' : 'bg-yellow-400'
                    }`}></div>
                    <div>
                      <div className="text-white/90 font-medium">{game.opponent}</div>
                      <div className="text-slate-400 text-sm">{game.time} • {game.duration}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${
                      game.result === 'Won' ? 'text-emerald-400' : 
                      game.result === 'Lost' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {game.result}
                    </div>
                    <div className={`text-sm ${
                      game.rating.startsWith('+') ? 'text-emerald-400' : 
                      game.rating.startsWith('-') ? 'text-red-400' : 'text-slate-400'
                    }`}>
                      {game.rating}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Tournaments */}
          <div 
            className={`
              bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6
              transform transition-all duration-1000 delay-1000
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
            `}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-light text-white/95 flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Tournaments
              </h2>
            </div>
            
            <div className="space-y-4">
              {activeTournaments.map((tournament, index) => (
                <div key={index} className="p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-colors duration-200 cursor-pointer">
                  <div className="space-y-3">
                    <div>
                      <div className="text-white/90 font-medium text-sm">{tournament.name}</div>
                      <div className="text-slate-400 text-xs">{tournament.players} players</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Timer className="w-3 h-3" />
                        {tournament.timeLeft}
                      </div>
                      <div className="text-xs text-yellow-400 font-medium">{tournament.prize}</div>
                    </div>
                  </div>
                </div>
              ))}
              
              <button className="w-full p-4 border-2 border-dashed border-slate-700 hover:border-slate-600 rounded-xl text-slate-400 hover:text-white transition-colors duration-200 text-sm font-light">
                Join New Tournament
              </button>
            </div>
          </div>
        </div>

        {/* Daily Challenge */}
        <div 
          className={`
            bg-gradient-to-r from-slate-900/40 via-blue-900/20 to-slate-900/40 backdrop-blur-sm 
            border border-slate-800/50 rounded-2xl p-6
            transform transition-all duration-1000 delay-1200
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
          `}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Award className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-light text-white/95">Daily Challenge</h3>
                <p className="text-slate-400 text-sm font-light">Solve today's puzzle and earn bonus points</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right text-sm text-slate-400">
                <div>Reward: <span className="text-blue-400 font-medium">50 Points</span></div>
                <div>Expires in: <span className="text-yellow-400">18h 42m</span></div>
              </div>
              <button 
                onClick={() => navigate("/puzzle")}
                className="px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 hover:border-blue-500/50 text-blue-400 hover:text-blue-300 rounded-xl font-medium transition-all duration-300 hover:scale-105"
              >
                Solve Puzzle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}