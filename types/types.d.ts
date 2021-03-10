export type PostData = {
  id: string
  contentHtml?: string
  date?: string
  [key: string]: any
}

export type PostIdParams = { params: { id: string } }
