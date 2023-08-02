import React from 'react'
import slugify from 'slugify'
import DropdownCarat from './icons/icon-dropdown'
import DropdownCaratMobile from './icons/icon-dropdown-mobile'
import Promo from './promo'

function NavItem({ active, handleActivate, children, promos, title }) {
	const slug = slugify(title, { lower: true })

	return (
		<li className={`nav-item ${slug}${active ? ' active' : ''}`}>
			<button
				type="button"
				className="link"
				onClick={() => handleActivate(slug)}
			>
				{title}
				<DropdownCarat />
				<DropdownCaratMobile />
			</button>
			<div className="panel">
				<div className="breadcrumb" onClick={() => handleActivate('mobile')}>
					<div className="g-grid-container">
						<DropdownCaratMobile />
						{title}
					</div>
				</div>
				<div className="g-grid-container">
					<div className="panel-content">{children}</div>
					{promos &&
						promos.map((promo) => <Promo key={promo.title} {...promo} />)}
				</div>
			</div>
		</li>
	)
}

export default NavItem
