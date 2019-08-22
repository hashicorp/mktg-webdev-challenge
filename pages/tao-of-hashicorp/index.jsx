import './style.css'
import query from './query.graphql'
import { fetch } from '@hashicorp/next-hashicorp/dato/client'
import EmailSubscribe from '@hashicorp/hashi-email-subscribe'
import SecondaryNav from '@hashicorp/hashi-secondary-nav'
import secondaryNavFragment from '@hashicorp/hashi-secondary-nav/fragment.graphql'

function TaoOfHashicorpPage({ pageData, secondaryNav, currentPage }) {
  return (
    <>
      <SecondaryNav
        data={secondaryNav.companyLinks}
        page={currentPage}
        dark={true}
      />

      <p className="my-data">{JSON.stringify(pageData)}</p>

      <EmailSubscribe />
    </>
  )
}

TaoOfHashicorpPage.getInitialProps = async ({ asPath }) => {
  const { pageData, secondaryNav } = await fetch({
    query,
    fragments: [secondaryNavFragment]
  })
  return { pageData, secondaryNav, currentPage: asPath }
}

TaoOfHashicorpPage.layout = true

export default TaoOfHashicorpPage
