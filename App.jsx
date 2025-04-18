import React from 'react'
import './App.css'
import ControlsPanel from './components/ControlsPanel'
import MazePreview from './components/MazePreview'

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Labyrinth Generator</h1>
      </header>
      <main className="main-layout">
        <ControlsPanel />
        <MazePreview />
      </main>
    </div>
  )
}

export default App
