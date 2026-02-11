import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle.jsx';
import { scenarios } from '../data/scenarios.ts';
import { convertToThirdPerson } from '../utils/textUtils.ts';

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
 * CheatSheet component - Quick reference guide for employee personas and coaching tips
 */
const CheatSheet = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-6">
          <ThemeToggle />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center">
              <span className="text-4xl mr-3">📋</span>
              Coaching Cheat Sheet
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Quick reference guide for employee personas and coaching strategies
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold transition-colors duration-200 border border-gray-300 dark:border-gray-600 flex items-center space-x-2 shadow-md"
          >
            <span>←</span>
            <span>Back to Home</span>
          </button>
        </div>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {scenarios.map((scenario) => (
            <div 
              key={scenario.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              {/* Scenario Header */}
              <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                  {scenario.catchyName}
                </h2>
                <h3 className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                  {scenario.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  {scenario.description}
                </p>
              </div>

              {/* Employee Persona */}
              <div className="mb-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
                <h4 className="text-base font-bold text-green-800 dark:text-green-300 mb-2 flex items-center">
                  <span className="text-xl mr-2">👤</span>
                  Employee Persona
                </h4>
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold text-green-700 dark:text-green-300 text-sm">Profile: </span>
                    <span className="text-green-800 dark:text-green-200 text-sm">{scenario.employeeRole}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-green-700 dark:text-green-300 text-sm">Behavioral Summary: </span>
                    <p className="text-green-800 dark:text-green-200 text-sm mt-1">
                      {convertToThirdPerson(scenario.employeeBrief)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Coaching Tips */}
              {scenario.coachingTips && (
                <div className="space-y-3">
                  <h4 className="text-base font-bold text-gray-800 dark:text-gray-100 flex items-center mb-2">
                    <span className="text-xl mr-2">🎯</span>
                    Coaching Strategy
                  </h4>

                  <div className="grid grid-cols-2 gap-3">
                    {/* DO's */}
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-700">
                      <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center text-sm">
                        <span className="text-lg mr-1">✅</span>
                        DO
                      </h5>
                      <ul className="space-y-1">
                        {scenario.coachingTips.dos.map((tip, idx) => (
                          <li key={idx} className="text-xs text-blue-800 dark:text-blue-200 flex items-start">
                            <span className="text-blue-500 mr-1 mt-0.5">•</span>
                            <span>{renderMarkdown(tip)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* DON'Ts */}
                    <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-lg p-3 border border-red-200 dark:border-red-700">
                      <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2 flex items-center text-sm">
                        <span className="text-lg mr-1">❌</span>
                        DON'T
                      </h5>
                      <ul className="space-y-1">
                        {scenario.coachingTips.donts.map((tip, idx) => (
                          <li key={idx} className="text-xs text-red-800 dark:text-red-200 flex items-start">
                            <span className="text-red-500 mr-1 mt-0.5">•</span>
                            <span>{renderMarkdown(tip)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Power Move */}
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg p-3 border border-amber-200 dark:border-amber-700">
                    <div className="flex items-start space-x-2">
                      <span className="text-lg flex-shrink-0">⚡</span>
                      <div>
                        <h5 className="font-semibold text-amber-800 dark:text-amber-300 mb-1 text-sm">
                          Power Move
                        </h5>
                        <p className="text-amber-700 dark:text-amber-200 text-xs font-medium">
                          "{renderMarkdown(scenario.coachingTips.powerMove)}"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Key Skills */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-700">
                    <h5 className="font-semibold text-purple-700 dark:text-purple-300 mb-2 flex items-center text-sm">
                      <span className="text-lg mr-1">🔑</span>
                      Key Skills
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {scenario.keySkills.split(',').map((skill, idx) => (
                        <span 
                          key={idx}
                          className="text-xs bg-purple-100 dark:bg-purple-800/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Final Coaching Truth */}
        <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-700 shadow-lg">
          <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 mb-3 flex items-center">
            <span className="text-2xl mr-2">💎</span>
            Final Coaching Truth
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-indigo-900/30 rounded-lg p-4 border border-indigo-200 dark:border-indigo-600">
              <div className="text-2xl mb-1">😶</div>
              <p className="text-indigo-800 dark:text-indigo-200 font-semibold text-sm">
                Soft when clarity is needed = <span className="text-red-600 dark:text-red-400">cruel</span>
              </p>
            </div>
            <div className="bg-white dark:bg-indigo-900/30 rounded-lg p-4 border border-indigo-200 dark:border-indigo-600">
              <div className="text-2xl mb-1">😤</div>
              <p className="text-indigo-800 dark:text-indigo-200 font-semibold text-sm">
                Direct without empathy = <span className="text-red-600 dark:text-red-400">destructive</span>
              </p>
            </div>
            <div className="bg-white dark:bg-indigo-900/30 rounded-lg p-4 border border-indigo-200 dark:border-indigo-600">
              <div className="text-2xl mb-1">⭐</div>
              <p className="text-indigo-800 dark:text-indigo-200 font-semibold text-sm">
                Great managers do <span className="text-green-600 dark:text-green-400">both</span>
              </p>
            </div>
          </div>
        </div>

        {/* Back Button at Bottom */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheatSheet;