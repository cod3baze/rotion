import { Outlet } from 'react-router-dom'

import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'

export function Default(): JSX.Element {
  return (
    <div className="h-screen w-screen text-rotion-100 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col max-h-screen">
        <Header />

        {/* Onde vai ser inserido o conteúdo de cada pagina */}
        <Outlet />
      </div>
    </div>
  )
}
