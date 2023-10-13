import React from 'react'
import s from './style.module.css'
import { DepartmentRecord } from 'types'
import CloseCaret from './img/close-caret'
import OpenCaret from './img/open-caret'

export interface CaretProps {
	allDepartments: DepartmentRecord[]
	department: DepartmentRecord
	subDepartments: DepartmentRecord[]
	isChild: boolean
	selectedDept: string[]
	handleDepartmentClick: (DepartmentRecord) => void
}

export default function Caret({
	allDepartments,
	department,
	subDepartments,
	isChild,
	selectedDept,
	handleDepartmentClick,
}: CaretProps): React.ReactElement {
	const [isExpanded, setIsExpanded] = React.useState(false)
	const hasChildren = subDepartments.length > 0
	const onCaretClick = () => {
		if (!hasChildren) {
			return
		}
		setIsExpanded(!isExpanded)
	}
	const onDepartmentClick = () => {
		handleDepartmentClick(department)
	}
	const isSelected = selectedDept?.includes(department.id)

	// if has children or is top level parent, display a closed caret;
	// if child and has no children, display no caret.
	// if isExpanded is true, display open caret & children
	return (
		<span className={`${s.root}`}>
			{(hasChildren || !isChild) && (
				<button onClick={onCaretClick}>
					{isExpanded ? <OpenCaret /> : <CloseCaret />}
				</button>
			)}
			<button
				onClick={onDepartmentClick}
				className={isSelected ? `${s.selected}` : ''}
			>
				{department.name}
			</button>
			<ul>
				{isExpanded &&
					subDepartments.map((child: DepartmentRecord) => (
						<li key={child.id}>
							<Caret
								department={child}
								subDepartments={allDepartments.filter(
									(dept: DepartmentRecord) => dept.parent?.id === child.id
								)}
								key={child.id}
								isChild={true}
								allDepartments={allDepartments}
								handleDepartmentClick={handleDepartmentClick}
								selectedDept={selectedDept}
							/>
						</li>
					))}
			</ul>
		</span>
	)
}
