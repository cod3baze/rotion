import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'

import { IPC } from '@shared/constants/ipc'
import {
  FetchAllDocumentsResponse,
  FetchDocumentRequest,
  FetchDocumentResponse,
  CreateDocumentResponse,
  SaveDocumentRequest,
  DeleteDocumentRequest
} from '@shared/types/ipc'

declare global {
  export interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

// Custom APIs for renderer
const api = {
  fetchDocuments(): Promise<FetchAllDocumentsResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH_ALL)
  },

  fetchDocument(request: FetchDocumentRequest): Promise<FetchDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH, request)
  },

  createDocument(): Promise<CreateDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.CREATE)
  },

  saveDocument(request: SaveDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.SAVE, request)
  },

  deleteDocument(request: DeleteDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.DELETE, request)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

/**
 * contextBridge.exposeInMainWorld: expoe algum método para dentro do processo do *Render*
 *
 * no Render: window.api.fetchDocuments(''): acessa a função exposta
 */
