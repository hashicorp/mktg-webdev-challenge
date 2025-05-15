/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import {
	PersonRecord,
	DepartmentRecord,
	DepartmentNode,
	DepartmentTree,
	Department,
} from 'types'

export const buildChildren = (
	departments: DepartmentNode[]
): Record<string, DepartmentRecord> => {
	return departments.reduce(
		(acc: Record<string, DepartmentRecord>, item: DepartmentRecord) => {
			acc[item.id] = { ...item, children: [] }
			return acc
		},
		{} as Record<string, DepartmentRecord>
	)
}

// Fixed implementation of departmentRecordsToDepartmentTree
export const departmentRecordsToDepartmentTree = (
	departments: DepartmentNode[]
): DepartmentRecord[] => {
	// Handle empty array case
	if (!departments || departments.length === 0) {
		return []
	}

	const listWithChildren = buildChildren(departments)

	// Return only root departments (those with no parent or parent not in the list)
	return departments.reduce(
		(nestedList: DepartmentRecord[], item: DepartmentNode) => {
			const currentItemWithChildren = listWithChildren[item.id]
			const currentItemParentId = item.parent?.id

			if (currentItemParentId) {
				// Make sure the parent exists before trying to add children to it
				if (listWithChildren[currentItemParentId]) {
					listWithChildren[currentItemParentId].children.push(
						currentItemWithChildren
					)
				}
			} else {
				nestedList.push(currentItemWithChildren)
			}

			return nestedList
		},
		[] as DepartmentRecord[]
	)
}

export const filterPeople = (
	allPeople: PersonRecord[],
	filteredName: string,
	filterByPicture: boolean,
	filteredDepartments: Department[]
) => {
	return allPeople.filter((person: PersonRecord) => {
		if (filterByPicture && person.avatar?.url == null) {
			return false
		} else if (
			filteredName !== '' &&
			!person.name.toLowerCase().includes(filteredName.toLowerCase())
		) {
			return false
		} else if (
			filteredDepartments.length !== 0 &&
			!filteredDepartments
				.reduce(
					(acc: string[], department: DepartmentNode) => [
						...acc,
						department.name,
					],
					[]
				)
				.includes(person.department.name)
		) {
			return false
		}

		return true
	})
}

export const findDepartments = (
	departmentTree: DepartmentTree,
	departmentId: string,
	departments: Department[] = []
): Department[] => {
	for (const department of departmentTree) {
		if (department.id === departmentId) {
			return [...departments, { id: department.id, name: department.name }]
		} else if (department.children.length > 0) {
			const foundDepartments = findDepartments(
				department.children,
				departmentId,
				[...departments, { id: department.id, name: department.name }]
			)
			if (foundDepartments.length > 0) {
				return foundDepartments
			}
		}
	}

	return []
}

export const findChildrenDepartments = (
	departmentTree: DepartmentTree,
	departmentId: string,
	childDepartment: boolean = false,
	departments: Department[] = []
): Department[] => {
	const foundDepartments = []

	for (const department of departmentTree) {
		if (department.id === departmentId || childDepartment) {
			foundDepartments.push(
				...[
					{ id: department.id, name: department.name },
					...findChildrenDepartments(
						department.children,
						departmentId,
						true,
						departments
					),
				]
			)
		} else {
			foundDepartments.push(
				...findChildrenDepartments(
					department.children,
					departmentId,
					childDepartment,
					departments
				)
			)
		}
	}

	return foundDepartments
}
