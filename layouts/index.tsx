import Nav from '@hashicorp/react-nav'
import Footer from '@hashicorp/react-footer'

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  )
}
