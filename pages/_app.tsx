import React from 'react'
import { AppProps } from 'next/app'
import './style.css'
import '@hashicorp/platform-util/nprogress/style.css'

import NProgress from '@hashicorp/platform-util/nprogress'
import Router from 'next/router'

NProgress({ Router })

const EmptyLayout = ({ children }) => children

interface HashiAppProps extends AppProps {
  Component: AppProps['Component'] & { layout?: React.ComponentType }
}

function App({ Component, pageProps }: HashiAppProps): React.ReactElement {
  const Layout = Component.layout ?? EmptyLayout
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
