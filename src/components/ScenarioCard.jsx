import React from 'react';
import useGameStore from '../store/gameStore.ts';

/**
 * ScenarioCard component for initial scenario reveal
 * Shows before the detailed Manager and Employee cards are displayed
 */
const ScenarioCard = ({ pair }) => {
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
    
    revealScenario(pair.id);
  };

  return (
    <div 
      className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border border-amber-300"
      onClick={handleCardClick}
    >
      <div className="text-white text-center">
        <div className="text-4xl mb-3">📋</div>
        <div className="font-bold text-2xl mb-2">{pair.scenario?.catchyName || 'Coaching Scenario'}</div>
        <div className="font-medium text-lg mb-3 opacity-90">{pair.scenario?.title}</div>
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
};

export default ScenarioCard;
