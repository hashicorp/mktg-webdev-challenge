import React from 'react'
import { AppProps } from 'next/app'
import './style.css'
import '@hashicorp/platform-util/nprogress/style.css'

import NProgress from '@hashicorp/platform-util/nprogress'
import Router from 'next/router'

NProgress({ Router })

function App({ Component, pageProps }: AppProps): React.ReactElement {
  return <Component {...pageProps} />
}

export default App
