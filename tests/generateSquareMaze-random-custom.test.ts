import { describe, expect, it } from '@jest/globals';
import { generateSquareMaze, MazeOptions } from '../maze/generateSquareMaze';

const baseOptions: Omit<MazeOptions, 'startPosition' | 'endPosition'> = {
  width: 10,
  height: 10,
  complexity: 50,
  wallThickness: 2,
  seed: 'random-test',
};

describe('generateSquareMaze random/custom start/end', () => {
  it('random start/end are not the same and within bounds', () => {
    const maze = generateSquareMaze({ ...baseOptions, startPosition: 'random', endPosition: 'random' });
    expect(maze.start).toBeDefined();
    expect(maze.end).toBeDefined();
    expect(maze.start && maze.end && (maze.start.x !== maze.end.x || maze.start.y !== maze.end.y)).toBe(true);
    expect(maze.start && maze.start.x).toBeGreaterThanOrEqual(0);
    expect(maze.start && maze.start.x).toBeLessThan(baseOptions.width);
    expect(maze.start && maze.start.y).toBeGreaterThanOrEqual(0);
    expect(maze.start && maze.start.y).toBeLessThan(baseOptions.height);
    expect(maze.end && maze.end.x).toBeGreaterThanOrEqual(0);
    expect(maze.end && maze.end.x).toBeLessThan(baseOptions.width);
    expect(maze.end && maze.end.y).toBeGreaterThanOrEqual(0);
    expect(maze.end && maze.end.y).toBeLessThan(baseOptions.height);
  });
  it('custom start/end start at (0,0) and end is a different cell', () => {
    const maze = generateSquareMaze({ ...baseOptions, startPosition: 'custom', endPosition: 'custom' });
    expect(maze.start).toEqual({ x: 0, y: 0 });
    expect(maze.end).toBeDefined();
    expect(
      maze.start && maze.end && (maze.start.x !== maze.end.x || maze.start.y !== maze.end.y)
    ).toBe(true);
  });
}); 