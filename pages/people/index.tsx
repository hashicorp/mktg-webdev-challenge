import { useState } from 'react'
import rivetQuery from '@hashicorp/platform-cms'
import { GetStaticPropsResult } from 'next'
import classNames from 'classnames'
import { PersonRecord, DepartmentRecord } from 'types'
import BaseLayout from '../../layouts/base'
import query from './query.graphql'
import Filter from 'components/filter'
import Header from 'components/header'
import Card from 'components/card'
import style from './style.module.css'
import Search from 'components/search'

interface Props {
	allPeople: PersonRecord[]
	allDepartments: DepartmentRecord[]
}

export default function PeoplePage({
	allPeople,
	allDepartments,
}: Props): React.ReactElement {
	const [nameFilter, setNameFilter] = useState('')
	const [hidePeople, setHidePeople] = useState(false)

	return (
		<div className={classNames(style.root)}>
			<Header heading="HashiCorp Humans" subheading="Find a HashiCorp human">
				<Search
					hidePeople={hidePeople}
					nameFilter={nameFilter}
					setHidePeople={setHidePeople}
					setNameFilter={setNameFilter}
				/>
			</Header>
			<div className={classNames(style.layout)}>
				<div className={classNames(style.filterColumn)}>
					<Filter data={allDepartments} />
				</div>
				<main>
					{allPeople.length > 0 ? (
						<ul className={classNames(style.cards)}>
							{allPeople.map((person: PersonRecord) => (
								<li key={person.id}>
									<Card
										avatarUrl={person.avatar?.url && person.avatar.url}
										department={person.department.name}
										name={person.name}
										title={person.title}
									/>
								</li>
							))}
						</ul>
					) : (
						<p>No results found.</p>
					)}

					{/* <h2>People Data</h2>
					<pre className={style.myData}>
						{JSON.stringify(allPeople, null, 2)}
					</pre> */}
					{/* <h2>Departments Data</h2>
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
