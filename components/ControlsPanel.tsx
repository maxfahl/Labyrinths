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
    <Card className="w-full h-full flex flex-col bg-white text-gray-900 border shadow rounded-2xl">
      <CardHeader>
        <CardTitle>{'Controls'}</CardTitle>
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
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-4 items-center">
            <div className="flex flex-col items-center gap-1">
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
            <div className="flex flex-col items-center gap-1">
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
          </div>
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
        <div className="flex flex-col gap-2" role="group" aria-labelledby="seed-label">
          <Label id="seed-label" htmlFor="seed" className="">Seed: {options.seed}</Label>
          <Slider
            id="seed"
            min={0}
            max={99999}
            value={[Number(options.seed)]}
            onValueChange={([val]: [number]) => setOptions({ ...options, seed: String(val) })}
            thumbProps={{ 'aria-label': 'Seed' }}
            className=""
            defaultValue={undefined}
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
        {/* Grid/Animation/Contrast toggles removed */}
      </CardContent>
    </Card>
  );
}

export default ControlsPanel; 