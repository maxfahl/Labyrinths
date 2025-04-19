/*
 * Utility functions for saving and loading maze history from localStorage.
 * The history is stored under the key "mazeHistory" as a JSON array.
 */
import { MazeOptions } from "../App";

export interface SavedMaze {
  id: string; // unique id
  name: string;
  options: MazeOptions;
  preview: string; // data URL (PNG)
  timestamp: number;
}

const STORAGE_KEY = "mazeHistory";

function readFromStorage(): SavedMaze[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedMaze[];
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

function writeToStorage(data: SavedMaze[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore quota / serialisation errors
  }
}

export function loadMazeHistory(): SavedMaze[] {
  return readFromStorage();
}

export function saveMaze(item: SavedMaze): SavedMaze[] {
  const list = readFromStorage();
  const existingIndex = list.findIndex((m) => m.id === item.id);
  if (existingIndex >= 0) list[existingIndex] = item;
  else list.unshift(item); // newest first
  writeToStorage(list);
  return list;
}

export function deleteMaze(id: string): SavedMaze[] {
  const list = readFromStorage().filter((m) => m.id !== id);
  writeToStorage(list);
  return list;
}

export function clearMazeHistory(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

// Helper to generate a simple unique id (timestamp + random)
export function generateMazeId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
} 