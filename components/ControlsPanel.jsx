import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
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

function ControlsPanel() {
  const [mazeType, setMazeType] = useState('square');
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(600);
  const [complexity, setComplexity] = useState(50);

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
        <div className="flex flex-col gap-2">
          <Label htmlFor="complexity">Complexity: {complexity}</Label>
          <Slider
            id="complexity"
            min={1}
            max={100}
            value={[complexity]}
            onValueChange={([val]) => setComplexity(val)}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default ControlsPanel; 