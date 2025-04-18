import { describe, expect, it } from '@jest/globals';
import { generateSquareMaze, MazeOptions } from '../maze/generateSquareMaze';

const baseOptions: Omit<MazeOptions, 'startPosition' | 'endPosition'> = {
  width: 10,
  height: 10,
  complexity: 50,
  wallThickness: 2,
  seed: 'edge-test',
};

const edgePositions = ['top', 'right', 'bottom', 'left'];
const cornerPositions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

describe('generateSquareMaze edge/corner entrance/exit', () => {
  edgePositions.forEach(start => {
    edgePositions.forEach(end => {
      it(`generates maze with start=${start} and end=${end} (not same cell)`, () => {
        const maze = generateSquareMaze({ ...baseOptions, startPosition: start, endPosition: end });
        expect(maze.start).toBeDefined();
        expect(maze.end).toBeDefined();
        expect(maze.start && maze.end && (maze.start.x !== maze.end.x || maze.start.y !== maze.end.y)).toBe(true);
      });
    });
  });
  cornerPositions.forEach(start => {
    cornerPositions.forEach(end => {
      it(`generates maze with start=${start} and end=${end} (not same cell)`, () => {
        const maze = generateSquareMaze({ ...baseOptions, startPosition: start, endPosition: end });
        expect(maze.start).toBeDefined();
        expect(maze.end).toBeDefined();
        expect(
          maze.start && maze.end && (maze.start.x !== maze.end.x || maze.start.y !== maze.end.y)
        ).toBe(true);
      });
    });
  });
  it('removes the correct wall for top edge entrance', () => {
    const maze = generateSquareMaze({ ...baseOptions, startPosition: 'top', endPosition: 'bottom' });
    expect(maze.start).toBeDefined();
    if (maze.start) expect(maze.grid[maze.start.y][maze.start.x].walls.N).toBe(false);
  });
  it('removes the correct wall for bottom edge entrance', () => {
    const maze = generateSquareMaze({ ...baseOptions, startPosition: 'bottom', endPosition: 'top' });
    expect(maze.start).toBeDefined();
    if (maze.start) expect(maze.grid[maze.start.y][maze.start.x].walls.S).toBe(false);
  });
  it('removes the correct wall for left edge entrance', () => {
    const maze = generateSquareMaze({ ...baseOptions, startPosition: 'left', endPosition: 'right' });
    expect(maze.start).toBeDefined();
    if (maze.start) expect(maze.grid[maze.start.y][maze.start.x].walls.W).toBe(false);
  });
  it('removes the correct wall for right edge entrance', () => {
    const maze = generateSquareMaze({ ...baseOptions, startPosition: 'right', endPosition: 'left' });
    expect(maze.start).toBeDefined();
    if (maze.start) expect(maze.grid[maze.start.y][maze.start.x].walls.E).toBe(false);
  });
}); 