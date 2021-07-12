import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import markdownDefaults from '@hashicorp/nextjs-scripts/markdown'
import Button from 'components/button'
import s from './style.module.css'

export default function IndexPage({ mdxSource }) {
  return (
    <main className={s.root}>
      <MDXRemote {...mdxSource} components={{ Button }} />
    </main>
  )
}

export async function getStaticProps() {
  const source = fs.readFileSync(
    path.join(process.cwd(), 'pages/home/content.mdx'),
    'utf8'
  )
  const mdxSource = await serialize(source, { mdxOptions: markdownDefaults() })
  return { props: { mdxSource } }
}
