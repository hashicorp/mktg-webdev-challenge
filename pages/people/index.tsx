import rivetQuery from '@hashicorp/platform-cms'
import { GetStaticPropsResult } from 'next'
import { PersonRecord, DepartmentRecord } from 'types'
import BaseLayout from '../../layouts/base'
import style from './style.module.css'
import query from './query.graphql'
import Caret from 'components/caret'
import React from 'react'
import PersonCard from 'components/personCard'

interface Props {
	allPeople: PersonRecord[]
	allDepartments: DepartmentRecord[]
}

export default function PeoplePage({
	allPeople,
	allDepartments,
}: Props): React.ReactElement {
	// let filterBy = [];
	const [filterBy, setFilterBy] = React.useState([])
	const [hideNoAvatarResults, setHideNoAvatarResults] = React.useState(false)
	const [filteredPeople, setFilteredPeople] = React.useState(allPeople)
	// let filteredPeople: PersonRecord[] = allPeople;
	const topLevelDepartments: DepartmentRecord[] = allDepartments.filter(
		(dept) => !dept.parent
	)
	const hasNoResults = filteredPeople.length == 0
	// console.log(allPeople.filter(person => ["10893315", "10893318"].includes(person?.department?.id)))

	const handleDepartmentClick = (department: string) => {
		// setFilterBy([]);
		console.log('filterBy', department)
		filterBy.push(department)
		setFilterBy(filterBy)
	}

	React.useEffect(() => {
		console.log('filterBy', filterBy)
		if (filterBy.length > 0) {
			setFilteredPeople(
				allPeople.filter((person) => filterBy.includes(person?.department?.id))
			)
		}
		console.log('filteredPeeps', filteredPeople)
	}, [filterBy])

	return (
		<main className={`g-grid-container ${style.main}`}>
			<div className={style.headerContainer}>
				<h1>HashiCorp Humans</h1>
				<p>Find a HashiCorp human</p>
				<div className={style.searchBar}>
					<form>
						<input
							id="name-search-bar"
							className={style.searchInput}
							type="text"
							placeholder="Search people by name"
						/>
					</form>
					<form>
						<input type="checkbox" id="hide-no-avatar-checkbox" />
						<label>Hide people missing a profile image</label>
					</form>
				</div>
			</div>

			<div className={style.searchContainer}>
				<div className={style.filterContainer}>
					<h3>Filter By Department</h3>
					<ul className={style.peopleList}>
						{topLevelDepartments.map((department) => (
							<li key={department.id}>
								<Caret
									allDepartments={allDepartments}
									department={department}
									subDepartments={allDepartments.filter(
										(dept) => dept.parent?.id === department.id
									)}
									key={department.id}
									isChild={false}
									handleDepartmentClick={handleDepartmentClick}
								/>
							</li>
						))}
					</ul>
				</div>

				<div>
					<div className={style.searchResultsContainer}>
						{hasNoResults && <p>No results found.</p>}
						{filteredPeople.map((person) => (
							<PersonCard person={person} key={person.id} />
						))}
					</div>
				</div>
			</div>
		</main>
	)
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
	const data = await rivetQuery({ query })
	return { props: data }
}

PeoplePage.layout = BaseLayout
