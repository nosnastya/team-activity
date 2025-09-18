import React, { useState } from 'react';
import useGameStore from '../store/gameStore.js';

/**
 * ParticipantCard component with basic styling
 */
const ParticipantCard = ({ participant }) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const revealParticipant = useGameStore(state => state.revealParticipant);

  const handleCardClick = () => {
    if (participant.isRevealed || isFlipping) return;
    
    setIsFlipping(true);
    
    setTimeout(() => {
      revealParticipant(participant.id);
      setIsFlipping(false);
    }, 300);
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
        return '🎭';
    }
  };

  return (
    <div className="perspective-1000">
      <div
        className={`
          relative w-32 h-44 cursor-pointer transition-transform duration-500
          ${isFlipping || participant.isRevealed ? 'transform' : ''}
          ${!participant.isRevealed && !isFlipping ? 'hover:scale-105 hover:shadow-lg transition-all duration-200' : ''}
          ${participant.isRevealed ? 'cursor-default' : ''}
          ${participant.pairId ? 'ring-2 ring-purple-400 ring-opacity-75' : ''}
        `}
        onClick={handleCardClick}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipping || participant.isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front of card (hidden state) */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-md flex flex-col items-center justify-center text-white border border-indigo-300 px-2">
            <div className="text-3xl mb-2">❓</div>
            <div className="text-xs font-medium mb-1 opacity-90">Team Member</div>
            <div className="text-sm font-semibold text-center leading-tight">{participant.name}</div>
            {!isFlipping && (
              <div className="absolute bottom-2 left-2 right-2 text-xs opacity-75 text-center">
                Click to reveal role
              </div>
            )}
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
            w-full h-full bg-gradient-to-br ${getRoleColor(participant.role)}
            rounded-xl shadow-md flex flex-col items-center justify-center text-white
            border border-white border-opacity-30 px-2
          `}>
            <div className="text-xs font-medium mb-1 text-center leading-tight opacity-90">{participant.name}</div>
            <div className="text-2xl mb-2">{getRoleIcon(participant.role)}</div>
            <div className="text-lg font-bold mb-1">{participant.role}</div>
            
            <div className="absolute bottom-2 left-2 right-2">
              {participant.pairId ? (
                <div className="text-xs text-center bg-white bg-opacity-20 rounded-full py-1 px-2">
                  ✓ Paired
                </div>
              ) : (
                <div className="text-xs text-center opacity-75">
                  Waiting for pair...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantCard;