import { useState, useEffect } from 'react';
import { Github, ExternalLink, Code, Coffee, Heart, Zap, Target, Users, Trophy, Star } from 'lucide-react';

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    linesOfCode: 0,
    commits: 0,
    features: 0
  });

  useEffect(() => {
    setIsVisible(true);
    
    // Animate stats counter
    const interval = setInterval(() => {
      setAnimatedStats(prev => ({
        linesOfCode: prev.linesOfCode < 15000 ? prev.linesOfCode + 375 : 15000,
        commits: prev.commits < 247 ? prev.commits + 6 : 247,
        features: prev.features < 42 ? prev.features + 1 : 42
      }));
    }, 50);

    setTimeout(() => clearInterval(interval), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-emerald-500/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/2 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating Chess Pieces */}
        <div className="absolute top-20 left-1/4 text-5xl text-white/[0.02] select-none animate-bounce">♛</div>
        <div className="absolute bottom-32 right-1/3 text-4xl text-white/[0.02] select-none animate-bounce delay-300">♞</div>
        <div className="absolute top-1/3 right-20 text-3xl text-white/[0.02] select-none animate-bounce delay-700">♜</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-8 lg:px-16 py-16">
        <div className="max-w-6xl w-full">
          
          {/* Header Section */}
          <div 
            className={`
              text-center space-y-8 mb-20 transform transition-all duration-1000 delay-200
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            `}
          >
            <div className="inline-flex items-center gap-2 bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 text-slate-400 px-6 py-3 rounded-full text-sm font-light">
              <Heart className="w-4 h-4 text-red-400" />
              Crafted with passion
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-white/95 leading-none">
              About
              <span className="block text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text">
                MyChess
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-3xl mx-auto">
              A modern chess platform built for players who appreciate both strategy and beautiful design.
            </p>
          </div>

          {/* Developer Section */}
          <div 
            className={`
              bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-3xl p-12 mb-16
              transform transition-all duration-1000 delay-400
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            `}
          >
            <div className="text-center space-y-8">
              
              {/* Developer Avatar */}
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-emerald-500 rounded-full p-1">
                  <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                    <Code className="w-16 h-16 text-white/90" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-2">
                  <Zap className="w-4 h-4" />
                </div>
              </div>

              {/* Developer Info */}
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-light text-white/95">
                  Developed & Maintained by
                </h2>
                <div className="group inline-block">
                  <a 
                    href="https://github.com/StarLord824" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-4xl md:text-5xl font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent hover:from-blue-300 hover:via-purple-300 hover:to-emerald-300 transition-all duration-300"
                  >
                    <span>Abhinav</span>
                    <ExternalLink className="w-8 h-8 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                  </a>
                </div>
                <p className="text-lg text-slate-400 font-light max-w-2xl mx-auto">
                  Full-stack developer passionate about creating beautiful, functional applications that bring people together through the art of chess.
                </p>
              </div>

              {/* Developer Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="group cursor-default">
                  <div className="text-3xl font-extralight text-white/90 mb-2 group-hover:text-white transition-colors duration-300">
                    {(animatedStats.linesOfCode / 1000).toFixed(0)}K+
                  </div>
                  <div className="text-slate-500 text-sm font-light uppercase tracking-widest">
                    Lines of Code
                  </div>
                </div>
                
                <div className="group cursor-default">
                  <div className="text-3xl font-extralight text-white/90 mb-2 group-hover:text-white transition-colors duration-300">
                    {animatedStats.commits}
                  </div>
                  <div className="text-slate-500 text-sm font-light uppercase tracking-widest">
                    Commits
                  </div>
                </div>
                
                <div className="group cursor-default">
                  <div className="text-3xl font-extralight text-white/90 mb-2 group-hover:text-white transition-colors duration-300">
                    {animatedStats.features}+
                  </div>
                  <div className="text-slate-500 text-sm font-light uppercase tracking-widest">
                    Features
                  </div>
                </div>
              </div>

              {/* GitHub Button */}
              <div className="pt-8">
                <a
                  href="https://github.com/StarLord824"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 text-white font-medium rounded-full transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                >
                  <Github className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>View GitHub Profile</span>
                </a>
              </div>
            </div>
          </div>

          {/* Mission & Vision Cards */}
          <div 
            className={`
              grid md:grid-cols-2 gap-8 mb-16 transform transition-all duration-1000 delay-600
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            `}
          >
            {/* Mission Card */}
            <div className="group bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 hover:border-slate-700/50 rounded-2xl p-8 transition-all duration-300 hover:scale-105">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <Target className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-light text-white/95">Mission</h3>
                </div>
                <p className="text-slate-400 font-light leading-relaxed">
                  To create an intuitive, beautiful chess platform that makes the ancient game accessible and enjoyable for players of all skill levels, while fostering a global community of chess enthusiasts.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 hover:border-slate-700/50 rounded-2xl p-8 transition-all duration-300 hover:scale-105">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <Star className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-light text-white/95">Vision</h3>
                </div>
                <p className="text-slate-400 font-light leading-relaxed">
                  To become the premier destination for chess players worldwide, combining cutting-edge technology with timeless strategy to create unforgettable gaming experiences.
                </p>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div 
            className={`
              bg-slate-900/20 backdrop-blur-sm border border-slate-800/30 rounded-3xl p-12
              transform transition-all duration-1000 delay-800
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            `}
          >
            <div className="text-center space-y-12">
              <h2 className="text-3xl md:text-4xl font-light text-white/95">
                Built with Modern Technology
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="group text-center space-y-4">
                  <div className="inline-flex p-4 bg-emerald-500/20 rounded-2xl group-hover:bg-emerald-500/30 transition-colors duration-300">
                    <Users className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h4 className="text-xl font-medium text-white/90">Real-time Multiplayer</h4>
                  <p className="text-slate-400 font-light">Seamless online gameplay with instant move synchronization</p>
                </div>
                
                <div className="group text-center space-y-4">
                  <div className="inline-flex p-4 bg-blue-500/20 rounded-2xl group-hover:bg-blue-500/30 transition-colors duration-300">
                    <Trophy className="w-8 h-8 text-blue-400" />
                  </div>
                  <h4 className="text-xl font-medium text-white/90">Tournament System</h4>
                  <p className="text-slate-400 font-light">Competitive tournaments and ranking systems</p>
                </div>
                
                <div className="group text-center space-y-4">
                  <div className="inline-flex p-4 bg-purple-500/20 rounded-2xl group-hover:bg-purple-500/30 transition-colors duration-300">
                    <Coffee className="w-8 h-8 text-purple-400" />
                  </div>
                  <h4 className="text-xl font-medium text-white/90">Elegant Design</h4>
                  <p className="text-slate-400 font-light">Beautiful, responsive interface crafted for the best UX</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Message */}
          <div 
            className={`
              text-center pt-16 transform transition-all duration-1000 delay-1000
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-slate-500">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-sm font-light">Made with love for the chess community</span>
                <Heart className="w-4 h-4 text-red-400" />
              </div>
              <p className="text-slate-600 text-sm font-light">
                Thank you for being part of this journey. Every game you play helps make MyChess better.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};