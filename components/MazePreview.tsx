import React, { useMemo } from 'react';
import { MazeOptions } from '../App';
import { generateSquareMaze } from '../maze/generateSquareMaze';

interface MazePreviewProps {
  options: MazeOptions;
}

const BASE_SVG_SIZE = 600;

const MazePreview: React.FC<MazePreviewProps> = ({ options }) => {
  // Memoize maze generation so toggling showSolution does not regenerate the maze
  const mazeDeps = useMemo(() => {
    const { width, height, wallThickness, seed, startPosition, endPosition } = options;
    return { width, height, wallThickness, seed, startPosition, endPosition };
  }, [options.width, options.height, options.wallThickness, options.seed, options.startPosition, options.endPosition]);

  const maze = useMemo(() => {
    return generateSquareMaze({
      width: options.width,
      height: options.height,
      complexity: 100,
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

  // Cell size is determined by SVG size / cell count
  const CELL_SIZE = Math.min(
    (BASE_SVG_SIZE - 2 * (options.svgPadding ?? 20)) / options.width,
    (BASE_SVG_SIZE - 2 * (options.svgPadding ?? 20)) / options.height
  );
  const padding = options.svgPadding ?? 20;
  const fontSize = 16;

  return (
    <section className="flex-1 min-w-0 h-full flex flex-col items-center justify-start bg-none border-none shadow-none p-0">
      <h2 style={{ fontSize }}>{'Maze Preview'}</h2>
      <svg
        width={BASE_SVG_SIZE}
        height={BASE_SVG_SIZE}
        style={{ background: options.bgColor, display: 'block', maxWidth: '100%', border: '1px solid #ccc' }}
        role="img"
        aria-label="Maze Preview"
      >
        {/* No grid overlay */}
        {/* Draw maze walls */}
        {maze.walls.map((wall, i) => {
          const baseX = wall.x * CELL_SIZE + padding;
          const baseY = wall.y * CELL_SIZE + padding;
          let x1 = baseX, y1 = baseY, x2 = baseX, y2 = baseY;
          switch (wall.dir) {
            case 'N':
              x2 = baseX + CELL_SIZE;
              break;
            case 'S':
              y1 = baseY + CELL_SIZE;
              x2 = baseX + CELL_SIZE;
              y2 = baseY + CELL_SIZE;
              break;
            case 'E':
              x1 = baseX + CELL_SIZE;
              x2 = baseX + CELL_SIZE;
              y2 = baseY + CELL_SIZE;
              break;
            case 'W':
              y2 = baseY + CELL_SIZE;
              break;
          }
          const wallColor = options.lineColor;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={wallColor} strokeWidth={options.wallThickness} />;
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