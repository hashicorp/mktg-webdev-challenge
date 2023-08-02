import fs from 'fs'
import path from 'path'
import highlight from '@mapbox/rehype-prism'
import rehypeSurfaceCodeNewlines from '@hashicorp/platform-code-highlighting/rehype-surface-code-newlines'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { GetStaticPropsResult } from 'next'
import remarkGfm from 'remark-gfm'
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

	const mdxSource = await serialize(source, {
		mdxOptions: {
			remarkPlugins: [remarkGfm],
			rehypePlugins: [
				[highlight, { ignoreMissing: true }],
				rehypeSurfaceCodeNewlines,
			],
		},
	})
	return { props: { mdxSource } }
}
