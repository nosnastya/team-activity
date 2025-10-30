import React, { useState } from 'react';
import useGameStore from '../store/gameStore.ts';

/**
 * ManagerCard component with manager-specific coaching scenario information
 */
const ManagerCard = ({ pair }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const revealScenario = useGameStore(state => state.revealScenario);

  // Handle both legacy participant objects and new mystery card format
  const manager = pair.managerName ? 
    { name: pair.managerName } : 
    { name: `Manager ${pair.managerId}` };

  const handleCardClick = () => {
    if (pair.isScenarioRevealed) return;
    
    setIsRevealed(true);
    revealScenario(pair.id);
  };

  if (!pair.isScenarioRevealed && !isRevealed) {
    return (
      <div 
        className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border border-blue-400"
        onClick={handleCardClick}
      >
        <div className="text-white text-center">
          <div className="text-4xl mb-3">👔</div>
          <div className="font-semibold text-xl mb-3">Manager Coaching Guide</div>
          <div className="text-sm opacity-90 mb-4">
            <div className="bg-white/20 rounded-full px-4 py-2 text-sm font-medium mb-2">
              🎯 For: {manager?.name}
            </div>
            <div className="text-xs">
              Your coaching scenario and guidance
            </div>
          </div>
          <div className="text-xs bg-white bg-opacity-20 rounded-full py-2 px-4 inline-block">
            Click to reveal manager guide 🎯
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Manager Coaching Guide
          </span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1">
          👔 Leadership
        </div>
      </div>

      {/* Manager Info */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
        <div className="text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Coaching Guide for</div>
          <div className="font-semibold text-blue-700 dark:text-blue-300 flex items-center justify-center space-x-2">
            <span>👔</span>
            <span>{manager?.name}</span>
          </div>
        </div>
      </div>

      {/* Scenario Context */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-3 flex items-center">
          <span className="text-lg mr-2">🎯</span>
          {pair.scenario.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
          {pair.scenario.description}
        </p>
      </div>

      {/* Training Focus */}
      <div className="space-y-6 flex-grow">
        <div className="bg-purple-50 dark:bg-purple-900/20 p-5 rounded-xl border-l-4 border-purple-400">
          <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-3 flex items-center">
            <span className="text-lg mr-2">🎯</span>
            Training Objective
          </h4>
          <p className="text-purple-700 dark:text-purple-200 text-sm leading-relaxed mb-4">
            {pair.scenario.objective}
          </p>
          
          <div className="bg-purple-100 dark:bg-purple-800/30 p-4 rounded-lg">
            <h5 className="font-semibold text-purple-800 dark:text-purple-300 mb-2 flex items-center">
              <span className="text-sm mr-2">💪</span>
              Key Skills to Practice
            </h5>
            <p className="text-purple-700 dark:text-purple-200 text-sm">
              {pair.scenario.keySkills}
            </p>
          </div>
        </div>

        {/* Manager Brief */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border-l-4 border-blue-400">
          <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 flex items-center">
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            Your Coaching Role
          </h4>
          <div className="text-blue-700 dark:text-blue-200 text-sm leading-relaxed space-y-3">
            <div className="bg-blue-100 dark:bg-blue-800/30 p-4 rounded-lg">
              <p className="font-medium mb-2">🎯 Your Mission:</p>
              <p>{pair.scenario.managerBrief}</p>
            </div>
          </div>
        </div>

        {/* Coaching Tips */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-xl border border-indigo-200 dark:border-indigo-700">
          <h5 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-3 flex items-center">
            <span className="text-sm mr-2">💡</span>
            Coaching Best Practices
          </h5>
          <div className="text-indigo-700 dark:text-indigo-200 text-sm space-y-2">
            <div>• Listen actively and ask open-ended questions</div>
            <div>• Focus on understanding before being understood</div>
            <div>• Guide them to discover solutions themselves</div>
            <div>• Provide specific, actionable feedback</div>
            <div>• Create a safe space for honest dialogue</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-pulse"></span>
            <span className="font-medium">Manager Coaching Guide</span>
          </div>
          <span className="bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1">
            Lead with empathy
          </span>
        </div>
      </div>
    </div>
  );
};

export default ManagerCard;
