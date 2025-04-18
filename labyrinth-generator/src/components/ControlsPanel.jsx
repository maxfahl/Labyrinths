import React, { useState } from 'react';

const MAZE_TYPES = [
  { value: 'square', label: 'Square' },
  { value: 'round', label: 'Round' },
  { value: 'squiggly', label: 'Squiggly' },
  { value: 'spaghetti', label: 'Spaghetti' },
];

function ControlsPanel() {
  const [mazeType, setMazeType] = useState('square');
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(600);
  const [complexity, setComplexity] = useState(50);

  return (
    <section className="controls-panel">
      <h2>Controls</h2>
      <div className="form-group">
        <label htmlFor="maze-type">Type</label>
        <select id="maze-type" value={mazeType} onChange={e => setMazeType(e.target.value)}>
          {MAZE_TYPES.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Size (px)</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="number"
            min={100}
            max={2000}
            value={width}
            onChange={e => setWidth(Number(e.target.value))}
            style={{ width: 70 }}
            aria-label="Width"
          />
          <span>x</span>
          <input
            type="number"
            min={100}
            max={2000}
            value={height}
            onChange={e => setHeight(Number(e.target.value))}
            style={{ width: 70 }}
            aria-label="Height"
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="complexity">Complexity: {complexity}</label>
        <input
          id="complexity"
          type="range"
          min={1}
          max={100}
          value={complexity}
          onChange={e => setComplexity(Number(e.target.value))}
        />
      </div>
    </section>
  );
}

export default ControlsPanel; 