import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import GameBoard from './components/GameBoard.jsx';
import './App.css';

/**
 * Main App component
 * Entry point for the Role-Play Game application with theme support
 */
function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <GameBoard />
      </div>
    </ThemeProvider>
  );
}

export default App;