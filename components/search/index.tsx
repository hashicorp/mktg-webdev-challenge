import React from 'react'
import classNames from 'classnames'
import style from './style.module.css'

const Search = () => {
	return (
		<div className={classNames(style.root)}>
			<input
				className={classNames(style.input)}
				type="search"
				name="filter"
				id="filter"
			/>
			<div className={classNames(style.checkboxContainer)}>
				<input
					type="checkbox"
					name="missing-people"
					id="missing-people"
					placeholder="Search people by name"
				/>
				<label htmlFor="missing-people">
					Hide people missing a profile image
				</label>
			</div>
		</div>
	)
}

export default Search
