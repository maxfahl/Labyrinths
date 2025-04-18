// @ts-ignore
import seedrandom from 'seedrandom';
import { MazeData, MazeOptions, MazeWall } from './generateSquareMaze';

export function generateRoundMazeWithPrims(options: MazeOptions): MazeData {
  const { width, height, seed, startPosition, endPosition } = options;
  const rng = seedrandom(seed.toString());
  type PolarCell = { visited?: boolean; walls: { in: boolean; out: boolean; left: boolean; right: boolean } };
  const grid: PolarCell[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      visited: false,
      walls: { in: true, out: true, left: true, right: true },
    }))
  );
  function getRoundPosition(pos: string, width: number, height: number, isStart: boolean) {
    if (pos === 'center') return { ring: 0, sector: Math.floor(width / 2) };
    if (pos === 'outer') return { ring: height - 1, sector: Math.floor(width / 2) };
    if (pos === 'randomRing') return { ring: Math.floor(rng() * height), sector: Math.floor(rng() * width) };
    if (pos === 'customSector') return { ring: isStart ? 0 : height - 1, sector: 0 };
    return { ring: isStart ? 0 : height - 1, sector: Math.floor(rng() * width) };
  }
  let start = getRoundPosition(startPosition, width, height, true);
  let end = getRoundPosition(endPosition, width, height, false);
  if (startPosition === 'outer' && endPosition === 'outer' && start.ring === end.ring && start.sector === end.sector) {
    end = { ring: end.ring, sector: (start.sector + Math.floor(width / 2)) % width };
  }
  const frontier: { ring: number; sector: number; from?: { ring: number; sector: number }; dirFrom?: 'in' | 'out' | 'left' | 'right' }[] = [];
  grid[start.ring][start.sector].visited = true;
  function addFrontier(ring: number, sector: number) {
    const neighbors = [
      { dr: 1, ds: 0, dir: 'out', opp: 'in' },
      { dr: -1, ds: 0, dir: 'in', opp: 'out' },
      { dr: 0, ds: -1, dir: 'left', opp: 'right' },
      { dr: 0, ds: 1, dir: 'right', opp: 'left' },
    ];
    for (const n of neighbors) {
      const nr = ring + n.dr;
      const ns = (sector + n.ds + width) % width;
      if (nr >= 0 && nr < height && !grid[nr][ns].visited) {
        frontier.push({ ring: nr, sector: ns, from: { ring, sector }, dirFrom: n.opp as 'in' | 'out' | 'left' | 'right' });
      }
    }
  }
  addFrontier(start.ring, start.sector);
  while (frontier.length > 0) {
    const idx = Math.floor(rng() * frontier.length);
    const cell = frontier.splice(idx, 1)[0];
    const { ring, sector, from, dirFrom } = cell;
    if (grid[ring][sector].visited) continue;
    if (from && dirFrom) {
      grid[ring][sector].walls[dirFrom] = false;
      const opp: 'in' | 'out' | 'left' | 'right' =
        dirFrom === 'in' ? 'out' :
        dirFrom === 'out' ? 'in' :
        dirFrom === 'left' ? 'right' : 'left';
      grid[from.ring][from.sector].walls[opp] = false;
    }
    grid[ring][sector].visited = true;
    addFrontier(ring, sector);
  }
  grid[start.ring][start.sector].walls.in = false;
  grid[end.ring][end.sector].walls.out = false;
  const walls: MazeWall[] = [];
  for (let r = 0; r < height; r++) {
    for (let s = 0; s < width; s++) {
      const cell = grid[r][s];
      if (cell.walls.in) walls.push({ x: s, y: r, dir: 'in' });
      if (cell.walls.left) walls.push({ x: s, y: r, dir: 'left' });
      if (r === height - 1 && cell.walls.out) walls.push({ x: s, y: r, dir: 'out' });
      if (s === width - 1 && cell.walls.right) walls.push({ x: s, y: r, dir: 'right' });
    }
  }
  const parent: (null | { ring: number; sector: number })[][] = Array.from({ length: height }, () => Array(width).fill(null));
  const queue: { ring: number; sector: number }[] = [end];
  const visited: boolean[][] = Array.from({ length: height }, () => Array(width).fill(false));
  visited[end.ring][end.sector] = true;
  while (queue.length > 0) {
    const cur = queue.shift()!;
    if (cur.ring === start.ring && cur.sector === start.sector) break;
    const dirs = [
      { dr: 1, ds: 0, dir: 'out', opp: 'in' },
      { dr: -1, ds: 0, dir: 'in', opp: 'out' },
      { dr: 0, ds: -1, dir: 'left', opp: 'right' },
      { dr: 0, ds: 1, dir: 'right', opp: 'left' },
    ];
    for (const d of dirs) {
      const nr = cur.ring + d.dr;
      const ns = (cur.sector + d.ds + width) % width;
      const dir: 'in' | 'out' | 'left' | 'right' = d.dir;
      if (nr >= 0 && nr < height && !visited[nr][ns] && !grid[cur.ring][cur.sector].walls[dir]) {
        parent[nr][ns] = { ring: cur.ring, sector: cur.sector };
        visited[nr][ns] = true;
        queue.push({ ring: nr, sector: ns });
      }
    }
  }
  let solution: { ring: number; sector: number }[] = [];
  let cur: { ring: number; sector: number } | null = start;
  while (cur && (cur.ring !== end.ring || cur.sector !== end.sector)) {
    solution.push(cur);
    cur = parent[cur.ring][cur.sector];
  }
  if (cur) solution.push(cur);
  solution = solution.reverse();
  for (let row of grid) for (let cell of row) delete cell.visited;
  return {
    grid: grid as any,
    walls: walls.map(w => ({ x: w.x, y: w.y, dir: w.dir })),
    start: { x: start.sector, y: start.ring },
    end: { x: end.sector, y: end.ring },
    solution: solution.map(p => ({ x: p.sector, y: p.ring })),
  };
}

export function generateRoundMaze(options: MazeOptions): MazeData {
  return generateRoundMazeWithPrims(options);
} 