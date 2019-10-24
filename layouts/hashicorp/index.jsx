import './style.css'
import Nav from '@hashicorp/react-nav'
import Footer from '@hashicorp/react-footer'

function Layout({ children }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
