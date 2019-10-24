import React from 'react'
import './style.css'
import App from 'next/app'
import NProgress from 'nprogress'
import Router from 'next/router'
import Layout from '../layouts/hashicorp'

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class NextApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    // Execute the component's `getInitialProps` function
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props
    // If the component asks for a layout, wrap it with the layout. Otherwise use a fragment.
    const LayoutWrapper = Component.layout ? Layout : React.Fragment

    return (
      <>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </>
    )
  }
}

export default NextApp
