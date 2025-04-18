import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import
  {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
  } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from 'react';

const MAZE_TYPES = [
  { value: 'square', label: 'Square' },
  { value: 'round', label: 'Round' },
  { value: 'squiggly', label: 'Squiggly' },
  { value: 'spaghetti', label: 'Spaghetti' },
];

const START_END_POSITIONS = [
  { value: 'top-left', label: 'Top Left' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'bottom-right', label: 'Bottom Right' },
  { value: 'random', label: 'Random' },
  { value: 'custom', label: 'Custom' },
];

const MAZE_THEMES = [
  { value: 'custom', label: 'Custom' },
  { value: 'print', label: 'Print (B&W)' },
  { value: 'forest', label: 'Forest' },
  { value: 'ocean', label: 'Ocean' },
  { value: 'desert', label: 'Desert' },
];

function ControlsPanel() {
  const [mazeType, setMazeType] = useState('square');
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(600);
  const [complexity, setComplexity] = useState(50);
  const [lineColor, setLineColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [wallThickness, setWallThickness] = useState(4);
  const [seed, setSeed] = useState('');
  const [startPosition, setStartPosition] = useState('top-left');
  const [endPosition, setEndPosition] = useState('bottom-right');
  const [mazeTheme, setMazeTheme] = useState('custom');

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Controls</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="maze-type">Type</Label>
          <Select value={mazeType} onValueChange={setMazeType}>
            <SelectTrigger id="maze-type" className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {MAZE_TYPES.map(type => (
                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Size (px)</Label>
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              min={100}
              max={2000}
              value={width}
              onChange={e => setWidth(Number(e.target.value))}
              className="w-20"
              aria-label="Width"
            />
            <span>x</span>
            <Input
              type="number"
              min={100}
              max={2000}
              value={height}
              onChange={e => setHeight(Number(e.target.value))}
              className="w-20"
              aria-label="Height"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2" role="group" aria-labelledby="complexity-label">
          <Label id="complexity-label" htmlFor="complexity">Complexity: {complexity}</Label>
          <Slider
            id="complexity"
            min={1}
            max={100}
            value={[complexity]}
            onValueChange={([val]) => setComplexity(val)}
            thumbProps={{ 'aria-label': 'Complexity' }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="line-color">Line Color</Label>
          <Input
            id="line-color"
            type="color"
            value={lineColor}
            onChange={e => setLineColor(e.target.value)}
            aria-label="Line Color"
            className="w-12 h-12 p-0 border-none bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="bg-color">Background Color</Label>
          <Input
            id="bg-color"
            type="color"
            value={bgColor}
            onChange={e => setBgColor(e.target.value)}
            aria-label="Background Color"
            className="w-12 h-12 p-0 border-none bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-2" role="group" aria-labelledby="wall-thickness-label">
          <Label id="wall-thickness-label" htmlFor="wall-thickness">Wall Thickness: {wallThickness}px</Label>
          <Slider
            id="wall-thickness"
            min={1}
            max={20}
            value={[wallThickness]}
            onValueChange={([val]) => setWallThickness(val)}
            thumbProps={{ 'aria-label': 'Wall Thickness' }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="seed">Seed</Label>
          <Input
            id="seed"
            type="text"
            value={seed}
            onChange={e => setSeed(e.target.value)}
            aria-label="Seed"
            placeholder="Enter seed (optional)"
            className="w-full"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col gap-2 flex-1">
            <Label htmlFor="start-position">Start Position</Label>
            <select
              id="start-position"
              aria-label="Start Position"
              value={startPosition}
              onChange={e => setStartPosition(e.target.value)}
              className="border rounded px-2 py-1"
            >
              {START_END_POSITIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <Label htmlFor="end-position">End Position</Label>
            <select
              id="end-position"
              aria-label="End Position"
              value={endPosition}
              onChange={e => setEndPosition(e.target.value)}
              className="border rounded px-2 py-1"
            >
              {START_END_POSITIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="maze-theme">Maze Theme</Label>
          <select
            id="maze-theme"
            aria-label="Maze Theme"
            value={mazeTheme}
            onChange={e => setMazeTheme(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {MAZE_THEMES.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </CardContent>
    </Card>
  );
}

export default ControlsPanel; 