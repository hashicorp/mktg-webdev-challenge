/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import React from 'react'

export default function HamburgerIcon() {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M21 17H3C2.447 17 2 17.448 2 18C2 18.552 2.447 19 3 19H21C21.553 19 22 18.552 22 18C22 17.448 21.553 17 21 17ZM21 5H3C2.447 5 2 5.448 2 6C2 6.552 2.447 7 3 7H21C21.553 7 22 6.552 22 6C22 5.448 21.553 5 21 5ZM22 12C22 12.552 21.553 13 21 13H3C2.447 13 2 12.552 2 12C2 11.448 2.447 11 3 11H21C21.553 11 22 11.448 22 12Z"
				fill="#000"
			/>
			<mask
				id="mask0"
				maskUnits="userSpaceOnUse"
				x="2"
				y="5"
				width="20"
				height="14"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M21 17H3C2.447 17 2 17.448 2 18C2 18.552 2.447 19 3 19H21C21.553 19 22 18.552 22 18C22 17.448 21.553 17 21 17ZM21 5H3C2.447 5 2 5.448 2 6C2 6.552 2.447 7 3 7H21C21.553 7 22 6.552 22 6C22 5.448 21.553 5 21 5ZM22 12C22 12.552 21.553 13 21 13H3C2.447 13 2 12.552 2 12C2 11.448 2.447 11 3 11H21C21.553 11 22 11.448 22 12Z"
					fill="#000"
				/>
			</mask>
			<g mask="url(#mask0)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M0 0H24V24H0V0Z"
					fill="#000"
				/>
			</g>
		</svg>
	)
}
