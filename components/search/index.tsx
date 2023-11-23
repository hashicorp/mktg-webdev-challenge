import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'
import classNames from 'classnames'
import style from './style.module.css'

interface SearchProps {
	hidePeople: boolean
	nameFilter: string
	setHidePeople: Dispatch<SetStateAction<boolean>>
	setNameFilter: Dispatch<SetStateAction<string>>
}

const Search = ({
	hidePeople,
	nameFilter,
	setHidePeople,
	setNameFilter,
}: SearchProps) => {
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNameFilter(e.target.value)
	}

	const handleCheckbox = () => {
		setHidePeople((prev: boolean) => !prev)
	}

	console.log(hidePeople)
	return (
		<div className={classNames(style.root)}>
			<input
				className={classNames(style.input)}
				type="text"
				name="filter"
				id="filter"
				placeholder="Search people by name"
				value={nameFilter}
				onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
			/>
			<div className={classNames(style.checkboxContainer)}>
				{/* [] TODO: Style checkbox */}
				<input
					type="checkbox"
					name="missing-people"
					id="missing-people"
					placeholder="Search people by name"
					checked={hidePeople}
					onChange={handleCheckbox}
				/>
				<label className={classNames(style.label)} htmlFor="missing-people">
					Hide people missing a profile image
				</label>
			</div>
		</div>
	)
}

export default Search
