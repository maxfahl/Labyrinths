import React, { useMemo } from 'react';
import { MazeOptions } from '../App';
import { generateSquareMaze } from '../maze/generateSquareMaze';

interface MazePreviewProps {
  options: MazeOptions;
}

const CELL_SIZE = 24;

const MazePreview: React.FC<MazePreviewProps> = ({ options }) => {
  // Memoize maze generation so toggling showSolution does not regenerate the maze
  const mazeDeps = useMemo(() => {
    // Only include options that affect maze structure
    const { width, height, complexity, wallThickness, seed, startPosition, endPosition } = options;
    return { width, height, complexity, wallThickness, seed, startPosition, endPosition };
  }, [options.width, options.height, options.complexity, options.wallThickness, options.seed, options.startPosition, options.endPosition]);

  const maze = useMemo(() => {
    return generateSquareMaze({
      width: options.width,
      height: options.height,
      complexity: options.complexity,
      wallThickness: options.wallThickness,
      seed: options.seed,
      startPosition: options.startPosition,
      endPosition: options.endPosition,
    });
  }, [mazeDeps]);

  if (!maze) {
    return (
      <div className="text-gray-400 border border-dashed border-gray-300 rounded p-8 mt-4 text-center">[Maze not generated]</div>
    );
  }

  // High contrast mode
  const isHighContrast = options.highContrast;
  const svgBgColor = isHighContrast ? '#000' : options.bgColor;
  const svgLineColor = isHighContrast ? '#fff' : options.lineColor;
  const fontSize = options.fontSize || 16;

  // Helper to render grid overlay for square mazes
  function renderGridOverlay(w: number, h: number, padding: number) {
    const lines = [];
    for (let x = 1; x < options.width; x++) {
      lines.push(
        <line
          key={`vgrid-${x}`}
          x1={x * CELL_SIZE + padding}
          y1={padding}
          x2={x * CELL_SIZE + padding}
          y2={h + padding}
          stroke={svgLineColor}
          strokeWidth={1}
          strokeDasharray="4 4"
          opacity={0.3}
        />
      );
    }
    for (let y = 1; y < options.height; y++) {
      lines.push(
        <line
          key={`hgrid-${y}`}
          x1={padding}
          y1={y * CELL_SIZE + padding}
          x2={w + padding}
          y2={y * CELL_SIZE + padding}
          stroke={svgLineColor}
          strokeWidth={1}
          strokeDasharray="4 4"
          opacity={0.3}
        />
      );
    }
    return lines;
  }

  const w = options.width * CELL_SIZE;
  const h = options.height * CELL_SIZE;
  const padding = options.svgPadding ?? 20;
  return (
    <section className="flex-1 min-w-0 h-full flex flex-col items-center justify-start bg-none border-none shadow-none p-0">
      <h2 style={{ fontSize }}>{'Maze Preview'}</h2>
      <svg
        width={w + 2 * padding}
        height={h + 2 * padding}
        style={{ background: options.highContrast ? '#000' : options.bgColor, display: 'block', maxWidth: '100%', border: '1px solid #ccc' }}
        role="img"
        aria-label="Maze Preview"
      >
        {/* Draw grid overlay if enabled */}
        {options.showGrid && renderGridOverlay(w, h, padding)}
        {/* Draw maze walls */}
        {maze.walls.map((wall, i) => {
          const x = wall.x * CELL_SIZE + padding;
          const y = wall.y * CELL_SIZE + padding;
          let x2 = x, y2 = y;
          switch (wall.dir) {
            case 'N': x2 = x + CELL_SIZE; y2 = y; break;
            case 'S': x2 = x + CELL_SIZE; y2 = y + CELL_SIZE; break;
            case 'E': x2 = x + CELL_SIZE; y2 = y + CELL_SIZE; y2 = y; break;
            case 'W': x2 = x; y2 = y + CELL_SIZE; break;
          }
          const wallColor = isHighContrast ? svgLineColor : options.lineColor;
          if (wall.dir === 'N') return <line key={i} x1={x} y1={y} x2={x2} y2={y2} stroke={wallColor} strokeWidth={options.wallThickness} />;
          if (wall.dir === 'S') return <line key={i} x1={x} y1={y + CELL_SIZE} x2={x + CELL_SIZE} y2={y + CELL_SIZE} stroke={wallColor} strokeWidth={options.wallThickness} />;
          if (wall.dir === 'E') return <line key={i} x1={x + CELL_SIZE} y1={y} x2={x + CELL_SIZE} y2={y + CELL_SIZE} stroke={wallColor} strokeWidth={options.wallThickness} />;
          if (wall.dir === 'W') return <line key={i} x1={x} y1={y} x2={x} y2={y + CELL_SIZE} stroke={wallColor} strokeWidth={options.wallThickness} />;
          return null;
        })}
        {/* Draw solution path if enabled */}
        {options.showSolution && maze.solution.length > 1 && (
          <polyline
            fill="none"
            stroke="red"
            strokeWidth={options.wallThickness}
            points={maze.solution.map(pos => `${pos.x * CELL_SIZE + CELL_SIZE / 2 + padding},${pos.y * CELL_SIZE + CELL_SIZE / 2 + padding}`).join(' ')}
          />
        )}
      </svg>
    </section>
  );
};

export default MazePreview; 