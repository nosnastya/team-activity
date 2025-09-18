import React, { useState } from 'react';
import useGameStore from '../store/gameStore.js';

/**
 * MysteryCard component with magical shimmer effects and automatic assignment
 */
const MysteryCard = ({ card }) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [showSuspense, setShowSuspense] = useState(false);
  const revealMysteryCard = useGameStore(state => state.revealMysteryCard);

  const handleCardClick = () => {
    if (card.isRevealed || isFlipping) return;
    
    setIsFlipping(true);
    setShowSuspense(true);
    
    // Add suspense delay before revealing
    setTimeout(() => {
      revealMysteryCard(card.id);
      setIsFlipping(false);
      setShowSuspense(false);
    }, 1500); // 1.5 second suspense delay
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Manager':
        return 'from-blue-500 to-blue-700';
      case 'Employee':
        return 'from-green-500 to-green-700';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Manager':
        return '👔';
      case 'Employee':
        return '💼';
      default:
        return '✨';
    }
  };

  return (
    <div className="perspective-1000">
      <div
        className={`
          relative w-40 h-52 cursor-pointer transition-transform duration-700 ease-in-out
          ${isFlipping || card.isRevealed ? 'transform' : ''}
          ${!card.isRevealed && !isFlipping ? 'hover:scale-105 hover:shadow-2xl transition-all duration-300' : ''}
          ${card.isRevealed ? 'cursor-default' : ''}
        `}
        onClick={handleCardClick}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipping || card.isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front of card (mystery state) */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-2xl shadow-2xl flex flex-col items-center justify-center text-white border-2 border-purple-400 relative overflow-hidden">
            {/* Magical shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            
            {/* Sparkling stars background */}
            <div className="absolute inset-0">
              <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-sparkle"></div>
              <div className="absolute top-8 right-6 w-1 h-1 bg-yellow-300 rounded-full animate-sparkle" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-pink-300 rounded-full animate-sparkle" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-8 right-4 w-1 h-1 bg-blue-300 rounded-full animate-sparkle" style={{animationDelay: '1.5s'}}></div>
              <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full animate-sparkle" style={{animationDelay: '0.8s'}}></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 text-center">
              {showSuspense ? (
                <div className="animate-pulse">
                  <div className="text-6xl mb-4 animate-spin">🎭</div>
                  <div className="text-sm font-medium opacity-90">Revealing...</div>
                  <div className="flex justify-center space-x-1 mt-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-6xl mb-4 animate-float">🎭</div>
                  <div className="text-lg font-bold mb-2 font-display">Participant</div>
                  <div className="text-sm font-medium opacity-90 mb-1">#{card.id}</div>
                  <div className="text-xs opacity-75 bg-white/20 rounded-full py-2 px-4 backdrop-blur-sm">
                    Click to reveal ✨
                  </div>
                </>
              )}
            </div>

            {/* Magical glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 animate-pulse"></div>
          </div>
        </div>

        {/* Back of card (revealed state) */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className={`
            w-full h-full bg-gradient-to-br ${getRoleColor(card.role)}
            rounded-2xl shadow-2xl flex flex-col items-center justify-center text-white
            border-2 border-white border-opacity-30 px-3 relative overflow-hidden
            animate-fadeIn
          `}>
            {/* Celebration confetti effect */}
            <div className="absolute inset-0">
              <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-300 rounded-full animate-confetti"></div>
              <div className="absolute top-4 right-3 w-1.5 h-1.5 bg-pink-300 rounded-full animate-confetti" style={{animationDelay: '0.2s'}}></div>
              <div className="absolute bottom-3 left-3 w-1 h-1 bg-green-300 rounded-full animate-confetti" style={{animationDelay: '0.4s'}}></div>
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-blue-300 rounded-full animate-confetti" style={{animationDelay: '0.6s'}}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
              <div className="text-xs font-medium mb-2 opacity-75">Revealed!</div>
              <div className="text-4xl mb-3 animate-bounce">{getRoleIcon(card.role)}</div>
              <div className="text-lg font-bold mb-2 font-display">{card.role}</div>
              <div className="text-sm font-semibold text-center leading-tight mb-3 bg-white/20 rounded-lg py-2 px-3">
                {card.participant}
              </div>
              
              {/* Sparkle effect */}
              <div className="flex justify-center space-x-1">
                <span className="text-yellow-300 animate-sparkle">✨</span>
                <span className="text-pink-300 animate-sparkle" style={{animationDelay: '0.3s'}}>✨</span>
                <span className="text-blue-300 animate-sparkle" style={{animationDelay: '0.6s'}}>✨</span>
              </div>
            </div>

            {/* Success glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-yellow-200/20 to-white/10 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MysteryCard;
