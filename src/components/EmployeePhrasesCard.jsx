import React, { useState } from 'react';

/**
 * EmployeePhrasesCard component that shows helpful phrases for role-play
 * Appears after the scenario is revealed to guide the employee role
 */
const EmployeePhrasesCard = ({ pair, employee }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleCardClick = () => {
    if (isRevealed) return;
    setIsRevealed(true);
  };

  if (!isRevealed) {
    return (
      <div 
        className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border border-emerald-300"
        onClick={handleCardClick}
      >
        <div className="text-white text-center">
          <div className="text-4xl mb-3">💬</div>
          <div className="font-semibold text-xl mb-3">Employee Phrases</div>
          <div className="text-sm opacity-90 mb-4">
            <div className="bg-white/20 rounded-full px-4 py-2 text-sm font-medium mb-2">
              💼 For: {employee?.name}
            </div>
            <div className="text-xs">
              Helpful phrases to use during role-play
            </div>
          </div>
          <div className="text-xs bg-white bg-opacity-20 rounded-full py-2 px-4 inline-block">
            Click to reveal phrases 💭
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
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Employee Phrases Guide
          </span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1">
          💬 Role-play
        </div>
      </div>

      {/* Employee Info */}
      <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-700">
        <div className="text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Phrases for</div>
          <div className="font-semibold text-emerald-700 dark:text-emerald-300 flex items-center justify-center space-x-2">
            <span>💼</span>
            <span>{employee?.name}</span>
          </div>
        </div>
      </div>

      {/* Scenario Context */}
      <div className="mb-6">
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2 flex items-center">
          <span className="text-lg mr-2">🎯</span>
          {pair.scenario.title}
        </h3>
        <div className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <strong>Your Role:</strong> {pair.scenario.employeeRole}
        </div>
      </div>

      {/* Employee Phrases */}
      <div className="space-y-4 flex-grow">
        <div>
          <h4 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-3 flex items-center">
            <span className="text-lg mr-2">💭</span>
            Suggested Phrases to Use
          </h4>
          <div className="space-y-3">
            {pair.scenario.employeePhrases?.map((phrase, index) => (
              <div 
                key={index}
                className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border-l-4 border-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors duration-200"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <div className="text-emerald-700 dark:text-emerald-200 text-sm leading-relaxed">
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
      </div>

      {/* Usage Tips */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
        <h5 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center">
          <span className="text-sm mr-2">💡</span>
          How to Use These Phrases
        </h5>
        <div className="text-blue-700 dark:text-blue-200 text-sm space-y-1">
          <div>• Use these phrases naturally during the conversation</div>
          <div>• Don't feel obligated to use all of them</div>
          <div>• Adapt the tone to match your character's emotion</div>
          <div>• Let the conversation flow organically</div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse"></span>
            <span className="font-medium">Employee Role-Play Guide</span>
          </div>
          <span className="bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1">
            Practice authentically
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmployeePhrasesCard;
