import React from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import { scenarios } from "../data/scenarios.ts";

/**
 * IntroPage component - Introduction and instructions for the role-play game
 */
const IntroPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header with Theme Toggle and Cheat Sheet Link */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/cheatsheet')}
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            <span>📋</span>
            <span>Cheat Sheet</span>
          </button>
          <ThemeToggle />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-6 animate-bounce-subtle">🎭</div>
          <h1 className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4 font-display">
            Manager & Employee Role-Play
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            An interactive training platform for practicing essential management
            and communication skills
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Objective Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
              <span className="text-3xl mr-3">🎯</span>
              Objective
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p className="text-lg leading-relaxed">
                This role-play game is designed to help you develop and practice
                critical coaching skills through realistic scenarios:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span>Navigate difficult conversations with empathy</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span>
                    Adapt your communication to different personalities
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span>Practice active listening and questioning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span>Build confidence in handling workplace challenges</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Scenarios Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
              <span className="text-3xl mr-3">📚</span>
              Our Scenarios
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              These are the scenarios we've designed to cover the most common
              managerial moments.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-700 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="text-2xl mb-2 dark:text-gray-300">
                    {scenario.catchyName}
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 text-sm">
                    {scenario.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    {scenario.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {scenario.keySkills
                      .split(",")
                      .slice(0, 2)
                      .map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-100 dark:bg-blue-800/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goals Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
              <span className="text-3xl mr-3">🏆</span>
              What You'll Practice
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border-l-4 border-blue-400">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 flex items-center">
                  <span className="text-xl mr-2">👔</span>
                  As Manager
                </h3>
                <ul className="text-blue-700 dark:text-blue-200 text-sm space-y-2">
                  <li>• Master coaching techniques</li>
                  <li>• Give constructive feedback</li>
                  <li>• Handle resistance and conflict</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl border-l-4 border-green-400">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-3 flex items-center">
                  <span className="text-xl mr-2">💼</span>
                  As Employee
                </h3>
                <ul className="text-green-700 dark:text-green-200 text-sm space-y-2">
                  <li>• Experience different mindsets</li>
                  <li>• Understand workplace challenges</li>
                  <li>• Learn effective communication</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Do's and Don'ts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Do's */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-6 flex items-center">
                <span className="text-3xl mr-3">✅</span>
                Do's
              </h2>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-500 text-xl mr-3 flex-shrink-0">
                    ✓
                  </span>
                  <div>
                    <p className="font-semibold mb-1">Listen actively</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Pay attention to all cues
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 text-xl mr-3 flex-shrink-0">
                    ✓
                  </span>
                  <div>
                    <p className="font-semibold mb-1">Be authentic</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Express emotions true to your role
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 text-xl mr-3 flex-shrink-0">
                    ✓
                  </span>
                  <div>
                    <p className="font-semibold mb-1">Make it yours</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Make notes/observations on each role play
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Don'ts */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6 flex items-center">
                <span className="text-3xl mr-3">⛔</span>
                Don'ts
              </h2>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-500 text-xl mr-3 flex-shrink-0">
                    ✗
                  </span>
                  <div>
                    <p className="font-semibold mb-1">Rush the conversation</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Explore the scenario fully
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 text-xl mr-3 flex-shrink-0">
                    ✗
                  </span>
                  <div>
                    <p className="font-semibold mb-1">Judge or criticize</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Focus on learning, not performance
                    </p>
                  </div>
                </li>

                <li className="flex items-start">
                  <span className="text-red-500 text-xl mr-3 flex-shrink-0">
                    ✗
                  </span>
                  <div>
                    <p className="font-semibold mb-1">Make it personal</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Keep feedback about the role-play not the person
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
              <span className="text-3xl mr-3">🎮</span>
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🎭</div>
                <div className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  1. Reveal Cards
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click mystery cards to reveal participants and roles
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">📋</div>
                <div className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  2. Get Scenario
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pairs are formed and scenarios automatically assigned
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🎯</div>
                <div className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  3. Read Guides
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Review your role-specific coaching guide
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">💬</div>
                <div className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  4. Role-Play
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Practice the coaching conversation together
                </p>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <div className="text-center pt-8">
            <button
              onClick={() => navigate('/game')}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-12 py-5 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-blue-400"
            >
              <span className="flex items-center space-x-3">
                <span>🚀</span>
                <span>Start Role-Play Game</span>
                <span>✨</span>
              </span>
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Click to begin your coaching training session
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
