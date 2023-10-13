import s from './style.module.css'
import { PersonRecord } from 'types'
import noAvatarDefault from './img/no-avatar.svg'

export interface personCardProps {
	person: PersonRecord
}

export default function PersonCard({
	person,
}: personCardProps): React.ReactElement {
	const imageSrc = person.avatar === null ? noAvatarDefault : person.avatar.url

	return (
		<div className={`${s.root}`}>
			<img src={imageSrc} />
			<h3>{person.name}</h3>
			<p>{person.title}</p>
			<p>{person.department?.name}</p>
		</div>
	)
}
