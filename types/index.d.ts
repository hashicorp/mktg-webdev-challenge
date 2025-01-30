/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export type DepartmentTree = DepartmentRecord[]

export interface Department {
	id: string
	name: string
}
export interface DepartmentNode extends Department {
	parent: Department | null
}

export interface DepartmentRecord extends DepartmentNode {
	children?: DepartmentRecord[]
}

export interface PersonRecord {
	id: string
	name?: string
	title?: string
	avatar?: {
		url: string
		alt?: string
	}
	department?: Department
}
