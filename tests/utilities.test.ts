/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, test, expect } from '@jest/globals'
import {
	filterPeople,
	findDepartments,
	findChildrenDepartments,
	buildChildren,
} from '../utilities/index'
import { PersonRecord, DepartmentTree, Department, DepartmentNode } from 'types'

describe('buildChildren', () => {
	test('should return an empty object when given an empty list', () => {
		const result = buildChildren([])
		expect(result).toEqual({})
	})

	test('should build a record with children empty arrays for each department', () => {
		const departments: DepartmentNode[] = [
			{ id: '1', name: 'Engineering', parent: null },
			{ id: '2', name: 'Marketing', parent: null },
		]

		const result = buildChildren(departments)

		expect(result).toEqual({
			'1': { children: [], id: '1', name: 'Engineering', parent: null },
			'2': { children: [], id: '2', name: 'Marketing', parent: null },
		})
	})
})

describe('filterPeople', () => {
	const allPeople: PersonRecord[] = [
		{
			id: '1',
			name: 'Aqsa',
			avatar: { url: 'http://example.com/Aqsa.jpg' },
			department: { id: '1', name: 'Engineering' },
		},
		{
			id: '2',
			name: 'Bob',
			avatar: null,
			department: { id: '2', name: 'Marketing' },
		},
		{
			id: '3',
			name: 'Sabi',
			avatar: { url: 'http://example.com/Sabi.jpg' },
			department: { id: '1', name: 'Engineering' },
		},
	]

	test('should filter people by picture', () => {
		const result = filterPeople(allPeople, '', true, [])
		expect(result).toEqual([
			{
				id: '1',
				name: 'Aqsa',
				avatar: { url: 'http://example.com/Aqsa.jpg' },
				department: { id: '1', name: 'Engineering' },
			},
			{
				id: '3',
				name: 'Sabi',
				avatar: { url: 'http://example.com/Sabi.jpg' },
				department: { id: '1', name: 'Engineering' },
			},
		])
	})

	test('should filter people by name', () => {
		const result = filterPeople(allPeople, 'Aqsa', false, [])
		expect(result).toEqual([
			{
				id: '1',
				name: 'Aqsa',
				avatar: { url: 'http://example.com/Aqsa.jpg' },
				department: { id: '1', name: 'Engineering' },
			},
		])
	})

	test('should filter people by department', () => {
		const filteredDepartments: Department[] = [{ id: '1', name: 'Engineering' }]
		const result = filterPeople(allPeople, '', false, filteredDepartments)
		expect(result).toEqual([
			{
				id: '1',
				name: 'Aqsa',
				avatar: { url: 'http://example.com/Aqsa.jpg' },
				department: { id: '1', name: 'Engineering' },
			},
			{
				id: '3',
				name: 'Sabi',
				avatar: { url: 'http://example.com/Sabi.jpg' },
				department: { id: '1', name: 'Engineering' },
			},
		])
	})

	test('should filter people by name, picture, and department', () => {
		const filteredDepartments: Department[] = [{ id: '1', name: 'Engineering' }]
		const result = filterPeople(allPeople, 'Sabi', true, filteredDepartments)
		expect(result).toEqual([
			{
				id: '3',
				name: 'Sabi',
				avatar: { url: 'http://example.com/Sabi.jpg' },
				department: { id: '1', name: 'Engineering' },
			},
		])
	})

	test('should return all people if no filters are applied', () => {
		const result = filterPeople(allPeople, '', false, [])
		expect(result).toEqual(allPeople)
	})
})

describe('findDepartments', () => {
	const departmentTree: DepartmentTree = [
		{
			id: '1',
			name: 'Engineering',
			parent: null,
			children: [
				{
					id: '2',
					name: 'Software',
					children: [],
					parent: null,
				},
				{
					id: '3',
					name: 'Hardware',
					children: [],
					parent: null,
				},
			],
		},
		{
			id: '4',
			name: 'Marketing',
			children: [],
			parent: null,
		},
	]

	test('should find the department by id', () => {
		const result = findDepartments(departmentTree, '2')
		expect(result).toEqual([
			{ id: '1', name: 'Engineering' },
			{ id: '2', name: 'Software' },
		])
	})

	test('should return an empty array if the department is not found', () => {
		const result = findDepartments(departmentTree, '5')
		expect(result).toEqual([])
	})

	test('should find the department and its parents', () => {
		const result = findDepartments(departmentTree, '3')
		expect(result).toEqual([
			{ id: '1', name: 'Engineering' },
			{ id: '3', name: 'Hardware' },
		])
	})

	test('should return the root department if it matches the id', () => {
		const result = findDepartments(departmentTree, '1')
		expect(result).toEqual([{ id: '1', name: 'Engineering' }])
	})

	test('should handle an empty department tree', () => {
		const result = findDepartments([], '1')
		expect(result).toEqual([])
	})
})

describe('findChildrenDepartments', () => {
	const departmentTree: DepartmentTree = [
		{
			id: '1',
			name: 'Engineering',
			parent: null,
			children: [
				{
					id: '2',
					name: 'Software',
					parent: { id: '1', name: 'Engineering' },
					children: [
						{
							id: '5',
							name: 'Frontend',
							parent: { id: '2', name: 'Software' },
							children: [],
						},
						{
							id: '6',
							name: 'Backend',
							parent: { id: '2', name: 'Software' },
							children: [],
						},
					],
				},
				{
					id: '3',
					name: 'Hardware',
					parent: { id: '1', name: 'Engineering' },
					children: [],
				},
			],
		},
		{
			id: '4',
			name: 'Marketing',
			parent: null,
			children: [],
		},
	]

	test('should find the department and its children by id', () => {
		const result = findChildrenDepartments(departmentTree, '2')
		expect(result).toEqual([
			{ id: '2', name: 'Software' },
			{ id: '5', name: 'Frontend' },
			{ id: '6', name: 'Backend' },
		])
	})

	test('should return an empty array if the department is not found', () => {
		const result = findChildrenDepartments(departmentTree, '7')
		expect(result).toEqual([])
	})

	test('should find the department and all its descendants', () => {
		const result = findChildrenDepartments(departmentTree, '1')
		expect(result).toEqual([
			{ id: '1', name: 'Engineering' },
			{ id: '2', name: 'Software' },
			{ id: '5', name: 'Frontend' },
			{ id: '6', name: 'Backend' },
			{ id: '3', name: 'Hardware' },
		])
	})

	test('should return the root department if it matches the id', () => {
		const result = findChildrenDepartments(departmentTree, '4')
		expect(result).toEqual([{ id: '4', name: 'Marketing' }])
	})

	test('should handle an empty department tree', () => {
		const result = findChildrenDepartments([], '1')
		expect(result).toEqual([])
	})
})
