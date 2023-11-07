export interface Document {
  id: string
  title: string
  content: string
}

/**
 * requests
 */

/**
 * Responses
 */
export interface FetchAllDocumentsResponse {
  data: Document[]
}
