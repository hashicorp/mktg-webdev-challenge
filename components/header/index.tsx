import React from 'react'
import classNames from 'classnames'
import style from './style.module.css'

const Header = () => {
	return (
		<div className={classNames(style.root)}>
			<h1 className={classNames(style.heading)}>HashiCorp Humans</h1>
			<p className={classNames(style.subheading)}>Find a HashiCorp human</p>
		</div>
	)
}

export default Header
