import React from 'react'

const Search = () => {
	return (
		<div>
			<input type="search" name="filter" id="filter" />
			<div>
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
