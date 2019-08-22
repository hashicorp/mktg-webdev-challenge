import './style.css'
import App, { Container } from 'next/app'
import NProgress from 'nprogress'
import Router from 'next/router'
import { fetch } from '@hashicorp/next-hashicorp/dato/client'
import navFragment from '@hashicorp/hashi-nav/fragment.graphql'
import footerFragment from '@hashicorp/hashi-footer/fragment.graphql'
import query from './globalData.graphql'
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

    // If the component is asking for a layout, fetch and return layout data
    // Otherwise return the normal pageProps
    if (Component.layout) {
      const { globalNavigation, globalFooter } = await fetch({
        query,
        fragments: [navFragment, footerFragment]
      })

      return { pageProps, globalNavigation, globalFooter }
    } else {
      return { pageProps }
    }
  }

  render() {
    const { Component, pageProps } = this.props
    // If the component asks for a layout, wrap it with the layout. Otherwise use a fragment.
    const LayoutWrapper = Component.layout ? Layout : React.Fragment
    const globalData = {
      globalNavigation: this.props.globalNavigation,
      globalFooter: this.props.globalFooter
    }

    return (
      <Container>
        <LayoutWrapper {...(Component.layout ? globalData : null)}>
          <Component {...pageProps} />
        </LayoutWrapper>
      </Container>
    )
  }
}

export default NextApp
