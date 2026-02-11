import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGameStore from "../store/gameStore.ts";
import MysteryCard from "./MysteryCard.jsx";
import ScenarioCard from "./ScenarioCard.jsx";
import ManagerCard from "./ManagerCard.jsx";
import EmployeeCard from "./EmployeeCard.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import Timer from "./Timer.jsx";
import ParticipantSelector from "./ParticipantSelector.jsx";
import ScenarioSelector from "./ScenarioSelector.jsx";
import { generateShareableUrl } from "../utils/urlState.ts";

/**
 * Helper function to render markdown (bold text and links) as HTML
 * Converts **text** to <strong>text</strong>
 * Converts [text](url) to <a href="url">text</a>
 */
const renderMarkdown = (text) => {
  // First, handle links [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }
    // Add the link
    parts.push({ type: 'link', text: match[1], url: match[2] });
    lastIndex = linkRegex.lastIndex;
  }
  
  // Add remaining text after last link
  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex) });
  }

  // If no links found, treat entire text as one part
  if (parts.length === 0) {
    parts.push({ type: 'text', content: text });
  }

  // Now process each part for bold text
  return parts.map((part, partIndex) => {
    if (part.type === 'link') {
      return (
        <a
          key={partIndex}
          href={part.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 font-medium"
        >
          {part.text}
        </a>
      );
    }
    
    // Process bold text in regular text parts
    const boldParts = part.content.split(/(\*\*.*?\*\*)/g);
    return boldParts.map((boldPart, boldIndex) => {
      if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
        return <strong key={`${partIndex}-${boldIndex}`}>{boldPart.slice(2, -2)}</strong>;
      }
      return <span key={`${partIndex}-${boldIndex}`}>{boldPart}</span>;
    });
  });
};

/**
 * GameBoard component with basic TailwindCSS styling
 */
const GameBoard = () => {
  const navigate = useNavigate();
  const {
    mysteryCards,
    pairs,
    initializeGame,
    resetGame,
    getGameStats,
    startNextPair,
    canStartNextPair,
    getAvailableParticipantNames,
    selectedParticipants,
    selectedScenarios,
    setSelectedParticipants,
    setSelectedScenarios,
  } = useGameStore();

  const [shareMessage, setShareMessage] = useState("");
  const [showRules, setShowRules] = useState(false);
  const [showCoachingTips, setShowCoachingTips] = useState(false);
  const [showParticipantSelector, setShowParticipantSelector] = useState(false);
  const [showScenarioSelector, setShowScenarioSelector] = useState(false);
  const stats = getGameStats();

  // Check if loading from URL with parameters (only once on mount)
  const [isLoadedFromUrl] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.has("card1_role") || params.has("scenario_id");
  });

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleResetGame = () => {
    resetGame();
    // Clear URL parameters when resetting
    if (window.location.hash.includes('?')) {
      const baseHash = window.location.hash.split('?')[0];
      window.history.replaceState(null, '', window.location.pathname + baseHash);
    }
  };

  const handleNextPair = () => {
    startNextPair();
  };

  const handleConfirmParticipants = (participants) => {
    setSelectedParticipants(participants);
    setShowParticipantSelector(false);
    // Reset game with new participants and clear URL
    resetGame();
    if (window.location.hash.includes('?')) {
      const baseHash = window.location.hash.split('?')[0];
      window.history.replaceState(null, '', window.location.pathname + baseHash);
    }
  };

  const handleConfirmScenarios = (scenarios) => {
    setSelectedScenarios(scenarios);
    setShowScenarioSelector(false);
    // Reset game with new scenarios and clear URL
    resetGame();
    if (window.location.hash.includes('?')) {
      const baseHash = window.location.hash.split('?')[0];
      window.history.replaceState(null, '', window.location.pathname + baseHash);
    }
  };

  const handleShareSession = async () => {
    if (pairs.length > 0 && mysteryCards.length === 2) {
      const pair = pairs[0];

      // Use the actual mystery cards with their correct role assignments
      const pairMysteryCards = mysteryCards.map(card => ({
        id: card.id,
        isRevealed: true,
        participant: card.participant,
        role: card.role,
      }));

      const shareUrl = generateShareableUrl(pairMysteryCards, pair.scenario);

      try {
        await navigator.clipboard.writeText(shareUrl);
        setShareMessage("Link copied to clipboard! 📋");
        setTimeout(() => setShareMessage(""), 3000);
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
          {/* Theme Toggle and Back Button */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigate('/')}
              className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 border border-gray-300 dark:border-gray-600 flex items-center space-x-2"
            >
              <span>←</span>
              <span>Back to Intro</span>
            </button>
            <ThemeToggle />
          </div>

 {/* Role-Play Rules - Always visible at top */}
 <div className="mb-12 max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-blue-900/20 dark:to-orange-900/20 rounded-xl border border-blue-200 dark:border-amber-700 shadow-md">
            <button
              onClick={() => setShowRules(!showRules)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-blue-100/50 dark:hover:bg-blue-900/30 transition-colors duration-200 rounded-xl"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📋</span>
                <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300">
                  Role-Play Rules
                </h3>
              </div>
              <span className="text-blue-600 dark:text-blue-400 text-2xl">
                {showRules ? "▲" : "▼"}
              </span>
            </button>

            {showRules && (
              <div className="px-6 pb-6 pt-2">
                <div className=" max-w-2xl mx-auto">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-xl mr-3 flex-shrink-0">1️⃣</span>
                      <span className="text-amber-800 dark:text-amber-200">
                        <strong>Reveal Roles:</strong> Click to reveal Employee
                        & Manager guides
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-xl mr-3 flex-shrink-0">2️⃣</span>
                      <span className="text-amber-800 dark:text-amber-200">
                        <strong>Read Scenario:</strong> Review your role brief
                        carefully
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-xl mr-3 flex-shrink-0">3️⃣</span>
                      <span className="text-amber-800 dark:text-amber-200">
                        <strong>Prepare:</strong> Take 3 minutes to prepare your
                        approach
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-xl mr-3 flex-shrink-0">4️⃣</span>
                      <span className="text-amber-800 dark:text-amber-200">
                        <strong>Role-Play:</strong> Conduct the conversation for
                        5-7 minutes
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-xl mr-3 flex-shrink-0"> 5️⃣</span>
                      <span className="text-amber-800 dark:text-amber-200">
                        <strong>Repeat:</strong> Assign new manager/employee
                        pair and repeat
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

          {/* Main Title */}
          <h1 className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4 font-display">
            Role-Play Game
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Manager & Employee Scenarios - Click cards to reveal roles and
            scenarios
          </p>

          {/* Game Stats */}
          <div className="inline-flex items-center space-x-6 bg-white dark:bg-gray-800 rounded-xl px-6 py-3 shadow-lg border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShowParticipantSelector(true)}
              className="flex items-center space-x-2 relative group hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-2 rounded-lg transition-colors cursor-pointer"
              title="Click to change participants"
            >
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Available:{" "}
                <span className="font-bold">{stats.availableParticipants}</span>
              </span>
              <span className="text-xs text-blue-500 dark:text-blue-400">✏️</span>
              {/* Tooltip */}
              {getAvailableParticipantNames().length > 0 && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-50 pointer-events-none">
                  <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg py-2 px-3 shadow-xl whitespace-nowrap">
                    <div className="font-semibold mb-1">Available Participants:</div>
                    {getAvailableParticipantNames().map((name, idx) => (
                      <div key={idx} className="text-gray-200 dark:text-gray-300">• {name}</div>
                    ))}
                    <div className="text-gray-400 text-[10px] mt-1 italic">Click to edit</div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                      <div className="border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                    </div>
                  </div>
                </div>
              )}
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Used:{" "}
                <span className="font-bold">{stats.usedParticipants}</span>
              </span>
            </div>
            <button
              onClick={() => setShowScenarioSelector(true)}
              className="flex items-center space-x-2 hover:bg-green-50 dark:hover:bg-green-900/20 px-3 py-2 rounded-lg transition-colors cursor-pointer"
              title="Click to change scenarios"
            >
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Scenarios:{" "}
                <span className="font-bold">{stats.availableScenarios}</span>
              </span>
              <span className="text-xs text-green-500 dark:text-green-400">✏️</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Pairs: <span className="font-bold">{stats.formedPairs}</span>
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
          {mysteryCards.every((card) => card.isRevealed) &&
            pairs.length === 0 && (
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
            <div className="space-y-12">
              {pairs.map((pair) => {
                // Create employee object for compatibility
                const employee = {
                  name: pair.employeeName || `Employee ${pair.employeeId}`,
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
                      <div className="space-y-8">
                        {/* Scenario Summary */}
                        <div className="text-center">
                          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                            <span className="text-indigo-600 dark:text-indigo-400">Scenario:</span>{" "}
                            {pair.scenario.title} - {pair.scenario.catchyName}
                          </h2>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-[1600px] mx-auto">
                          {/* Employee Card - First */}
                          <div className="flex flex-col h-full">
                            <EmployeeCard
                              pair={pair}
                              employee={employee}
                              autoReveal={isLoadedFromUrl}
                            />
                          </div>
                          {/* Manager Card - Second */}
                          <div className="flex flex-col h-full">
                            <ManagerCard
                              pair={pair}
                              autoReveal={isLoadedFromUrl}
                            />
                          </div>
                        </div>

                        {/* Coaching Tips Cheat Sheet - After both cards revealed (hidden when loaded from shared URL) */}
                        {!isLoadedFromUrl && (
                          <div className="max-w-4xl mx-auto mt-12">
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200 dark:border-indigo-700 shadow-lg">
                              <button
                                onClick={() =>
                                  setShowCoachingTips(!showCoachingTips)
                                }
                                className="w-full px-6 py-4 flex items-center justify-between hover:bg-indigo-100/50 dark:hover:bg-indigo-900/30 transition-colors duration-200 rounded-xl"
                              >
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">🎓</span>
                                <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300">
                                  Coaching Tips for This Scenario
                                </h3>
                              </div>
                              <span className="text-indigo-600 dark:text-indigo-400 text-2xl">
                                {showCoachingTips ? "▲" : "▼"}
                              </span>
                            </button>

                            {showCoachingTips && pair.scenario.coachingTips && (
                              <div className="px-6 pb-6 pt-2">
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  {/* DO's */}
                                  <div className="bg-white dark:bg-indigo-900/30 rounded-lg p-5 border border-green-200 dark:border-green-700">
                                    <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center">
                                      <span className="text-xl mr-2">✅</span>
                                      DO
                                    </h4>
                                    <ul className="space-y-2">
                                      {pair.scenario.coachingTips.dos.map(
                                        (tip, idx) => (
                                          <li
                                            key={idx}
                                            className="text-sm text-gray-700 dark:text-gray-300 flex items-start"
                                          >
                                            <span className="text-green-500 mr-2 mt-0.5">
                                              •
                                            </span>
                                            <span>{renderMarkdown(tip)}</span>
                                          </li>
                                        ),
                                      )}
                                    </ul>
                                  </div>

                                  {/* DON'Ts */}
                                  <div className="bg-white dark:bg-indigo-900/30 rounded-lg p-5 border border-red-200 dark:border-red-700">
                                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center">
                                      <span className="text-xl mr-2">❌</span>
                                      DON'T
                                    </h4>
                                    <ul className="space-y-2">
                                      {pair.scenario.coachingTips.donts.map(
                                        (tip, idx) => (
                                          <li
                                            key={idx}
                                            className="text-sm text-gray-700 dark:text-gray-300 flex items-start"
                                          >
                                            <span className="text-red-500 mr-2 mt-0.5">
                                              •
                                            </span>
                                            <span>{renderMarkdown(tip)}</span>
                                          </li>
                                        ),
                                      )}
                                    </ul>
                                  </div>
                                </div>

                                {/* Power Move */}
                                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg p-5 border border-amber-200 dark:border-amber-700">
                                  <div className="flex items-start space-x-3">
                                    <span className="text-2xl flex-shrink-0">
                                      ⚡
                                    </span>
                                    <div>
                                      <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">
                                        Power Move
                                      </h4>
                                      <p className="text-amber-700 dark:text-amber-200 font-medium">
                                        "{renderMarkdown(pair.scenario.coachingTips.powerMove)}"
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        )}

                        {/* Next Pair Button */}
                        {canStartNextPair() && (
                          <div className="flex justify-center mt-12">
                            <button
                              onClick={handleNextPair}
                              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-purple-400"
                            >
                              <span className="flex items-center space-x-3">
                                <span>🎭</span>
                                <span>Next Pair</span>
                                <span>✨</span>
                              </span>
                            </button>
                          </div>
                        )}

                        {/* No More Pairs Available Message */}
                        {!canStartNextPair() && (
                          <div className="flex justify-center mt-12">
                            <div className="bg-amber-100 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-600 rounded-xl px-8 py-4 text-center">
                              <div className="text-amber-800 dark:text-amber-300 font-bold text-lg mb-2">
                                🏆 All Scenarios Complete!
                              </div>
                              <div className="text-amber-600 dark:text-amber-400 text-sm">
                                No more participants available
                              </div>
                            </div>
                          </div>
                        )}
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
        {stats.revealedParticipants > 0 &&
          stats.revealedParticipants < stats.totalParticipants && (
            <div className="mt-16 text-center">
              <div className="text-gray-600 dark:text-gray-300 text-sm">
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  {stats.totalParticipants - stats.revealedParticipants}
                </span>{" "}
                participants remaining to reveal
              </div>
            </div>
          )}
      </div>

      {/* Floating Timer Widget - Always Available */}
      <Timer />

      {/* Participant Selector Modal */}
      <ParticipantSelector
        isOpen={showParticipantSelector}
        onClose={() => setShowParticipantSelector(false)}
        onConfirm={handleConfirmParticipants}
        initialSelected={selectedParticipants}
      />

      {/* Scenario Selector Modal */}
      <ScenarioSelector
        isOpen={showScenarioSelector}
        onClose={() => setShowScenarioSelector(false)}
        onConfirm={handleConfirmScenarios}
        initialSelected={selectedScenarios}
      />
    </div>
  );
};

export default GameBoard;
