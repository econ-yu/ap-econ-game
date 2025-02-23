import React, { useState } from 'react';
import GameMode from './components/Game/GameMode';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>AP Economics Practice Game</h1>
      </header>
      <main>
        <GameMode />
      </main>
    </div>
  );
}

export default App;