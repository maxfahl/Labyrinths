import seedrandom from 'seedrandom';

export interface MazeOptions {
  width: number;
  height: number;
  complexity: number;
  wallThickness: number;
  seed: string | number;
  startPosition: string;
  endPosition: string;
}

export interface MazeCell {
  visited: boolean;
  walls: { N: boolean; S: boolean; E: boolean; W: boolean };
}

export interface MazeWall {
  x: number;
  y: number;
  dir: string;
}

export interface MazePosition {
  x: number;
  y: number;
}

export interface MazeData {
  grid: MazeCell[][];
  walls: MazeWall[];
  start: MazePosition | null;
  end: MazePosition | null;
  solution: MazePosition[];
}

const DIRS = [
  { dx: 0, dy: -1, dir: 'N', opp: 'S' },
  { dx: 1, dy: 0, dir: 'E', opp: 'W' },
  { dx: 0, dy: 1, dir: 'S', opp: 'N' },
  { dx: -1, dy: 0, dir: 'W', opp: 'E' },
];

export function generateSquareMaze(options: MazeOptions): MazeData {
  const { width, height, seed, startPosition, endPosition } = options;
  const rng = seedrandom(seed.toString());
  // Initialize grid
  const grid: MazeCell[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      visited: false,
      walls: { N: true, S: true, E: true, W: true },
    }))
  );
  const start = getPosition(startPosition, width, height);
  const end = getPosition(endPosition, width, height);
  // DFS stack
  const stack: MazePosition[] = [start];
  grid[start.y][start.x].visited = true;
  // For solution path
  const parent: (MazePosition | null)[][] = Array.from({ length: height }, () => Array(width).fill(null));
  // Maze generation
  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const { x, y } = current;
    // Find unvisited neighbors
    const neighbors = DIRS
      .map(({ dx, dy, dir, opp }) => {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < width && ny >= 0 && ny < height && !grid[ny][nx].visited) {
          return { nx, ny, dir, opp };
        }
        return null;
      })
      .filter(Boolean) as { nx: number; ny: number; dir: string; opp: string }[];
    if (neighbors.length > 0) {
      // Pick a random neighbor
      const next = neighbors[Math.floor(rng() * neighbors.length)];
      // Remove wall between current and next
      grid[y][x].walls[next.dir as keyof MazeCell['walls']] = false;
      grid[next.ny][next.nx].walls[next.opp as keyof MazeCell['walls']] = false;
      // Mark as visited
      grid[next.ny][next.nx].visited = true;
      parent[next.ny][next.nx] = { x, y };
      stack.push({ x: next.nx, y: next.ny });
    } else {
      stack.pop();
    }
  }
  // Collect walls for rendering
  const walls: MazeWall[] = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = grid[y][x];
      for (const dir of ['N', 'E', 'S', 'W'] as const) {
        if (cell.walls[dir]) {
          walls.push({ x, y, dir });
        }
      }
    }
  }
  // Find solution path from end to start
  let solution: MazePosition[] = [];
  let cur: MazePosition | null = end;
  while (cur && (cur.x !== start.x || cur.y !== start.y)) {
    solution.push(cur);
    cur = parent[cur.y][cur.x];
  }
  if (cur) solution.push(cur);
  solution = solution.reverse();
  // Remove visited flags for output
  for (let row of grid) for (let cell of row) delete cell.visited;
  return { grid, walls, start, end, solution };
}

function getPosition(pos: string, width: number, height: number): MazePosition {
  switch (pos) {
    case 'top-left': return { x: 0, y: 0 };
    case 'top-right': return { x: width - 1, y: 0 };
    case 'bottom-left': return { x: 0, y: height - 1 };
    case 'bottom-right': return { x: width - 1, y: height - 1 };
    default: return { x: 0, y: 0 };
  }
} 