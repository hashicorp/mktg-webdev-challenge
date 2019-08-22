import './style.css'
import Nav from '@hashicorp/hashi-nav'
import Footer from '@hashicorp/hashi-footer'

function Layout({ children, globalFooter, globalNavigation }) {
  return (
    <>
      <Nav data={globalNavigation} />
      <main>{children}</main>
      <Footer data={globalFooter} />
    </>
  )
}

export default Layout
