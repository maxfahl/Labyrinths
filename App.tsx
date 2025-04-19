import { useState } from 'react';
import ControlsPanel from './components/ControlsPanel';
import MazePreview from './components/MazePreview';

export interface MazeOptions {
  width: number;
  height: number;
  complexity: number;
  lineColor: string;
  bgColor: string;
  wallThickness: number;
  seed: string;
  startPosition: string;
  endPosition: string;
  mazeTheme: string;
  showSolution: boolean;
  showGrid: boolean;
  animateGeneration: boolean;
  highContrast: boolean;
  fontSize: number;
  svgPadding: number;
}

export const defaultOptions: MazeOptions = {
  width: 20,
  height: 20,
  complexity: 50,
  lineColor: '#000000',
  bgColor: '#ffffff',
  wallThickness: 4,
  seed: '',
  startPosition: 'top-left',
  endPosition: 'bottom-right',
  mazeTheme: 'custom',
  showSolution: false,
  showGrid: false,
  animateGeneration: false,
  highContrast: false,
  fontSize: 16,
  svgPadding: 20,
};

function App() {
  const [mazeOptions, setMazeOptions] = useState<MazeOptions>(defaultOptions);
  return (
    <div className="font-sans bg-gray-100 min-h-screen min-w-full h-screen w-screen">
      <main className="flex flex-row items-stretch h-screen w-screen box-border gap-8 p-8">
        <section className="w-[350px] min-w-[350px] max-w-[350px] h-full flex flex-col justify-start bg-none border-none shadow-none p-0">
          <ControlsPanel options={mazeOptions} setOptions={setMazeOptions} />
        </section>
        <section className="flex-1 min-w-0 h-full flex flex-col items-center justify-start bg-none border-none shadow-none p-0">
          <MazePreview options={mazeOptions} />
        </section>
      </main>
    </div>
  )
}

export default App
