import React from 'react'
import { DepartmentRecord } from 'types'

interface FilterProps {
	data: DepartmentRecord[]
}

const Filter = ({ data }: FilterProps) =>
	data.length > 0 && (
		<ul>
			{data.map((d) => (
				<li key={d.id}>
					<div>{d.name}</div>
					{d.children.length > 0 && <Filter data={d.children} />}
				</li>
			))}
		</ul>
	)

export default Filter
