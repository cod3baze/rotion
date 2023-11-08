import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { Document as IPCDocument } from '@shared/types/ipc'
import { Editor, onContentUpdatedParams } from '../components/Editor'
import { ToC } from '../components/ToC'

export function Document() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()

  const { data, isFetching } = useQuery({
    queryKey: ['document', id],
    queryFn: async () => {
      const response = await window.api.fetchDocument({ id: id! })

      return response.data
    },
    enabled: !!id // so vai executar se o ID existir
  })

  const { mutateAsync: saveDocument } = useMutation({
    mutationFn: async ({ title, content }: onContentUpdatedParams) => {
      await window.api.saveDocument({
        id: id!,
        title,
        content
      })
    },
    onSuccess: (_, { title }) => {
      queryClient.setQueryData<IPCDocument[]>(['documents'], (documents) => {
        return documents?.map((document) => {
          if (document.id === id) {
            console.log(title)
            return { ...document, title }
          }

          return document
        })
      })
    }
  })

  const initialContent = useMemo(() => {
    if (data) return `<h1>${data?.title}</h1>${data.content ?? '<p></p>'}`

    return ''
  }, [data])

  function handleEditorContentUpdated({ title, content }: onContentUpdatedParams) {
    saveDocument({ title, content })
  }

  return (
    <main className="flex-1 flex py-12 px-10 gap-8">
      <aside className="hidden lg:block sticky top-0">
        <span className="text-rotion-300 font-semibold uppercase text-xs ">TABLE OF CONTENTS</span>

        <ToC.Root>
          <ToC.Link>Back-end</ToC.Link>
          <ToC.Section>
            <ToC.Link>Banco de Dados</ToC.Link>
            <ToC.Link>Autenticação</ToC.Link>
          </ToC.Section>
        </ToC.Root>
      </aside>

      <section className="flex-1 flex flex-col items-center">
        {!isFetching && data && (
          <Editor onContentUpdated={handleEditorContentUpdated} content={initialContent} />
        )}
      </section>
    </main>
  )
}
