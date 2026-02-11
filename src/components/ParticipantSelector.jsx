import React, { useState, useEffect } from 'react';
import { participants as allParticipants } from '../data/scenarios.ts';

/**
 * ParticipantSelector Modal Component
 * Allows selecting which participants are available for the game
 */
const ParticipantSelector = ({ isOpen, onClose, onConfirm, initialSelected }) => {
  const [selectedParticipants, setSelectedParticipants] = useState(initialSelected || allParticipants);

  useEffect(() => {
    if (initialSelected) {
      setSelectedParticipants(initialSelected);
    }
  }, [initialSelected]);

  const toggleParticipant = (name) => {
    if (selectedParticipants.includes(name)) {
      setSelectedParticipants(selectedParticipants.filter(p => p !== name));
    } else {
      setSelectedParticipants([...selectedParticipants, name]);
    }
  };

  const selectAll = () => {
    setSelectedParticipants([...allParticipants]);
  };

  const deselectAll = () => {
    setSelectedParticipants([]);
  };

  const handleConfirm = () => {
    if (selectedParticipants.length < 2) {
      alert('Please select at least 2 participants');
      return;
    }
    onConfirm(selectedParticipants);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <span className="text-3xl mr-3">👥</span>
            Select Available Participants
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            Choose who will participate in today's session
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Quick Actions */}
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {selectedParticipants.length}
              </span>{" "}
              of {allParticipants.length} selected
            </div>
            <div className="flex space-x-2">
              <button
                onClick={selectAll}
                className="text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
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

          {/* Participant List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {allParticipants.map((name) => {
              const isSelected = selectedParticipants.includes(name);
              return (
                <label
                  key={name}
                  className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleParticipant(name)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <span
                    className={`flex-1 font-medium ${
                      isSelected
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {name}
                  </span>
                  {isSelected && (
                    <span className="text-blue-500 text-xl">✓</span>
                  )}
                </label>
              );
            })}
          </div>

          {/* Warning if too few selected */}
          {selectedParticipants.length < 2 && selectedParticipants.length > 0 && (
            <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3">
              <p className="text-sm text-yellow-800 dark:text-yellow-300 flex items-center">
                <span className="text-xl mr-2">⚠️</span>
                Please select at least 2 participants to start the game
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
            disabled={selectedParticipants.length < 2}
            className={`px-6 py-2 rounded-lg font-semibold text-white transition-all duration-200 ${
              selectedParticipants.length >= 2
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg transform hover:scale-105'
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

export default ParticipantSelector;
