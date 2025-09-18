import React, { useEffect, useState } from 'react';
import useGameStore from '../store/gameStore.js';
import MysteryCard from './MysteryCard.jsx';
import ScenarioCard from './ScenarioCard.jsx';
import EmployeePhrasesCard from './EmployeePhrasesCard.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { generateShareableUrl } from '../utils/urlState.js';

/**
 * GameBoard component with basic TailwindCSS styling
 */
const GameBoard = () => {
  const {
    mysteryCards,
    pairs,
    initializeGame,
    resetGame,
    getGameStats,
  } = useGameStore();
  
  const [shareMessage, setShareMessage] = useState('');
  const stats = getGameStats();

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleResetGame = () => {
    resetGame();
  };

  const handleShareSession = async () => {
    if (pairs.length > 0) {
      const pair = pairs[0];
      
      // Create mystery cards from pair data for URL generation
      const pairMysteryCards = [
        {
          id: 1,
          isRevealed: true,
          participant: pair.managerName,
          role: 'Manager'
        },
        {
          id: 2,
          isRevealed: true,
          participant: pair.employeeName,
          role: 'Employee'
        }
      ];
      
      const shareUrl = generateShareableUrl(pairMysteryCards, pair.scenario);
      
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShareMessage('Link copied to clipboard! 📋');
        setTimeout(() => setShareMessage(''), 3000);
      } catch (err) {
        // Fallback for browsers that don't support clipboard API
        setShareMessage(`Share this link: ${shareUrl}`);
        setTimeout(() => setShareMessage(err), 5000);
      }
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 py-8 px-4">
      <div className="max-w-7.5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Theme Toggle */}
          <div className="flex justify-end mb-6">
            <ThemeToggle />
          </div>

          {/* Main Title */}
          <h1 className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4 font-display">
            Role-Play Game
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Manager & Employee Scenarios - Click cards to reveal roles and scenarios
          </p>
          
          {/* Game Stats */}
          <div className="inline-flex items-center space-x-6 bg-white dark:bg-gray-800 rounded-xl px-6 py-3 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Revealed: <span className="font-bold">{stats.revealedParticipants}/{stats.totalParticipants}</span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Pairs: <span className="font-bold">{stats.formedPairs}</span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Scenarios: <span className="font-bold">{stats.revealedScenarios}</span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Used: <span className="font-bold">{stats.usedScenarios}</span>
              </span>
            </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleResetGame}
                    className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 border border-gray-300 dark:border-gray-600"
                  >
                    🔄 Reset Game
                  </button>
                  {pairs.length > 0 && (
                    <button
                      onClick={handleShareSession}
                      className="bg-blue-100 dark:bg-blue-700 hover:bg-blue-200 dark:hover:bg-blue-600 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 border border-blue-300 dark:border-blue-600"
                    >
                      🔗 Share Session
                    </button>
                  )}
                </div>
          </div>
        </div>

        {/* Game Completion Status */}
        {stats.isComplete && (
          <div className="mb-12 text-center">
            <div className="inline-block bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-600 rounded-xl px-8 py-6">
              <div className="text-green-800 dark:text-green-300 font-bold text-2xl mb-2">
                🎉 Game Complete!
              </div>
              <div className="text-green-600 dark:text-green-400">
                All participants have been paired and scenarios revealed
              </div>
            </div>
          </div>
        )}

        {/* Share Message */}
        {shareMessage && (
          <div className="mb-8 text-center">
            <div className="inline-block bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-600 rounded-xl px-6 py-3 animate-fadeIn">
              <div className="text-green-800 dark:text-green-300 font-medium">
                {shareMessage}
              </div>
            </div>
          </div>
        )}

        {/* Mystery Cards Selection */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
            🎭 Mystery Selection
          </h2>
          <div className="text-center mb-8">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Click the mystery cards to reveal participants and their roles
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              ✨ Each card will randomly assign a team member and role ✨
            </div>
          </div>
          <div className="flex justify-center gap-12">
            {mysteryCards.map((card) => (
              <MysteryCard key={card.id} card={card} />
            ))}
          </div>
          
          {/* Show success message when both cards revealed */}
          {mysteryCards.every(card => card.isRevealed) && pairs.length === 0 &&(
            <div className="mt-8 text-center">
              <div className="inline-block bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-600 rounded-xl px-6 py-3 animate-fadeIn">
                <div className="text-green-800 dark:text-green-300 font-bold">
                  🎉 Perfect Match! Manager & Employee pair formed!
                </div>
                <div className="text-green-600 dark:text-green-400 text-sm mt-1">
                  Assigning scenario...
                </div>
              </div>
            </div>
          )}
        </div> 

        {/* Pairs and Scenarios Section */}
        {pairs.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
              Paired Scenarios & Employee Guides
            </h2>
            <div className="space-y-12">
              {pairs.map((pair) => {
                // Create employee object for compatibility
                const employee = {
                  name: pair.employeeName || `Employee ${pair.employeeId}`
                };
                
                return (
                  <div key={pair.id} className="w-full">
                    {/* Before scenario is revealed - centered single card */}
                    {!pair.isScenarioRevealed && (
                      <div className="flex justify-center">
                        <div className="max-w-6xl w-full">
                          <ScenarioCard pair={pair} />
                        </div>
                      </div>
                    )}
                    
                    {/* After scenario is revealed - side by side cards */}
                    {pair.isScenarioRevealed && (
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-[1600px] mx-auto">
                        {/* Scenario Card */}
                        <div className="flex flex-col h-full">
                          <ScenarioCard pair={pair} />
                        </div>
                        
                        {/* Employee Phrases Card */}
                        <div className="flex flex-col h-full">
                          <EmployeePhrasesCard pair={pair} employee={employee} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Waiting for Pairs Message */}
        {stats.revealedParticipants > 0 && pairs.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⏳</div>
            <div className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              Waiting for pairs to form...
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              Reveal more participants to create Manager-Employee pairs
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        {stats.revealedParticipants > 0 && stats.revealedParticipants < stats.totalParticipants && (
          <div className="mt-16 text-center">
            <div className="text-gray-600 dark:text-gray-300 text-sm">
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                {stats.totalParticipants - stats.revealedParticipants}
              </span> participants remaining to reveal
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;