import React, { useState } from 'react';

/**
 * EmployeeCard component with employee-specific coaching scenario information
 * Includes role briefing, situation context, and helpful phrases for role-play
 */
const EmployeeCard = ({ pair, employee, autoReveal = false }) => {
  const [isLocalRevealed, setIsLocalRevealed] = useState(autoReveal);

  const handleCardClick = () => {
    if (isLocalRevealed) return;
    setIsLocalRevealed(true);
  };

  // Show hidden card only if scenario is revealed but local card hasn't been clicked yet
  if (pair.isScenarioRevealed && !isLocalRevealed) {
    return (
      <div 
        className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border border-emerald-400"
        onClick={handleCardClick}
      >
        <div className="text-white text-center">
          <div className="text-4xl mb-3">💼</div>
          <div className="font-semibold text-xl mb-3">Employee Role Guide</div>
          <div className="text-sm opacity-90 mb-4">
            <div className="bg-white/20 rounded-full px-4 py-2 text-sm font-medium mb-2">
              💼 For: {employee?.name}
            </div>
            <div className="text-xs">
              Your role briefing and helpful phrases
            </div>
          </div>
          <div className="text-xs bg-white bg-opacity-20 rounded-full py-2 px-4 inline-block">
            Click to reveal employee guide 💭
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 h-full flex flex-col">
     
      {/* Scenario Context */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-3 flex items-center">
          <span className="text-lg mr-2">🎯</span>
          {pair.scenario.title}
        </h3>
      </div>

      {/* Employee Brief - Side by Side */}
      <div className="space-y-6 flex-grow flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Your Character Role */}
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-xl border-l-4 border-emerald-400">
            <h4 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-3 flex items-center">
              <span className="text-lg mr-2">🎭</span>
              Your Character Role
            </h4>
            <p className="text-emerald-700 dark:text-emerald-300 text-sm">
              {pair.scenario.employeeRole}
            </p>
          </div>

          {/* Your Situation & Mindset */}
          <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl border-l-4 border-green-400">
            <h4 className="font-semibold text-green-800 dark:text-green-300 mb-3 flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Your Situation & Mindset
            </h4>
            <div className="text-green-700 dark:text-green-200 text-sm leading-relaxed">
              <p>{pair.scenario.employeeBrief}</p>
            </div>
          </div>
        </div>

        {/* Employee Phrases */}
        <div className="bg-teal-50 dark:bg-teal-900/20 p-5 rounded-xl border border-teal-200 dark:border-teal-700 flex-grow">
          <h4 className="font-semibold text-teal-800 dark:text-teal-300 mb-3 flex items-center">
            <span className="text-lg mr-2">💭</span>
            Suggested Phrases to Use
          </h4>
          <div className="space-y-3">
            {pair.scenario.employeePhrases?.map((phrase, index) => (
              <div 
                key={index}
                className="bg-teal-100 dark:bg-teal-800/30 p-4 rounded-lg border-l-4 border-teal-400 hover:bg-teal-200 dark:hover:bg-teal-800/50 transition-colors duration-200"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <div className="text-teal-700 dark:text-teal-200 text-sm leading-relaxed">
                    "{phrase}"
                  </div>
                </div>
              </div>
            )) || (
              <div className="text-gray-500 dark:text-gray-400 text-sm italic">
                No specific phrases available for this scenario.
              </div>
            )}
          </div>
        </div>

        {/* Role-Playing Tips - Pinned to bottom */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border border-blue-200 dark:border-blue-700 mt-auto">
          <h5 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 flex items-center">
            <span className="text-sm mr-2">💡</span>
            Role-Playing Tips
          </h5>
          <div className="text-blue-700 dark:text-blue-200 text-sm space-y-2">
            <div>• Stay in character throughout the conversation</div>
            <div>• Use the suggested phrases naturally</div>
            <div>• Express emotions that fit your situation</div>
            <div>• Don't feel obligated to use all phrases</div>
            <div>• Let the conversation flow organically</div>
            <div>• React authentically to your manager's approach</div>
          </div>
        </div>
      </div>
  
    </div>
  );
};

export default EmployeeCard;
