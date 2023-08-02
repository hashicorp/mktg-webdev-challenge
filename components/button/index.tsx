// A basic button to serve as an example of a component
// and also to bring you from the instructions page to the template!

import { ReactNode } from 'react'
import s from './style.module.css'

export interface ButtonProps {
	href: string
	children: ReactNode
}

export default function Button({
	children,
	href,
}: ButtonProps): React.ReactElement {
	return (
		<a className={`button ${s.root}`} href={href}>
			{children}
		</a>
	)
}
