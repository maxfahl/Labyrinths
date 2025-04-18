import { generateRoundMazeWithPrims } from '@/maze/generateRoundMaze';
import React from 'react';
import { MazeOptions } from '../App';
import { generateSquareMaze } from '../maze/generateSquareMaze';

interface MazePreviewProps {
  options: MazeOptions;
}

const CELL_SIZE = 24;

const MazePreview: React.FC<MazePreviewProps> = ({ options }) => {
  if (options.mazeType === 'round') {
    // Render round maze with Prim's algorithm
    const maze = generateRoundMazeWithPrims({
      width: options.width,
      height: options.height,
      complexity: options.complexity,
      wallThickness: options.wallThickness,
      seed: options.seed,
      startPosition: options.startPosition,
      endPosition: options.endPosition,
    });
    const size = Math.max(options.width, options.height) * CELL_SIZE * 1.2;
    const cx = size / 2;
    const cy = size / 2;
    const outerRadius = size / 2 - 20;
    // Helper to get polar coordinates
    const getPolar = (ring: number, sector: number) => {
      const r = outerRadius * (ring + 1) / options.height;
      const theta = 2 * Math.PI * sector / options.width;
      return [cx + r * Math.cos(theta), cy + r * Math.sin(theta)];
    };
    // Helper to draw arc path for a cell wall
    const arcPath = (ring: number, sector: number, dir: 'in' | 'out') => {
      const r = outerRadius * (dir === 'in' ? ring : ring + 1) / options.height;
      const theta1 = 2 * Math.PI * sector / options.width;
      const theta2 = 2 * Math.PI * (sector + 1) / options.width;
      const x1 = cx + r * Math.cos(theta1);
      const y1 = cy + r * Math.sin(theta1);
      const x2 = cx + r * Math.cos(theta2);
      const y2 = cy + r * Math.sin(theta2);
      const largeArc = theta2 - theta1 > Math.PI ? 1 : 0;
      return `M${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2}`;
    };
    return (
      <section className="flex-1 min-w-0 h-full flex flex-col items-center justify-start bg-none border-none shadow-none p-0">
        <h2>Maze Preview</h2>
        <svg width={size} height={size} style={{ background: options.bgColor, display: 'block', maxWidth: '100%', border: '1px solid #ccc' }} role="img" aria-label="Maze Preview">
          {/* Draw open center if end is center */}
          {options.endPosition === 'center' && (
            <circle cx={cx} cy={cy} r={outerRadius * 0.5 / options.height} fill={options.bgColor} stroke={options.lineColor} strokeWidth={options.wallThickness * 2} />
          )}
          {/* Draw only the actual maze walls, skipping 'in' for center exit and 'out' for outer start */}
          {maze.walls.map((wall, i) => {
            const { x: sector, y: ring, dir } = wall;
            if (dir === 'out' && ring !== options.height - 1) return null;
            if (dir === 'right' && sector !== options.width - 1) return null;
            // Skip 'in' wall for center exit
            if (dir === 'in' && ring === 0 && options.endPosition === 'center') return null;
            // Skip 'out' wall for outer ring start
            if (dir === 'out' && ring === options.height - 1 && options.startPosition === 'outer') return null;
            const isOuter = dir === 'out' && ring === options.height - 1;
            if (dir === 'in' || dir === 'out') {
              return (
                <path
                  key={i}
                  d={arcPath(ring, sector, dir)}
                  stroke={options.lineColor}
                  strokeWidth={isOuter ? options.wallThickness * 2 : options.wallThickness}
                  fill="none"
                  strokeLinecap="round"
                />
              );
            }
            // left/right: radial lines
            const r1 = outerRadius * ring / options.height;
            const r2 = outerRadius * (ring + 1) / options.height;
            const theta = 2 * Math.PI * (dir === 'left' ? sector : sector + 1) / options.width;
            const x1 = cx + r1 * Math.cos(theta);
            const y1 = cy + r1 * Math.sin(theta);
            const x2 = cx + r2 * Math.cos(theta);
            const y2 = cy + r2 * Math.sin(theta);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={options.lineColor}
                strokeWidth={options.wallThickness}
                strokeLinecap="round"
              />
            );
          })}
          {/* Draw solution path if enabled, with round linejoin for polish */}
          {options.showSolution && maze.solution.length > 1 && (() => {
            let d = '';
            for (let i = 0; i < maze.solution.length; i++) {
              const pos = maze.solution[i];
              const r = outerRadius * (pos.y + 0.5) / options.height;
              const theta = 2 * Math.PI * (pos.x + 0.5) / options.width;
              const x = cx + r * Math.cos(theta);
              const y = cy + r * Math.sin(theta);
              if (i === 0) {
                d = `M${x},${y}`;
              } else {
                const prev = maze.solution[i - 1];
                const rPrev = outerRadius * (prev.y + 0.5) / options.height;
                const thetaPrev = 2 * Math.PI * (prev.x + 0.5) / options.width;
                if (pos.y === prev.y) {
                  const sweep = (pos.x > prev.x || (prev.x === options.width - 1 && pos.x === 0)) ? 1 : 0;
                  d += ` A${r},${r} 0 0,${sweep} ${x},${y}`;
                } else {
                  d += ` L${x},${y}`;
                }
              }
            }
            return (
              <path
                d={d}
                fill="none"
                stroke="red"
                strokeWidth={options.wallThickness}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          })()}
        </svg>
      </section>
    );
  }
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
  const padding = options.svgPadding ?? 20;
  return (
    <section className="flex-1 min-w-0 h-full flex flex-col items-center justify-start bg-none border-none shadow-none p-0">
      <h2>Maze Preview</h2>
      <svg width={w + 2 * padding} height={h + 2 * padding} style={{ background: options.bgColor, display: 'block', maxWidth: '100%', border: '1px solid #ccc' }} role="img" aria-label="Maze Preview">
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
            points={maze.solution.map(pos => `${pos.x * CELL_SIZE + CELL_SIZE / 2 + padding},${pos.y * CELL_SIZE + CELL_SIZE / 2 + padding}`).join(' ')}
          />
        )}
      </svg>
    </section>
  );
};

export default MazePreview; 