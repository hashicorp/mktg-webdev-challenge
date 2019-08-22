import './style.css'
import Content from '@hashicorp/hashi-content'

export default function LayoutWrapper() {
  return function MdxPageLayout({ children }) {
    return (
      <div id="intro">
        <Content content={children} />
      </div>
    )
  }
}
