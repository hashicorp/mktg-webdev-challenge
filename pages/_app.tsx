import React from 'react'
import './style.css'
import '@hashicorp/nextjs-scripts/lib/nprogress/style.css'

import NProgress from '@hashicorp/nextjs-scripts/lib/nprogress'
import Router from 'next/router'
import Layout from '../layouts'

NProgress({ Router })

function App({ Component, pageProps }) {
  const AppLayout = Component.layout ? Layout : React.Fragment
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}

export default App
