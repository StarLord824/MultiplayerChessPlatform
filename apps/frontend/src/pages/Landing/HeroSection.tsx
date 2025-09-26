import { Play, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection({ navigate }: { navigate: (path: string) => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [statsCounter, setStatsCounter] = useState({ players: 0, games: 0, tournaments: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setStatsCounter(prev => ({
        players: prev.players < 50000 ? prev.players + 1250 : 50000,
        games: prev.games < 12000000 ? prev.games + 300000 : 12000000,
        tournaments: prev.tournaments < 2400 ? prev.tournaments + 60 : 2400
      }));
    }, 40);

    setTimeout(() => clearInterval(interval), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-500/3 rounded-full blur-3xl"></div>
        
        {/* Single subtle chess piece */}
        <div className="absolute top-32 right-32 text-6xl text-white/[0.02] select-none">♛</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-8 lg:px-16">
        <div className="max-w-6xl w-full">
          
          {/* Center-aligned content */}
          <div className="text-center space-y-16">
            
            {/* Minimal Brand Badge */}
            <div 
              className={`
                inline-flex items-center gap-2 bg-slate-900/40 backdrop-blur-sm 
                border border-slate-800/50 text-slate-400 px-5 py-2 rounded-full text-sm
                transform transition-all duration-1000 delay-200
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
              `}
            >
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              Chess Mastery Platform
            </div>

            {/* Clean Typography Hierarchy */}
            <div 
              className={`
                space-y-8 transform transition-all duration-1000 delay-400
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
              `}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tight text-white/95 leading-none">
                Chess
              </h1>
              
              <div className="max-w-2xl mx-auto">
                <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed">
                  Where strategy meets perfection.
                </p>
                <p className="text-lg text-slate-500 mt-4 font-light">
                  Join thousands of players in the ultimate chess experience.
                </p>
              </div>
            </div>

            {/* Elegant Stats Grid */}
            <div 
              className={`
                max-w-3xl mx-auto transform transition-all duration-1000 delay-600
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
              `}
            >
              <div className="grid grid-cols-3 gap-12 py-12">
                <div className="group cursor-default">
                  <div className="text-4xl md:text-5xl font-extralight text-white/90 mb-2 group-hover:text-white transition-colors duration-300">
                    {(statsCounter.players / 1000).toFixed(0)}K
                  </div>
                  <div className="text-slate-500 text-sm font-light uppercase tracking-widest">
                    Players
                  </div>
                </div>
                
                <div className="group cursor-default">
                  <div className="text-4xl md:text-5xl font-extralight text-white/90 mb-2 group-hover:text-white transition-colors duration-300">
                    {(statsCounter.games / 1000000).toFixed(0)}M
                  </div>
                  <div className="text-slate-500 text-sm font-light uppercase tracking-widest">
                    Games
                  </div>
                </div>
                
                <div className="group cursor-default">
                  <div className="text-4xl md:text-5xl font-extralight text-white/90 mb-2 group-hover:text-white transition-colors duration-300">
                    {(statsCounter.tournaments / 100).toFixed(0)}+
                  </div>
                  <div className="text-slate-500 text-sm font-light uppercase tracking-widest">
                    Daily
                  </div>
                </div>
              </div>
            </div>

            {/* Sophisticated CTA */}
            <div 
              className={`
                flex flex-col sm:flex-row gap-4 justify-center items-center
                transform transition-all duration-1000 delay-800
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
              `}
            >
              <button className="group relative px-10 py-4 bg-white text-slate-900 font-medium rounded-full hover:bg-slate-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => navigate("/match")}
              >
                <div className="flex items-center gap-3">
                  <Play className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-300" />
                  <span>Start Playing</span>
                </div>
              </button>

              <button className="group px-10 py-4 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white font-medium rounded-full transition-all duration-300">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 group-hover:scale-105 transition-transform duration-300" />
                  <span>Join Community</span>
                </div>
              </button>
            </div>

            {/* Minimal Trust Indicators */}
            <div 
              className={`
                flex items-center justify-center gap-12 pt-16 text-slate-600
                transform transition-all duration-1000 delay-1000
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}
            >
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                <span>FIDE Recognized</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                <span>Real-time Analysis</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                <span>Global Tournaments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}