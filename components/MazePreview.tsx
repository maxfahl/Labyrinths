import React from 'react';
import { MazeOptions } from '../App';
import { generateSquareMaze } from '../maze/generateSquareMaze';

interface MazePreviewProps {
  options: MazeOptions;
}

const CELL_SIZE = 24;

const MazePreview: React.FC<MazePreviewProps> = ({ options }) => {
  if (options.mazeType !== 'square') {
    return (
      <div className="text-gray-400 border border-dashed border-gray-300 rounded p-8 mt-4 text-center">[Maze type not implemented]</div>
    );
  }
  const maze = generateSquareMaze({
    width: options.width,
    height: options.height,
    complexity: options.complexity,
    wallThickness: options.wallThickness,
    seed: options.seed,
    startPosition: options.startPosition,
    endPosition: options.endPosition,
  });
  const w = options.width * CELL_SIZE;
  const h = options.height * CELL_SIZE;
  return (
    <section className="flex-1 min-w-0 h-full flex flex-col items-center justify-start bg-none border-none shadow-none p-0">
      <h2>Maze Preview</h2>
      <svg width={w} height={h} style={{ background: options.bgColor, display: 'block', maxWidth: '100%', border: '1px solid #ccc' }}>
        {/* Draw maze walls */}
        {maze.walls.map((wall, i) => {
          const x = wall.x * CELL_SIZE;
          const y = wall.y * CELL_SIZE;
          let x2 = x, y2 = y;
          switch (wall.dir) {
            case 'N': x2 = x + CELL_SIZE; y2 = y; break;
            case 'S': x2 = x + CELL_SIZE; y2 = y + CELL_SIZE; break;
            case 'E': x2 = x + CELL_SIZE; y2 = y + CELL_SIZE; y2 = y; break;
            case 'W': x2 = x; y2 = y + CELL_SIZE; break;
          }
          if (wall.dir === 'N') return <line key={i} x1={x} y1={y} x2={x2} y2={y2} stroke={options.lineColor} strokeWidth={options.wallThickness} />;
          if (wall.dir === 'S') return <line key={i} x1={x} y1={y + CELL_SIZE} x2={x + CELL_SIZE} y2={y + CELL_SIZE} stroke={options.lineColor} strokeWidth={options.wallThickness} />;
          if (wall.dir === 'E') return <line key={i} x1={x + CELL_SIZE} y1={y} x2={x + CELL_SIZE} y2={y + CELL_SIZE} stroke={options.lineColor} strokeWidth={options.wallThickness} />;
          if (wall.dir === 'W') return <line key={i} x1={x} y1={y} x2={x} y2={y + CELL_SIZE} stroke={options.lineColor} strokeWidth={options.wallThickness} />;
          return null;
        })}
        {/* Draw solution path if enabled */}
        {options.showSolution && maze.solution.length > 1 && (
          <polyline
            fill="none"
            stroke="red"
            strokeWidth={options.wallThickness}
            points={maze.solution.map(pos => `${pos.x * CELL_SIZE + CELL_SIZE / 2},${pos.y * CELL_SIZE + CELL_SIZE / 2}`).join(' ')}
          />
        )}
      </svg>
    </section>
  );
};

export default MazePreview; 