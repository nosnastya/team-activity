import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import IntroPage from './components/IntroPage.jsx';
import GameBoard from './components/GameBoard.jsx';
import CheatSheet from './components/CheatSheet.jsx';
import './App.css';

/**
 * Main App component with React Router (Hash-based for GitHub Pages)
 * Entry point for the Role-Play Game application with separate routes
 */
function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/game" element={<GameBoard />} />
            <Route path="/cheatsheet" element={<CheatSheet />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;