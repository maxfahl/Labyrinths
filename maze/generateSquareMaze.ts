// @ts-ignore
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
  visited?: boolean;
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
  // Pick start and end positions
  let start = getPosition(startPosition, width, height, rng);
  let end = getPosition(endPosition, width, height, rng, { avoid: start });
  // If start and end are still the same, pick a different end
  if (start.x === end.x && start.y === end.y) {
    if (endPosition === 'top') end = getPosition('bottom', width, height, rng, { avoid: start });
    else if (endPosition === 'bottom') end = getPosition('top', width, height, rng, { avoid: start });
    else if (endPosition === 'left') end = getPosition('right', width, height, rng, { avoid: start });
    else if (endPosition === 'right') end = getPosition('left', width, height, rng, { avoid: start });
    else end = { x: (start.x + 1) % width, y: start.y };
  }
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
  // Remove wall at start position for entrance
  if (start.x === 0) grid[start.y][start.x].walls.W = false;
  if (start.x === width - 1) grid[start.y][start.x].walls.E = false;
  if (start.y === 0) grid[start.y][start.x].walls.N = false;
  if (start.y === height - 1) grid[start.y][start.x].walls.S = false;
  // Remove wall at end position for exit
  if (end.x === 0) grid[end.y][end.x].walls.W = false;
  if (end.x === width - 1) grid[end.y][end.x].walls.E = false;
  if (end.y === 0) grid[end.y][end.x].walls.N = false;
  if (end.y === height - 1) grid[end.y][end.x].walls.S = false;
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
  
  // --- COMPLEXITY LOGIC (DEAD‑END BRAIDING) ---
  // Reduce dead ends by connecting some of them to neighboring cells.
  // complexity: 100 = keep all dead ends (perfect maze)
  // complexity: 1   = braid almost every dead end (few dead ends)
  if (options.complexity < 100) {
    // Gather dead‑end cells (cells with 3 walls intact)
    const deadEnds: { x: number; y: number }[] = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const cell = grid[y][x];
        const wallCount = (cell.walls.N ? 1 : 0) + (cell.walls.E ? 1 : 0) + (cell.walls.S ? 1 : 0) + (cell.walls.W ? 1 : 0);
        if (wallCount === 3) deadEnds.push({ x, y });
      }
    }
    // Determine how many dead ends to braid
    const targetRemove = Math.floor(deadEnds.length * (1 - options.complexity / 100));
    // Shuffle deadEnds for randomness
    for (let i = deadEnds.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [deadEnds[i], deadEnds[j]] = [deadEnds[j], deadEnds[i]];
    }
    let removed = 0;
    for (const { x, y } of deadEnds) {
      if (removed >= targetRemove) break;
      const cell = grid[y][x];
      // Pick a random present wall to remove that has a neighbor cell inside bounds
      const dirs = [
        { dir: 'N' as const, dx: 0, dy: -1, opp: 'S' as const },
        { dir: 'E' as const, dx: 1, dy: 0, opp: 'W' as const },
        { dir: 'S' as const, dx: 0, dy: 1, opp: 'N' as const },
        { dir: 'W' as const, dx: -1, dy: 0, opp: 'E' as const },
      ].filter(d => cell.walls[d.dir]);
      // Shuffle dirs
      for (let i = dirs.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [dirs[i], dirs[j]] = [dirs[j], dirs[i]];
      }
      for (const d of dirs) {
        const nx = x + d.dx;
        const ny = y + d.dy;
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          // Remove wall between cell and neighbor
          cell.walls[d.dir] = false;
          grid[ny][nx].walls[d.opp] = false;
          removed++;
          break;
        }
      }
    }
  }

  // Collect walls for rendering AFTER complexity adjustments
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

  return { grid, walls, start, end, solution };
}

function getPosition(pos: string, width: number, height: number, rng: () => number, other?: { avoid?: { x: number, y: number } }): MazePosition {
  if (pos === 'random') {
    // Pick a random edge cell
    const edges = [];
    for (let i = 0; i < width; i++) {
      edges.push({ x: i, y: 0 }); // top
      edges.push({ x: i, y: height - 1 }); // bottom
    }
    for (let j = 1; j < height - 1; j++) {
      edges.push({ x: 0, y: j }); // left
      edges.push({ x: width - 1, y: j }); // right
    }
    // Remove avoid cell if present
    let candidates = edges;
    if (other?.avoid) {
      candidates = edges.filter(e => e.x !== other.avoid!.x || e.y !== other.avoid!.y);
    }
    const idx = Math.floor(rng() * candidates.length);
    return candidates[idx];
  }
  if (pos === 'top-left') return { x: 0, y: 0 };
  if (pos === 'top-right') return { x: width - 1, y: 0 };
  if (pos === 'bottom-left') return { x: 0, y: height - 1 };
  if (pos === 'bottom-right') return { x: width - 1, y: height - 1 };
  if (pos === 'top') {
    let x = Math.floor(rng() * width);
    let y = 0;
    if (other?.avoid && x === other.avoid.x && y === other.avoid.y) x = (x + 1) % width;
    return { x, y };
  }
  if (pos === 'bottom') {
    let x = Math.floor(rng() * width);
    let y = height - 1;
    if (other?.avoid && x === other.avoid.x && y === other.avoid.y) x = (x + 1) % width;
    return { x, y };
  }
  if (pos === 'left') {
    let x = 0;
    let y = Math.floor(rng() * height);
    if (other?.avoid && x === other.avoid.x && y === other.avoid.y) y = (y + 1) % height;
    return { x, y };
  }
  if (pos === 'right') {
    let x = width - 1;
    let y = Math.floor(rng() * height);
    if (other?.avoid && x === other.avoid.x && y === other.avoid.y) y = (y + 1) % height;
    return { x, y };
  }
  // fallback
  return { x: 0, y: 0 };
} 