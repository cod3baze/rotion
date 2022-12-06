import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import * as Collapsible from '@radix-ui/react-collapsible'

import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'

export function Default(): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  return (
    <Collapsible.Root
      defaultOpen
      onOpenChange={setIsSidebarOpen}
      className="h-screen w-screen text-rotion-100 flex"
    >
      <Sidebar />

      <div className="flex-1 flex flex-col max-h-screen">
        <Header isSidebarOpen={isSidebarOpen} />

        {/* Onde vai ser inserido o conteúdo de cada pagina */}
        <Outlet />
      </div>
    </Collapsible.Root>
  )
}
