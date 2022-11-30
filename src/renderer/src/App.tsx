import './styles/global.css'

import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'

function App(): JSX.Element {
  return (
    <div className="h-screen w-screen bg-rotion-900 text-rotion-900 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col max-h-screen">
        <Header />

        <main className="flex-1 flex items-center justify-center text-rotion-400">
          Selecione ou crie um documento
        </main>
      </div>
    </div>
  )
}

export default App
