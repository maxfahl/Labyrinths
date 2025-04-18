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
import { MazeOptions } from "../App";

interface ControlsPanelProps {
  options: MazeOptions;
  setOptions: (opts: MazeOptions) => void;
}

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

function ControlsPanel({ options, setOptions }: ControlsPanelProps) {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Controls</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-6 overflow-auto max-h-[80vh] scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="maze-type">Type</Label>
          <Select value={options.mazeType} onValueChange={mazeType => setOptions({ ...options, mazeType })}>
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
              min={5}
              max={100}
              value={options.width}
              onChange={e => setOptions({ ...options, width: Number(e.target.value) })}
              className="w-20"
              aria-label="Width"
            />
            <span>x</span>
            <Input
              type="number"
              min={5}
              max={100}
              value={options.height}
              onChange={e => setOptions({ ...options, height: Number(e.target.value) })}
              className="w-20"
              aria-label="Height"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2" role="group" aria-labelledby="complexity-label">
          <Label id="complexity-label" htmlFor="complexity">Complexity: {options.complexity}</Label>
          <Slider
            id="complexity"
            min={1}
            max={100}
            value={[options.complexity]}
            onValueChange={([val]) => setOptions({ ...options, complexity: val })}
            thumbProps={{ 'aria-label': 'Complexity' }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="line-color">Line Color</Label>
          <Input
            id="line-color"
            type="color"
            value={options.lineColor}
            onChange={e => setOptions({ ...options, lineColor: e.target.value })}
            aria-label="Line Color"
            className="w-12 h-12 p-0 border-none bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="bg-color">Background Color</Label>
          <Input
            id="bg-color"
            type="color"
            value={options.bgColor}
            onChange={e => setOptions({ ...options, bgColor: e.target.value })}
            aria-label="Background Color"
            className="w-12 h-12 p-0 border-none bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-2" role="group" aria-labelledby="wall-thickness-label">
          <Label id="wall-thickness-label" htmlFor="wall-thickness">Wall Thickness: {options.wallThickness}px</Label>
          <Slider
            id="wall-thickness"
            min={1}
            max={20}
            value={[options.wallThickness]}
            onValueChange={([val]) => setOptions({ ...options, wallThickness: val })}
            thumbProps={{ 'aria-label': 'Wall Thickness' }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="seed">Seed</Label>
          <Input
            id="seed"
            type="text"
            value={options.seed}
            onChange={e => setOptions({ ...options, seed: e.target.value })}
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
              value={options.startPosition}
              onChange={e => setOptions({ ...options, startPosition: e.target.value })}
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
              value={options.endPosition}
              onChange={e => setOptions({ ...options, endPosition: e.target.value })}
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
            value={options.mazeTheme}
            onChange={e => setOptions({ ...options, mazeTheme: e.target.value })}
            className="border rounded px-2 py-1"
          >
            {MAZE_THEMES.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        {/* Solution Path Toggle */}
        <div className="flex items-center gap-2">
          <input
            id="show-solution"
            type="checkbox"
            checked={options.showSolution}
            onChange={e => setOptions({ ...options, showSolution: e.target.checked })}
            aria-label="Show Solution"
            className="accent-primary w-5 h-5"
          />
          <Label htmlFor="show-solution">Show Solution</Label>
        </div>
        {/* Grid Overlay Toggle */}
        <div className="flex items-center gap-2">
          <input
            id="show-grid"
            type="checkbox"
            checked={options.showGrid}
            onChange={e => setOptions({ ...options, showGrid: e.target.checked })}
            aria-label="Show Grid"
            className="accent-primary w-5 h-5"
          />
          <Label htmlFor="show-grid">Show Grid</Label>
        </div>
        {/* Animated Generation Toggle */}
        <div className="flex items-center gap-2">
          <input
            id="animate-generation"
            type="checkbox"
            checked={options.animateGeneration}
            onChange={e => setOptions({ ...options, animateGeneration: e.target.checked })}
            aria-label="Animate Generation"
            className="accent-primary w-5 h-5"
          />
          <Label htmlFor="animate-generation">Animate Generation</Label>
        </div>
        {/* Accessibility: High Contrast Toggle */}
        <div className="flex items-center gap-2">
          <input
            id="high-contrast"
            type="checkbox"
            checked={options.highContrast}
            onChange={e => setOptions({ ...options, highContrast: e.target.checked })}
            aria-label="High Contrast"
            className="accent-primary w-5 h-5"
          />
          <Label htmlFor="high-contrast">High Contrast</Label>
        </div>
        {/* Accessibility: Font Size Input */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="font-size">Font Size</Label>
          <Input
            id="font-size"
            type="number"
            min={10}
            max={48}
            value={options.fontSize}
            onChange={e => setOptions({ ...options, fontSize: Number(e.target.value) })}
            aria-label="Font Size"
            className="w-24"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default ControlsPanel; 