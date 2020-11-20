import Content from '@hashicorp/react-content'
import { createMdxProvider } from '@hashicorp/nextjs-scripts/lib/providers/docs'
import style from './style.module.css'

const MDXProvider = createMdxProvider({ product: null })

export default function MDXLayout({ children }) {
  return (
    <MDXProvider>
      <div className={style.intro}>
        <Content content={children} />
      </div>
    </MDXProvider>
  )
}
