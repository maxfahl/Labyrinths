/* eslint-env jest */
import { describe, expect, it } from '@jest/globals';
import { generateSquareMaze, MazeData, MazeOptions } from '../maze/generateSquareMaze';

describe('generateSquareMaze', () => {
  it('returns a maze object with grid, walls, start, end, and solution', () => {
    const options: MazeOptions = {
      width: 10,
      height: 10,
      complexity: 50,
      wallThickness: 4,
      seed: 'test-seed',
      startPosition: 'top-left',
      endPosition: 'bottom-right',
    };
    const maze: MazeData = generateSquareMaze(options);
    expect(maze).toBeDefined();
    expect(typeof maze).toBe('object');
    expect(maze).toHaveProperty('grid');
    expect(maze).toHaveProperty('walls');
    expect(maze).toHaveProperty('start');
    expect(maze).toHaveProperty('end');
    expect(maze).toHaveProperty('solution');
  });

  it('creates a grid of the correct size', () => {
    const maze = generateSquareMaze({ width: 5, height: 7, complexity: 50, wallThickness: 2, seed: 1, startPosition: 'top-left', endPosition: 'bottom-right' });
    expect(Array.isArray(maze.grid)).toBe(true);
    expect(maze.grid.length).toBe(7);
    maze.grid.forEach(row => expect(row.length).toBe(5));
  });

  it('start and end are valid coordinates', () => {
    const maze = generateSquareMaze({ width: 8, height: 8, complexity: 50, wallThickness: 2, seed: 1, startPosition: 'top-left', endPosition: 'bottom-right' });
    expect(maze.start).toEqual({ x: 0, y: 0 });
    expect(maze.end).toEqual({ x: 7, y: 7 });
  });

  it('walls is a non-empty array', () => {
    const maze = generateSquareMaze({ width: 6, height: 6, complexity: 50, wallThickness: 2, seed: 1, startPosition: 'top-left', endPosition: 'bottom-right' });
    expect(Array.isArray(maze.walls)).toBe(true);
    expect(maze.walls.length).toBeGreaterThan(0);
  });

  it('is reproducible with the same seed', () => {
    const opts = { width: 10, height: 10, complexity: 50, wallThickness: 2, seed: 'repeat', startPosition: 'top-left', endPosition: 'bottom-right' };
    const maze1 = generateSquareMaze(opts);
    const maze2 = generateSquareMaze(opts);
    expect(maze1.grid).toEqual(maze2.grid);
    expect(maze1.walls).toEqual(maze2.walls);
    expect(maze1.solution).toEqual(maze2.solution);
  });

  it('handles 1x1 maze', () => {
    const maze = generateSquareMaze({ width: 1, height: 1, complexity: 1, wallThickness: 1, seed: 0, startPosition: 'top-left', endPosition: 'top-left' });
    expect(maze.grid.length).toBe(1);
    expect(maze.grid[0].length).toBe(1);
    expect(maze.start).toEqual({ x: 0, y: 0 });
    expect(maze.end).toEqual({ x: 0, y: 0 });
  });
}); 