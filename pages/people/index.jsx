import style from './style.module.css'
import query from './query.graphql'
import rivetQuery from '@hashicorp/nextjs-scripts/dato/client'

function PeoplePage({ allPeople, allDepartments }) {
  return (
    <>
      <pre className={style.myData}>{JSON.stringify(allPeople, null, 2)}</pre>
      <pre className={style.myData}>
        {JSON.stringify(allDepartments, null, 2)}
      </pre>
    </>
  )
}

export async function getStaticProps() {
  const data = await rivetQuery({ query })
  return { props: data }
}

PeoplePage.layout = true

export default PeoplePage
