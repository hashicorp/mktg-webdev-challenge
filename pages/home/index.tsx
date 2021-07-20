import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { GetStaticPropsResult } from 'next'
import markdownDefaults from '@hashicorp/platform-markdown-utils'
import Button from 'components/button'
import s from './style.module.css'

interface Props {
  mdxSource: MDXRemoteSerializeResult
}

export default function IndexPage({ mdxSource }: Props): React.ReactElement {
  return (
    <main className={s.root}>
      <MDXRemote {...mdxSource} components={{ Button }} />
    </main>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const source = fs.readFileSync(
    path.join(process.cwd(), 'pages/home/content.mdx'),
    'utf8'
  )
  const mdxSource = await serialize(source, { mdxOptions: markdownDefaults() })
  return { props: { mdxSource } }
}
