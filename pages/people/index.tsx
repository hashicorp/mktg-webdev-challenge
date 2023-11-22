import rivetQuery from '@hashicorp/platform-cms'
import { GetStaticPropsResult } from 'next'
import { PersonRecord, DepartmentRecord } from 'types'
import BaseLayout from '../../layouts/base'
import query from './query.graphql'
import Filter from 'components/filter'
import Header from 'components/header'
import Card from 'components/card'

interface Props {
	allPeople: PersonRecord[]
	allDepartments: DepartmentRecord[]
}

export default function PeoplePage({
	allPeople,
	allDepartments,
}: Props): React.ReactElement {
	return (
		<div>
			<Header heading="HashiCorp Humans" subheading="Find a HashiCorp human" />
			<div>
				<div>
					<Filter />
				</div>
				<main>
					<ul>
						<li>
							<Card />
						</li>
					</ul>

					{/* <h2>People Data</h2>
					<pre className={style.myData}>
						{JSON.stringify(allPeople, null, 2)}
					</pre>
					<h2>Departments Data</h2>
					<pre className={style.myData}>
						{JSON.stringify(allDepartments, null, 2)}
					</pre> */}
				</main>
			</div>
		</div>
	)
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
	const data = await rivetQuery({ query })
	return { props: data }
}

PeoplePage.layout = BaseLayout
