import React, { ReactNode } from 'react'
import classNames from 'classnames'
import style from './style.module.css'

interface HeaderProps {
	heading: string
	subheading: string
	children?: ReactNode
}

const Header = ({ heading, subheading, children }: HeaderProps) => {
	return (
		<div className={classNames(style.root)}>
			<h1 className={classNames(style.heading)}>{heading}</h1>
			<p className={classNames(style.subheading)}>{subheading}</p>
			{children}
		</div>
	)
}

export default Header
