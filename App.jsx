import ControlsPanel from './components/ControlsPanel'
import MazePreview from './components/MazePreview'

function App() {
  return (
    <div className="font-sans bg-gray-100 min-h-screen min-w-full h-screen w-screen">
      <main className="flex flex-row items-stretch h-screen w-screen box-border gap-8 p-8">
        <section className="w-[350px] min-w-[350px] max-w-[350px] h-full flex flex-col justify-start bg-none border-none shadow-none p-0">
          <ControlsPanel />
        </section>
        <section className="flex-1 min-w-0 h-full flex flex-col items-center justify-start bg-none border-none shadow-none p-0">
          <MazePreview />
        </section>
      </main>
    </div>
  )
}

export default App
