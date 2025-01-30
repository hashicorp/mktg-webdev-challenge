/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import React, { useState } from 'react'
import { executeQuery } from '@datocms/cda-client'
import { GetStaticPropsResult } from 'next'
import { PersonRecord, DepartmentNode, DepartmentTree, Department } from 'types'
import BaseLayout from '../../layouts/base'

import {
	filterPeople,
	findDepartments,
	departmentRecordsToDepartmentTree,
	findChildrenDepartments,
} from '../../utilities'
import query from './query.graphql'

import Profile from 'components/profile'
import Search from 'components/search'
import DepartmentFilter from 'components/departmentFilter'

interface Props {
	allPeople: PersonRecord[]
	departmentTree: DepartmentTree
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
	// Sr. candidate TODO: Load data from DB

	const result = await executeQuery<{
		allPeople: PersonRecord[]
		allDepartments: DepartmentNode[]
	}>(query, {
		token: `${process.env.DATO_API_TOKEN}`,
	})

	const data = {
		allPeople: result.allPeople,
		allDepartments: result.allDepartments,
	}

	return {
		props: {
			allPeople: data.allPeople,
			departmentTree: departmentRecordsToDepartmentTree(data.allDepartments),
		},
	}
}

export default function PeoplePage({
	allPeople,
	departmentTree,
}: Props): React.ReactElement {
	const [searchingName, setSearchingName] = useState('')
	const [hideNoPicture, setHideNoPicture] = useState(false)
	const [filteredDepartments, setFilteredDepartments] = useState([])

	const peopleFiltered = filterPeople(
		allPeople,
		searchingName,
		hideNoPicture,
		findChildrenDepartments(
			departmentTree,
			filteredDepartments[filteredDepartments.length - 1]?.id || []
		)
	)

	const filteredDepartmentIds = filteredDepartments.reduce(
		(acc: string[], department: DepartmentNode) => [...acc, department.id],
		[]
	)

	// Sr. candidate TODO: Update URL based on search and department filters

	return (
		<main className="g-grid-container">
			<div>
				<div>
					<h1>HashiCorp Humans</h1>
					<span>Find a HashiCorp human</span>
				</div>
				<Search
					onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setSearchingName(e.target.value)
						/**
						 * Sr. candidate TODO: Hit the API to search for people
						 * You can use the following URL to hit the API
						 * /api/hashicorp?search=...
						 */
					}}
					onProfileChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setHideNoPicture(e.target.checked)
					}
				/>
			</div>
			<div>
				<aside>
					<DepartmentFilter
						filteredDepartmentIds={filteredDepartmentIds}
						clearFiltersHandler={() => {
							setFilteredDepartments([])
						}}
						selectFilterHandler={(departmentFilter: Department) => {
							const totalDepartmentFilter = findDepartments(
								departmentTree,
								departmentFilter.id
							)
							setFilteredDepartments(totalDepartmentFilter)
						}}
						departmentTree={departmentTree}
					/>
				</aside>
				<ul>
					{peopleFiltered.length === 0 && (
						<div>
							<span>No results found.</span>
						</div>
					)}
					{peopleFiltered.map((person: PersonRecord) => {
						return (
							<li key={person.id}>
								<Profile
									imgUrl={person.avatar?.url}
									name={person.name}
									title={person.title}
									department={person.department.name}
								/>
							</li>
						)
					})}
				</ul>
			</div>
		</main>
	)
}

PeoplePage.layout = BaseLayout
