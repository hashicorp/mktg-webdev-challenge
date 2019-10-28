import './style.css'
import query from './query.graphql'
import { fetch } from '@hashicorp/nextjs-scripts/dato/client'

function PeoplePage({ allPeople }) {
  return (
    <>
      <pre className="my-data">{JSON.stringify(allPeople, null, 2)}</pre>
    </>
  )
}

PeoplePage.getInitialProps = async () => {
  const { allPeople } = await fetch({
    query
  })
  return { allPeople }
}

PeoplePage.layout = true

export default PeoplePage
