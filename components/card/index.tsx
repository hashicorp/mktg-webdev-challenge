/* eslint-disable @next/next/no-img-element */
import React from 'react'
import classNames from 'classnames'
import style from './style.module.css'

interface CardProps {
	avatarUrl?: string
	department: string
	name: string
	title: string
}

const Card = ({ avatarUrl, department, name, title }: CardProps) => {
	return (
		<div className={classNames(style.root)}>
			<div className={classNames(style.avatarWrapper)}>
				<img
					className={classNames(style.avatar)}
					src={`${avatarUrl ? avatarUrl : '/images/noAvatar.png'}`}
					alt=""
				/>
			</div>
			<h2 className={classNames(style.name)}>{name}</h2>
			<p className={classNames(style.info)}>{title}</p>
			<p className={classNames(style.info)}>{department}</p>
		</div>
	)
}

export default Card
