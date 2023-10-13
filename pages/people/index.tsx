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

// Recurisive function to get all descendants of a parent department
function getAllDescendants(
	parent: DepartmentRecord,
	allDepartments: DepartmentRecord[],
	descendants: string[]
) {
	const allChildren = allDepartments.filter(
		(dept: DepartmentRecord) => dept.parent?.id === parent.id
	)

	if (allChildren.length === 0) {
		descendants.push(parent.id)
	} else {
		descendants.push(parent.id)
		allChildren.forEach((child: DepartmentRecord) => {
			getAllDescendants(child, allDepartments, descendants)
		})
	}
	return descendants
}

export default function PeoplePage({
	allPeople,
	allDepartments,
}: Props): React.ReactElement {
	const [filterBy, setFilterBy] = React.useState([])
	const [hideNoAvatarResults, setHideNoAvatarResults] = React.useState(false)
	const [filteredPeople, setFilteredPeople] = React.useState(allPeople)
	const [filteredByNamePeople, setFilteredByNamePeople] =
		React.useState(filteredPeople)
	const topLevelDepartments: DepartmentRecord[] = allDepartments.filter(
		(dept: DepartmentRecord) => !dept.parent
	)
	const hasNoResults = filteredPeople.length == 0

	const handleDepartmentClick = (department: DepartmentRecord) => {
		// find all children and add to filterBy arr
		const allSubDepts = getAllDescendants(department, allDepartments, [])
		const filteredResults = allPeople.filter((person: PersonRecord) =>
			allSubDepts?.includes(person.department?.id)
		)

		setFilterBy(allSubDepts)
		setFilteredPeople(filteredResults)
		setFilteredByNamePeople(filteredResults)
	}

	const onSearchBoxChange = (e) => {
		const filterText = e.target.value
		if (filterText === '') {
			setFilteredByNamePeople(filteredPeople)
		} else {
			const filteredResults = filteredPeople.filter((person: PersonRecord) => {
				const lowerCaseName = person.name?.toLowerCase()
				return lowerCaseName.includes(filterText.toLowerCase())
			})
			setFilteredByNamePeople(filteredResults)
		}
	}

	const onHideNoAvatarChange = () => {
		setHideNoAvatarResults(!hideNoAvatarResults)
		// const filteredResults = hideNoAvatarResults ?
		// 	filteredPeople.filter(person => person.avatar) :
		// setFilteredPeople(filteredResults);
	}

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
							onChange={onSearchBoxChange}
							placeholder="Search people by name"
						/>
					</form>
					<form>
						<input
							type="checkbox"
							id="hide-no-avatar-checkbox"
							onChange={onHideNoAvatarChange}
						/>
						<label>Hide people missing a profile image</label>
					</form>
				</div>
			</div>

			<div className={style.searchContainer}>
				<div className={style.filterContainer}>
					<h3>Filter By Department</h3>
					<ul className={style.peopleList}>
						{topLevelDepartments.map((department: DepartmentRecord) => (
							<li key={department.id}>
								<Caret
									allDepartments={allDepartments}
									department={department}
									subDepartments={allDepartments.filter(
										(dept: DepartmentRecord) =>
											dept.parent?.id === department.id
									)}
									key={department.id}
									isChild={false}
									handleDepartmentClick={handleDepartmentClick}
									selectedDept={filterBy}
								/>
							</li>
						))}
					</ul>
				</div>

				<div>
					<div className={style.searchResultsContainer}>
						{hasNoResults && <p>No results found.</p>}
						{filteredByNamePeople.map((person: PersonRecord) => (
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
