import rivetQuery from '@hashicorp/platform-cms'
import { GetStaticPropsResult } from 'next'
import { PersonRecord, DepartmentRecord } from 'types'
import BaseLayout from '../../layouts/base'
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
		<div>
			<div>
				{/* Filter */}
				<div>Filter By Department</div>
				<ul>
					<li>
						Category
						<ul>
							<li>Subcategory</li>
							<ul>
								<li>Subcategory</li>
							</ul>
						</ul>
					</li>
				</ul>
			</div>
			<main>
				<div>
					{/* Header */}
					<div>
						<h1>HashiCorp Humans</h1>
						<p>Find a HashiCorp human</p>
					</div>
					{/* Search */}
					<div>
						<input type="search" name="filter" id="filter" />
						<div>
							<input
								type="checkbox"
								name="missing-people"
								id="missing-people"
								placeholder="Search people by name"
							/>
							<label htmlFor="missing-people">
								Hide people missing a profile image
							</label>
						</div>
					</div>
				</div>
				<div>
					{/* Card */}
					<ul>
						<li>
							<div>
								<div>Avatar</div>
								<h2>Name</h2>
								<p>Title</p>
								<p>Department</p>
							</div>
						</li>
					</ul>
				</div>

				<h2>People Data</h2>
				<pre className={style.myData}>{JSON.stringify(allPeople, null, 2)}</pre>
				<h2>Departments Data</h2>
				<pre className={style.myData}>
					{JSON.stringify(allDepartments, null, 2)}
				</pre>
			</main>
		</div>
	)
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
	const data = await rivetQuery({ query })
	return { props: data }
}

PeoplePage.layout = BaseLayout
