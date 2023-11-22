/* eslint-disable @next/next/no-img-element */
import React from 'react'
import classNames from 'classnames'
import style from './style.module.css'

const Card = () => {
	return (
		<div className={classNames(style.root)}>
			<div className={classNames(style.avatarWrapper)}>
				<img
					className={classNames(style.avatar)}
					src="/images/noAvatar.png"
					alt=""
				/>
			</div>
			<h2 className={classNames(style.name)}>Name</h2>
			<p className={classNames(style.info)}>Title</p>
			<p className={classNames(style.info)}>Department</p>
		</div>
	)
}

export default Card
