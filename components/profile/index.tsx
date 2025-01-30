/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { ReactElement } from 'react'
import Image from 'next/image'
import placeholderImage from './img/placeholder.svg'
import s from './style.module.css'

export interface ProfileProps {
	imgUrl?: string
	name: string
	title?: string
	department?: string
}

export default function Profile({
	imgUrl,
	name,
	title,
	department,
}: ProfileProps): ReactElement {
	return (
		<div className={s.card}>
			<Image
				priority
				className={s.avatar}
				src={imgUrl ? imgUrl : placeholderImage}
				alt={imgUrl ? `headshot of ${name}` : 'placeholder headshot'}
				width={104}
				height={106}
			/>
			<span className={s.heading}>{name}</span>
			{title ? <span className={s.subheading}>{title}</span> : null}
			{department ? <span className={s.department}>{department}</span> : null}
		</div>
	)
}
