import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function ConnectingHeartsCard() {
  return (
    <div className="">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.5); }
          50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.8); }
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.15); }
          50% { transform: scale(1); }
        }
        
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        
        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .gradient-animate {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
      `}</style>
      
      <div className="card w-full max-w-md bg-base-100 shadow-2xl relative overflow-hidden">
        {/* Animated Background Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 gradient-animate pointer-events-none"></div>
        
        {/* Floating Hearts Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Heart className="absolute top-10 left-10 text-pink-500/20 w-8 h-8 float-animation" style={{animationDelay: '0s'}} />
          <Heart className="absolute top-20 right-16 text-purple-500/20 w-6 h-6 float-animation" style={{animationDelay: '1s'}} />
          <Heart className="absolute bottom-24 left-16 text-pink-400/20 w-7 h-7 float-animation" style={{animationDelay: '2s'}} />
          <Heart className="absolute bottom-10 right-10 text-purple-400/20 w-5 h-5 float-animation" style={{animationDelay: '1.5s'}} />
          <Sparkles className="absolute top-1/3 right-8 text-yellow-300/20 w-6 h-6 float-animation" style={{animationDelay: '0.5s'}} />
          <Sparkles className="absolute bottom-1/3 left-12 text-yellow-400/20 w-5 h-5 float-animation" style={{animationDelay: '2.5s'}} />
        </div>
        
        <div className="card-body items-center text-center relative z-10">
          {/* Main Heart Icon */}
          <div className="mb-4 heartbeat">
            <Heart className="w-16 h-16 text-pink-500 fill-pink-500" />
          </div>
          
          {/* Title */}
          <h2 className="card-title text-4xl font-bold bg-linear-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent gradient-animate mb-3">
            Connecting Hearts!
          </h2>
          
          {/* Description */}
          <p className="text-base-content/80 text-lg mb-6 leading-relaxed">
            Join our community and find your perfect match today.
          </p>
          
          {/* Decorative Divider */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px w-12 bg-linear-to-r from-transparent via-pink-500 to-transparent"></div>
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            <div className="h-px w-12 bg-linear-to-r from-transparent via-pink-500 to-transparent"></div>
          </div>
          
          {/* Action Button */}
          <div className="card-actions">
            <button className="btn btn-primary bg-linear-to-r from-pink-500 to-purple-600 border-none text-white px-8 pulse-glow hover:scale-105 transition-transform duration-300">
              <Heart className="w-5 h-5 mr-2" />
              Get Started
            </button>
          </div>
          
          {/* Stats/Features */}
          <div className="grid grid-cols-3 gap-4 mt-8 w-full">
            <div className="stat p-4 bg-base-200/50 rounded-lg backdrop-blur-sm">
              <div className="stat-value text-2xl text-pink-500">10K+</div>
              <div className="stat-desc text-xs">Members</div>
            </div>
            <div className="stat p-4 bg-base-200/50 rounded-lg backdrop-blur-sm">
              <div className="stat-value text-2xl text-purple-500">500+</div>
              <div className="stat-desc text-xs">Matches</div>
            </div>
            <div className="stat p-4 bg-base-200/50 rounded-lg backdrop-blur-sm">
              <div className="stat-value text-2xl text-pink-500">98%</div>
              <div className="stat-desc text-xs">Happy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}