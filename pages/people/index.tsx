import Nav from '@hashicorp/react-nav'
import Footer from '@hashicorp/react-footer'
import style from './style.module.css'
import query from './query.graphql'
import rivetQuery from '@hashicorp/nextjs-scripts/dato/client'

export default function PeoplePage({ allPeople, allDepartments }) {
  return (
    <>
      <Nav />
      <main>
        <pre className={style.myData}>{JSON.stringify(allPeople, null, 2)}</pre>
        <pre className={style.myData}>
          {JSON.stringify(allDepartments, null, 2)}
        </pre>
      </main>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const data = await rivetQuery({ query })
  return { props: data }
}
