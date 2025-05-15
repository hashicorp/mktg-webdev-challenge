/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import React from 'react'
import styles from './style.module.css'
import Image from 'next/image'
import searchIcon from './img/search-icon.svg'

interface SearchProps {
	onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	onProfileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Search({
	onInputChange,
	onProfileChange,
}: SearchProps): React.ReactElement {
	return (
		<div className={styles.searchContainer}>
			<div className={styles.searchInputContainer}>
				<Image
					src={searchIcon}
					alt="Search"
					className={styles.searchIcon}
					width={20}
					height={20}
				/>
				<input
					type="text"
					placeholder="Search people by name"
					onChange={onInputChange}
					className={styles.searchInput}
				/>
			</div>
			<div className={styles.checkboxContainer}>
				<label className={styles.checkboxLabel}>
					<input
						type="checkbox"
						onChange={onProfileChange}
						className={styles.checkboxInput}
					/>
					<span className={styles.customCheckbox}></span>
					Hide people missing a profile image
				</label>
			</div>
		</div>
	)
}
