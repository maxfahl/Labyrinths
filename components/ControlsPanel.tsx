import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { MazeOptions } from "../App";

interface ControlsPanelProps {
  options: MazeOptions;
  setOptions: (opts: MazeOptions) => void;
}

const START_END_POSITIONS = [
  { value: 'top-left', label: 'Top Left' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'bottom-right', label: 'Bottom Right' },
  { value: 'top', label: 'Top Edge' },
  { value: 'right', label: 'Right Edge' },
  { value: 'bottom', label: 'Bottom Edge' },
  { value: 'left', label: 'Left Edge' },
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
        <CardTitle style={{ fontSize: options.fontSize }}>{'Controls'}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-6 overflow-auto max-h-[80vh] scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="flex flex-col gap-2">
          <Label className="">Size (px)</Label>
          <div className="flex gap-2 items-center">
            <Label htmlFor="width" className="sr-only">Width</Label>
            <Input
              id="width"
              type="number"
              min={5}
              max={1000}
              value={options.width}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOptions({ ...options, width: Number(e.target.value) })}
              className="w-20"
            />
            <span>x</span>
            <Label htmlFor="height" className="sr-only">Height</Label>
            <Input
              id="height"
              type="number"
              min={5}
              max={1000}
              value={options.height}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOptions({ ...options, height: Number(e.target.value) })}
              className="w-20"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2" role="group" aria-labelledby="complexity-label">
          <Label id="complexity-label" htmlFor="complexity" className="">Complexity: {options.complexity}</Label>
          <Slider
            id="complexity"
            min={1}
            max={100}
            value={[options.complexity]}
            onValueChange={([val]: [number]) => setOptions({ ...options, complexity: val })}
            thumbProps={{ 'aria-label': 'Complexity' }}
            className=""
            defaultValue={undefined}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="line-color" className="">Line Color</Label>
          <Input
            id="line-color"
            type="color"
            value={options.lineColor}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOptions({ ...options, lineColor: e.target.value })}
            aria-label="Line Color"
            className="w-12 h-12 p-0 border-none bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="bg-color" className="">Background Color</Label>
          <Input
            id="bg-color"
            type="color"
            value={options.bgColor}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOptions({ ...options, bgColor: e.target.value })}
            aria-label="Background Color"
            className="w-12 h-12 p-0 border-none bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-2" role="group" aria-labelledby="wall-thickness-label">
          <Label id="wall-thickness-label" htmlFor="wall-thickness" className="">Wall Thickness: {options.wallThickness}px</Label>
          <Slider
            id="wall-thickness"
            min={1}
            max={20}
            value={[options.wallThickness]}
            onValueChange={([val]: [number]) => setOptions({ ...options, wallThickness: val })}
            thumbProps={{ 'aria-label': 'Wall Thickness' }}
            className=""
            defaultValue={undefined}
          />
        </div>
        {/* SVG Padding Control */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="svg-padding" className="">Maze Padding (px)</Label>
          <Input
            id="svg-padding"
            type="number"
            min={0}
            max={200}
            value={options.svgPadding}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOptions({ ...options, svgPadding: Number(e.target.value) })}
            aria-label="Maze Padding"
            className="w-20"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="seed" className="">Seed</Label>
          <Input
            id="seed"
            type="text"
            value={options.seed}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOptions({ ...options, seed: e.target.value })}
            aria-label="Seed"
            placeholder="Enter seed (optional)"
            className="w-full"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col gap-2 flex-1">
            <Label htmlFor="start-position" className="">Start Position</Label>
            <select
              id="start-position"
              aria-label="Start Position"
              value={options.startPosition}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setOptions({ ...options, startPosition: e.target.value })}
              className="border rounded px-2 py-1"
            >
              {START_END_POSITIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <Label htmlFor="end-position" className="">End Position</Label>
            <select
              id="end-position"
              aria-label="End Position"
              value={options.endPosition}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setOptions({ ...options, endPosition: e.target.value })}
              className="border rounded px-2 py-1"
            >
              {START_END_POSITIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="maze-theme" className="">Maze Theme</Label>
          <select
            id="maze-theme"
            aria-label="Maze Theme"
            value={options.mazeTheme}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setOptions({ ...options, mazeTheme: e.target.value })}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOptions({ ...options, showSolution: e.target.checked })}
            aria-label="Show Solution"
            className="accent-primary w-5 h-5"
          />
          <Label htmlFor="show-solution" className="">Show Solution</Label>
        </div>
        {/* Grid Overlay Toggle */}
        <div className="flex items-center gap-2">
          <input
            id="show-grid"
            type="checkbox"
            checked={options.showGrid}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOptions({ ...options, showGrid: e.target.checked })}
            aria-label="Show Grid"
            className="accent-primary w-5 h-5"
          />
          <Label htmlFor="show-grid" className="">Show Grid</Label>
        </div>
        {/* Animated Generation Toggle */}
        <div className="flex items-center gap-2">
          <input
            id="animate-generation"
            type="checkbox"
            checked={options.animateGeneration}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOptions({ ...options, animateGeneration: e.target.checked })}
            aria-label="Animate Generation"
            className="accent-primary w-5 h-5"
          />
          <Label htmlFor="animate-generation" className="">Animate Generation</Label>
        </div>
        {/* Accessibility: High Contrast Toggle */}
        <div className="flex items-center gap-2">
          <input
            id="high-contrast"
            type="checkbox"
            checked={options.highContrast}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOptions({ ...options, highContrast: e.target.checked })}
            aria-label="High Contrast"
            className="accent-primary w-5 h-5"
          />
          <Label htmlFor="high-contrast" className="">High Contrast</Label>
        </div>
        {/* Accessibility: Font Size Input */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="font-size" className="">Font Size</Label>
          <Input
            id="font-size"
            type="number"
            min={10}
            max={48}
            value={options.fontSize}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOptions({ ...options, fontSize: Number(e.target.value) })}
            aria-label="Font Size"
            className="w-24"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default ControlsPanel; 