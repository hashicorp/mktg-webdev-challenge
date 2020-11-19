import style from './style.module.css'
import query from './query.graphql'
import rivetQuery from '@hashicorp/nextjs-scripts/dato/client'

function PeoplePage({ allPeople }) {
  return (
    <>
      <pre className={style.myData}>{JSON.stringify(allPeople, null, 2)}</pre>
    </>
  )
}

PeoplePage.getInitialProps = async () => {
  const { allPeople } = await rivetQuery({ query })
  return { allPeople }
}

PeoplePage.layout = true

export default PeoplePage
