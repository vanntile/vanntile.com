import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import remark from 'remark'
import html from 'remark-html'
import { PostData, PostIdParams } from '../types/types'

const postsDirectory = path.join(process.cwd(), 'posts')

export const getSortedPostsData = (): PostData[] => {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData: PostData[] = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')
    const fileContents = fs.readFileSync(path.join(postsDirectory, fileName), 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    return {
      id,
      ...matterResult.data,
    }
  })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date && b.date && a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export const getAllPostIds = (): PostIdParams[] =>
  fs.readdirSync(postsDirectory).map(fileName => ({ params: { id: fileName.replace(/\.md$/, '') } }))

export const getPostData = async (id: string): Promise<PostData> => {
  const fileContents = fs.readFileSync(path.join(postsDirectory, `${id}.md`), 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const contentHtml = (
    await remark()
      .use(html)
      .process(matterResult.content)
  ).toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  }
}
