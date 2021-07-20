import Nav from '@hashicorp/react-nav'
import Footer from '@hashicorp/react-footer'
import rivetQuery from '@hashicorp/platform-cms'
import { GetStaticPropsResult } from 'next'
import { PersonRecord, DepartmentRecord } from 'types'
import style from './style.module.css'
import query from './query.graphql'

interface Props {
  allPeople: PersonRecord[]
  allDepartments: DepartmentRecord[]
}

export default function PeoplePage({
  allPeople,
  allDepartments,
}: Props): React.ReactElement {
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

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const data = await rivetQuery({ query })
  return { props: data }
}
