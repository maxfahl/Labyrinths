import { Button } from "@/components/ui/button";
import React from "react";
import { MazeOptions } from "../App";

interface SaveMazeButtonProps {
  svgRef: React.RefObject<SVGSVGElement>;
  options: MazeOptions;
  onSave: (name: string, options: MazeOptions, preview: string) => void;
}

/**
 * SaveMazeButton renders a button that, when clicked, captures the current
 * maze preview as a PNG, asks the user for a name, and forwards the data to
 * the provided onSave callback.
 */
const SaveMazeButton: React.FC<SaveMazeButtonProps> = ({ svgRef, options, onSave }) => {
  const handleSave = async () => {
    const name = window.prompt("Enter a name for this maze:", new Date().toLocaleString())?.trim();
    if (!name) return;

    let preview = "";
    if (svgRef.current) {
      try {
        const { toPng } = await import("html-to-image");
        preview = await toPng(svgRef.current, {
          cacheBust: true,
          backgroundColor: "white",
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Failed to generate preview image", err);
      }
    }

    onSave(name, options, preview);
  };

  return (
    <Button variant="outline" onClick={handleSave} aria-label="Save Maze">
      Save Maze
    </Button>
  );
};

export default SaveMazeButton; 