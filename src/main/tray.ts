import path from 'node:path'
import { Menu, Tray, app, nativeImage } from 'electron'

app.whenReady().then(() => {
  const icon = nativeImage.createFromPath(path.resolve(__dirname, 'rotionTemplate.png'))
  const tray = new Tray(icon)

  const menu = Menu.buildFromTemplate([
    {
      label: 'Rotion',
      enabled: false
    },
    {
      type: 'separator'
    },
    {
      label: 'Ativar modo dark',
      type: 'checkbox'
    }
  ])

  tray.setContextMenu(menu)
})

/**
 * imagem deve ser Preta, fundo transparente e o nome deve terminar com `Template`
 */
