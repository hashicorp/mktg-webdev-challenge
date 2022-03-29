import React from 'react'
import navData from '../../data/nav-data.json'
import Nav from './components/nav'
import Footer from './components/footer'

const BaseLayout: React.FC = ({ children }) => {
  return (
    <>
      <Nav data={navData} />
      {children}
      <Footer />
    </>
  )
}

export default BaseLayout
