import React, { useState, useEffect } from 'react';
import { scenarios as allScenarios } from '../data/scenarios.ts';

/**
 * ScenarioSelector Modal Component
 * Allows selecting which scenarios are available for the game
 */
const ScenarioSelector = ({ isOpen, onClose, onConfirm, initialSelected }) => {
  const [selectedScenarios, setSelectedScenarios] = useState(initialSelected || allScenarios);

  useEffect(() => {
    if (initialSelected) {
      setSelectedScenarios(initialSelected);
    }
  }, [initialSelected]);

  const toggleScenario = (scenarioId) => {
    const scenario = allScenarios.find(s => s.id === scenarioId);
    if (!scenario) return;

    if (selectedScenarios.find(s => s.id === scenarioId)) {
      setSelectedScenarios(selectedScenarios.filter(s => s.id !== scenarioId));
    } else {
      setSelectedScenarios([...selectedScenarios, scenario]);
    }
  };

  const selectAll = () => {
    setSelectedScenarios([...allScenarios]);
  };

  const deselectAll = () => {
    setSelectedScenarios([]);
  };

  const handleConfirm = () => {
    if (selectedScenarios.length < 1) {
      alert('Please select at least 1 scenario');
      return;
    }
    onConfirm(selectedScenarios);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <span className="text-3xl mr-3">🎯</span>
            Select Scenarios for Session
          </h2>
          <p className="text-purple-100 text-sm mt-1">
            Choose which coaching scenarios to practice today
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Quick Actions */}
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                {selectedScenarios.length}
              </span>{" "}
              of {allScenarios.length} selected
            </div>
            <div className="flex space-x-2">
              <button
                onClick={selectAll}
                className="text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
              >
                Select All
              </button>
              <button
                onClick={deselectAll}
                className="text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Scenario List */}
          <div className="grid grid-cols-1 gap-3">
            {allScenarios.map((scenario) => {
              const isSelected = selectedScenarios.find(s => s.id === scenario.id);
              return (
                <label
                  key={scenario.id}
                  className={`flex items-start space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300 dark:hover:border-purple-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={!!isSelected}
                    onChange={() => toggleScenario(scenario.id)}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500 cursor-pointer mt-1 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3
                          className={`font-semibold text-base mb-1 ${
                            isSelected
                              ? 'text-purple-700 dark:text-purple-300'
                              : 'text-gray-800 dark:text-gray-200'
                          }`}
                        >
                          {scenario.title}
                        </h3>
                        <p
                          className={`text-sm mb-2 ${
                            isSelected
                              ? 'text-purple-600 dark:text-purple-400'
                              : 'text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {scenario.catchyName}
                        </p>
                        <p
                          className={`text-xs ${
                            isSelected
                              ? 'text-purple-600 dark:text-purple-400'
                              : 'text-gray-500 dark:text-gray-500'
                          }`}
                        >
                          {scenario.description}
                        </p>
                      </div>
                      {isSelected && (
                        <span className="text-purple-500 text-xl ml-2 flex-shrink-0">✓</span>
                      )}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Warning if none selected */}
          {selectedScenarios.length === 0 && (
            <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3">
              <p className="text-sm text-yellow-800 dark:text-yellow-300 flex items-center">
                <span className="text-xl mr-2">⚠️</span>
                Please select at least 1 scenario to start the game
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 flex justify-end space-x-3 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={selectedScenarios.length < 1}
            className={`px-6 py-2 rounded-lg font-semibold text-white transition-all duration-200 ${
              selectedScenarios.length >= 1
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-md hover:shadow-lg transform hover:scale-105'
                : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
            }`}
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScenarioSelector;
