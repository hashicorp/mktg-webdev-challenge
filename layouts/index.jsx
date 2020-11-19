import Content from '@hashicorp/react-content'
import { createMdxProvider } from '@hashicorp/nextjs-scripts/lib/providers/docs'

const MDXProvider = createMdxProvider({ product: null })

export default function MDXLayout() {
  return function MdxPageLayout({ children }) {
    return (
      <MDXProvider>
        <div>
          <Content content={children} />
        </div>
      </MDXProvider>
    )
  }
}
