import { ipcMain } from 'electron'

ipcMain.on('fetch-documents', async (_, args) => {
  console.log(args)
})

/**
 * ipcMain: permite ouvir eventos.
 *  - eventos baseado em nomeclatura
 */
