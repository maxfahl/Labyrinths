import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { SavedMaze } from "../lib/history";

interface MazeHistoryListProps {
  history: SavedMaze[];
  onRestore: (item: SavedMaze) => void;
  onDelete?: (id: string) => void;
}

const MazeHistoryList: React.FC<MazeHistoryListProps> = ({ history, onRestore, onDelete }) => {
  if (history.length === 0) return null;

  return (
    <Card className="w-full mt-4 overflow-y-auto flex flex-col max-h-[40vh]">
      <CardHeader>
        <CardTitle>History</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {history.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <img
              src={item.preview}
              alt={item.name}
              className="w-16 h-16 object-contain border rounded"
            />
            <div className="flex-1">
              <p className="text-sm font-medium leading-tight break-words max-w-[120px]">
                {item.name}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </div>
            <Button size="sm" variant="outline" onClick={() => onRestore(item)}>
              Restore
            </Button>
            {onDelete && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(item.id)}
                aria-label="Delete Maze"
              >
                🗑️
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MazeHistoryList; 