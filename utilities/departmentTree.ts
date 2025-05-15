/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import {
	PersonRecord,
	Department,
	DepartmentNode,
	DepartmentRecord,
	DepartmentTree,
} from 'types'

/**
 * This function fixes the issues with the original departmentRecordsToDepartmentTree function
 * that was causing the DepartmentFilter component to not render correctly
 */
export function departmentRecordsToDepartmentTree(
	departments: DepartmentNode[]
): DepartmentRecord[] {
	// Handle empty array case
	if (!departments || departments.length === 0) {
		return []
	}

	// First create a map for quick access to departments by ID
	const listWithChildren = buildChildren(departments)

	// Return only root departments (those with no parent or parent not in the list)
	return departments.reduce(
		(nestedList: DepartmentRecord[], item: DepartmentNode) => {
			const currentItemWithChildren = listWithChildren[item.id]
			// Check if item is a root department (no parent or parent ID is null)
			if (!item.parent || !item.parent.id) {
				nestedList.push(currentItemWithChildren)
			}
			return nestedList
		},
		[] as DepartmentRecord[]
	)
}

/**
 * Helper function to build the children relationships
 */
function buildChildren(
	departments: DepartmentNode[]
): Record<string, DepartmentRecord> {
	// Initialize map with empty children arrays
	const map: Record<string, DepartmentRecord> = {}

	departments.forEach((dept) => {
		map[dept.id] = {
			...dept,
			children: [],
		}
	})

	// Populate children arrays
	departments.forEach((dept) => {
		if (dept.parent && dept.parent.id && map[dept.parent.id]) {
			map[dept.parent.id].children.push(map[dept.id])
		}
	})

	return map
}

/**
 * Find all departments in the path from root to the specified department
 */
export function findDepartments(
	departmentTree: DepartmentTree,
	departmentId: string
): Department[] {
	if (!departmentId) {
		return []
	}

	// Result will hold the full path
	const foundDepartments: Department[] = []

	function findDepartment(
		tree: DepartmentTree,
		id: string,
		path: Department[] = []
	): boolean {
		for (const dept of tree) {
			// Create a new path including this department
			const currentPath = [...path, { id: dept.id, name: dept.name }]

			// If this is the department we're looking for
			if (dept.id === id) {
				foundDepartments.push(...currentPath)
				return true
			}

			// If this department has children, search them
			if (dept.children && dept.children.length > 0) {
				if (findDepartment(dept.children, id, currentPath)) {
					return true
				}
			}
		}

		return false
	}

	findDepartment(departmentTree, departmentId)
	return foundDepartments
}

/**
 * Find all child departments (including nested) for a given department
 */
export function findChildrenDepartments(
	departmentTree: DepartmentTree,
	departmentId: string
): string[] {
	if (!departmentId) {
		return []
	}

	// Start with the current department ID
	const childDepartmentIds = [departmentId]

	function findDepartmentById(
		tree: DepartmentTree,
		id: string
	): DepartmentNode | null {
		for (const dept of tree) {
			if (dept.id === id) {
				return dept
			}

			if (dept.children && dept.children.length > 0) {
				const found = findDepartmentById(dept.children, id)
				if (found) {
					return found
				}
			}
		}

		return null
	}

	function collectChildIds(department: DepartmentNode) {
		if (department.children && department.children.length > 0) {
			department.children.forEach((child) => {
				childDepartmentIds.push(child.id)
				collectChildIds(child)
			})
		}
	}

	// Find the department
	const department = findDepartmentById(departmentTree, departmentId)

	// If found, collect all its child IDs
	if (department) {
		collectChildIds(department)
	}

	return childDepartmentIds
}

/**
 * Filter people based on name, whether they have a profile picture, and department
 */
export function filterPeople(
	allPeople: PersonRecord[],
	filterName: string,
	hideNoPicture: boolean,
	filterDepartments: string[]
): PersonRecord[] {
	return allPeople.filter((person: PersonRecord) => {
		// Check for missing profile picture
		if (hideNoPicture && (!person.avatar || !person.avatar.url)) {
			return false
		}

		// Check for name match
		if (
			filterName !== '' &&
			!person.name.toLowerCase().includes(filterName.toLowerCase())
		) {
			return false
		}

		// Check for department match
		if (
			filterDepartments.length !== 0 &&
			(!person.department || !filterDepartments.includes(person.department.id))
		) {
			return false
		}

		return true
	})
}
