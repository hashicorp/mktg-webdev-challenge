import './style.css'
import query from './query.graphql'
import { fetch } from '@hashicorp/nextjs-scripts/dato/client'
import EmailSubscribe from '@hashicorp/react-email-subscribe'
import SecondaryNav from '@hashicorp/react-secondary-nav'

function TaoOfHashicorpPage({ pageData, globalNavigation, currentPage }) {
  return (
    <>
      <SecondaryNav
        data={globalNavigation.companyLinks}
        page={currentPage}
        dark={true}
      />

      <p className="my-data">{JSON.stringify(pageData)}</p>

      <EmailSubscribe />
    </>
  )
}

TaoOfHashicorpPage.getInitialProps = async ({ asPath }) => {
  const { pageData, globalNavigation } = await fetch({
    query,
    dependencies: [SecondaryNav]
  })
  return { pageData, globalNavigation, currentPage: asPath }
}

TaoOfHashicorpPage.layout = true

export default TaoOfHashicorpPage
