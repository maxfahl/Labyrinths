import { generateRoundMaze } from './generateSquareMaze';
describe('generateRoundMaze', () => {
  it('generates a round maze with correct dimensions', () => {
    const maze = generateRoundMaze({
      width: 8,
      height: 5,
      complexity: 50,
      wallThickness: 2,
      seed: 'test',
      startPosition: 'random',
      endPosition: 'random',
    });
    expect(maze.grid.length).toBe(5);
    expect(maze.grid[0].length).toBe(8);
    expect(maze.start).not.toBeNull();
    expect(maze.end).not.toBeNull();
    if (maze.start && maze.end) {
      expect(maze.start.y).toBe(0); // innermost ring
      expect(maze.end.y).toBe(4); // outermost ring
    }
  });
  it('is reproducible with the same seed', () => {
    const maze1 = generateRoundMaze({
      width: 8,
      height: 5,
      complexity: 50,
      wallThickness: 2,
      seed: 'repeat',
      startPosition: 'random',
      endPosition: 'random',
    });
    const maze2 = generateRoundMaze({
      width: 8,
      height: 5,
      complexity: 50,
      wallThickness: 2,
      seed: 'repeat',
      startPosition: 'random',
      endPosition: 'random',
    });
    expect(maze1.walls).toEqual(maze2.walls);
    expect(maze1.solution).toEqual(maze2.solution);
  });
}); 