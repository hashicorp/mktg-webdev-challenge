import React from 'react'
import classNames from 'classnames'
import style from './style.module.css'

interface HeaderProps {
	heading: string
	subheading: string
}

const Header = ({ heading, subheading }: HeaderProps) => {
	return (
		<div className={classNames(style.root)}>
			<h1 className={classNames(style.heading)}>{heading}</h1>
			<p className={classNames(style.subheading)}>{subheading}</p>
		</div>
	)
}

export default Header
