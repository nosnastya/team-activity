import React, { useState } from 'react';
import useGameStore from '../store/gameStore.js';

/**
 * Enhanced ScenarioCard component with detailed coaching scenario information
 */
const ScenarioCard = ({ pair }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const revealScenario = useGameStore(state => state.revealScenario);

  // Handle both legacy participant objects and new mystery card format
  const manager = pair.managerName ? 
    { name: pair.managerName } : 
    { name: `Manager ${pair.managerId}` };
  const employee = pair.employeeName ? 
    { name: pair.employeeName } : 
    { name: `Employee ${pair.employeeId}` };

  const handleCardClick = () => {
    if (pair.isScenarioRevealed) return;
    
    setIsRevealed(true);
    revealScenario(pair.id);
  };

  if (!pair.isScenarioRevealed && !isRevealed) {
    return (
      <div 
        className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border border-amber-300"
        onClick={handleCardClick}
      >
        <div className="text-white text-center">
          <div className="text-4xl mb-3">📋</div>
          <div className="font-semibold text-xl mb-3">Coaching Scenario Ready</div>
          <div className="text-sm opacity-90 mb-4">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <div className="bg-white/20 rounded-full px-3 py-1 text-sm font-medium">
                👔 {manager?.name}
              </div>
              <div className="text-lg">🤝</div>
              <div className="bg-white/20 rounded-full px-3 py-1 text-sm font-medium">
                💼 {employee?.name}
              </div>
            </div>
          </div>
          <div className="text-xs bg-white bg-opacity-20 rounded-full py-2 px-4 inline-block">
            Click to reveal coaching scenario ✨
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
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Active Coaching Scenario
          </span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1">
          #{pair.scenario.id}
        </div>
      </div>

      {/* Participant Pair Info */}
      <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl border border-gray-200 dark:border-gray-600">
        <div className="text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Manager</div>
          <div className="font-semibold text-blue-700 dark:text-blue-300 flex items-center justify-center space-x-1">
            <span>👔</span>
            <span className="text-sm">{manager?.name}</span>
          </div>
        </div>
        <div className="text-2xl animate-pulse">🎯</div>
        <div className="text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Employee</div>
          <div className="font-semibold text-green-700 dark:text-green-300 flex items-center justify-center space-x-1">
            <span>💼</span>
            <span className="text-sm">{employee?.name}</span>
          </div>
        </div>
      </div>

      {/* Scenario Details */}
      <div className="space-y-6 flex-grow">
        {/* Title and Description */}
        <div>
          <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-3">
            {pair.scenario.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
            {pair.scenario.description}
          </p>
        </div>

        {/* Objective and Key Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border-l-4 border-purple-400">
            <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2 flex items-center">
              <span className="text-lg mr-2">🎯</span>
              Objective
            </h4>
            <p className="text-purple-700 dark:text-purple-200 text-sm leading-relaxed">
              {pair.scenario.objective}
            </p>
          </div>
          
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border-l-4 border-indigo-400">
            <h4 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-2 flex items-center">
              <span className="text-lg mr-2">💪</span>
              Key Skills Practiced
            </h4>
            <p className="text-indigo-700 dark:text-indigo-200 text-sm leading-relaxed">
              {pair.scenario.keySkills}
            </p>
          </div>
        </div>

        {/* Role-specific Briefs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border-l-4 border-blue-400">
            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Manager Brief
            </h4>
            <div className="text-blue-700 dark:text-blue-200 text-sm leading-relaxed space-y-2">
              <p className="font-medium">Your Role:</p>
              <p>{pair.scenario.managerBrief}</p>
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border-l-4 border-green-400">
            <h4 className="font-semibold text-green-800 dark:text-green-300 mb-3 flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Employee Brief
            </h4>
            <div className="text-green-700 dark:text-green-200 text-sm leading-relaxed space-y-2">
              <p className="font-medium">Your Situation:</p>
              <p><strong>Role:</strong> {pair.scenario.employeeRole}</p>
              <p>{pair.scenario.employeeBrief}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></span>
            <span className="font-medium">Coaching Role-Play Scenario</span>
          </div>
          <span className="bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1">
            Practice and discuss freely
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScenarioCard;