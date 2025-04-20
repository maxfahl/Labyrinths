import { Card, CardContent } from "@/components/ui/card";
import React, { forwardRef, useMemo } from 'react';
import { MazeOptions } from '../App';
import { generateSquareMaze } from '../maze/generateSquareMaze';

interface MazePreviewProps {
  options: MazeOptions;
}

const MazePreview = forwardRef<SVGSVGElement, MazePreviewProps>(({ options }, svgRef) => {
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

  // Responsive SVG sizing: fill available space, keep square aspect ratio
  // We'll use a container div with aspect-square and w-full h-full

  return (
    <Card className="w-full h-full bg-white border rounded-2xl shadow-xl flex items-center justify-center p-0 overflow-hidden">
      {/* Accessible heading for screen readers and tests */}
      <h2 className="sr-only" role="heading" aria-level={2}>Maze Preview</h2>
      <CardContent className="flex flex-col items-center justify-start w-full h-full p-0">
        <div className="w-full h-full flex-1 flex items-center justify-center aspect-square max-h-full max-w-full">
          <svg
            ref={svgRef as React.Ref<SVGSVGElement>}
            viewBox={`0 0 ${options.width * 20 + 2 * (options.svgPadding ?? 20)} ${options.height * 20 + 2 * (options.svgPadding ?? 20)}`}
            width="100%"
            height="100%"
            style={{ background: options.bgColor, display: 'block', maxWidth: '100%', maxHeight: '100%', border: '1px solid #ccc', height: '100%', width: '100%' }}
            role="img"
            aria-label="Maze Preview"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* No grid overlay */}
            {/* Draw maze walls */}
            {(() => {
              // Calculate cell size based on SVG viewBox
              const padding = options.svgPadding ?? 20;
              const cellW = (options.width > 0) ? ((options.width * 20) / options.width) : 20;
              const cellH = (options.height > 0) ? ((options.height * 20) / options.height) : 20;
              const CELL_SIZE = Math.min(cellW, cellH);
              return maze.walls.map((wall, i) => {
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
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={wallColor} strokeWidth={options.wallThickness} strokeLinecap="round" />;
              });
            })()}
            {/* Draw solution path if enabled */}
            {options.showSolution && maze.solution.length > 1 && (() => {
              const padding = options.svgPadding ?? 20;
              const cellW = (options.width > 0) ? ((options.width * 20) / options.width) : 20;
              const cellH = (options.height > 0) ? ((options.height * 20) / options.height) : 20;
              const CELL_SIZE = Math.min(cellW, cellH);
              return (
                <polyline
                  fill="none"
                  stroke="red"
                  strokeWidth={options.wallThickness}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={maze.solution.map(pos => `${pos.x * CELL_SIZE + CELL_SIZE / 2 + padding},${pos.y * CELL_SIZE + CELL_SIZE / 2 + padding}`).join(' ')}
                />
              );
            })()}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
});

MazePreview.displayName = 'MazePreview';

export default MazePreview; 