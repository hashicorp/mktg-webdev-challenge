export interface DepartmentRecord {
	id: string
	name?: string
	children?: DepartmentRecord[]
	parent?: DepartmentRecord
}

export interface PersonRecord {
	id: string
	name?: string
	title?: string
	avatar?: {
		url: string
		alt?: string
	}
	department?: DepartmentRecord
}
