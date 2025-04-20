import { useRef, useState } from 'react';
import ControlsPanel from './components/ControlsPanel';
import ExportButtons from './components/ExportButtons';
import MazeHistoryList from './components/MazeHistoryList';
import MazePreview from './components/MazePreview';
import SaveMazeButton from './components/SaveMazeButton';
import SkipLink from './components/SkipLink';
import { deleteMaze, generateMazeId, loadMazeHistory, SavedMaze, saveMaze } from './lib/history';

export interface MazeOptions {
  width: number;
  height: number;
  lineColor: string;
  bgColor: string;
  wallThickness: number;
  seed: string;
  startPosition: string;
  endPosition: string;
  mazeTheme: string;
  showSolution: boolean;
  svgPadding: number;
}

export const defaultOptions: MazeOptions = {
  width: 20,
  height: 20,
  lineColor: '#000000',
  bgColor: '#ffffff',
  wallThickness: 4,
  seed: '',
  startPosition: 'top-left',
  endPosition: 'bottom-right',
  mazeTheme: 'custom',
  showSolution: false,
  svgPadding: 20,
};

function App() {
  const [mazeOptions, setMazeOptions] = useState<MazeOptions>(defaultOptions);
  const [history, setHistory] = useState<SavedMaze[]>(() => loadMazeHistory());
  const svgRef = useRef<SVGSVGElement>(null!);

  return (
    <div className="font-sans bg-gray-100 min-h-screen min-w-full h-screen w-screen">
      {/* Accessibility skip‑link */}
      <SkipLink />
      <main id="main-content" className="flex flex-row items-stretch h-screen w-screen box-border gap-8 p-8">
        <section className="w-[350px] min-w-[350px] max-w-[350px] h-full flex flex-col justify-start bg-none border-none shadow-none p-0">
          <ControlsPanel options={mazeOptions} setOptions={setMazeOptions} />
        </section>
        <section className="flex-1 min-w-0 h-full flex flex-col items-center justify-start bg-none border-none shadow-none p-0">
          <MazePreview ref={svgRef} options={mazeOptions} />
          <div className="flex gap-2 mt-4">
            <ExportButtons svgRef={svgRef} />
            <SaveMazeButton
              svgRef={svgRef}
              options={mazeOptions}
              onSave={(name, options, preview) => {
                const item: SavedMaze = {
                  id: generateMazeId(),
                  name,
                  options,
                  preview,
                  timestamp: Date.now(),
                };
                const updated = saveMaze(item);
                setHistory(updated);
              }}
            />
          </div>
          <MazeHistoryList
            history={history}
            onRestore={(item) => {
              setMazeOptions(item.options);
            }}
            onDelete={(id) => {
              const updated = deleteMaze(id);
              setHistory(updated);
            }}
          />
        </section>
      </main>
    </div>
  )
}

export default App
