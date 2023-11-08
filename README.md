# rotion

An Electron application with React and TypeScript

## Editor libs

- `npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-document @tiptap/extension-placeholder @tiptap/extension-typography @tiptap/extension-highlight`

preload: Roda no renderer e tem acesso ao server-side

| `docs`                      | `desc`                                          |
| --------------------------- | ----------------------------------------------- |
| pasta `renderer`            | contém todo código frontend                     |
| pasta `preload`             | faz uma ponte entre o **main** e o **renderer** |
| method `ipcRenderer.invoke` | envia e pode receber um retorno                 |
| method `ipcMain.handle`     | envia dados em async para o **invoke**          |
| method `ipcRenderer.send`   | Somente envia mensagens                         |
|                             |                                                 |

- No arquivo: `electron.vite.config.ts.renderer`

```ts
  // coloca o process.platform disponível no processo renderer

  define: {
    'process.platform': JSON.stringify(process.platform)
  },
```

## Storage

> offline storage

- sqlite: funciona com arquivo local
- rxdb
- electron-store: baseado em **JSON**, possui algumas limitações, lê todos os dados ao mesmo tempo, não tem como fazer a paginação. (usado mais para as preferências do usuário)

`electron-builder --publish always`: sempre que gerar a build gera uma release no github

`git tag v1.0.0`: gera a tag no github
`git push`
`git push --tags`: envia as tags
