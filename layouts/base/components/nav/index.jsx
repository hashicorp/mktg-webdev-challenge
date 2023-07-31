import React, { useState, useEffect, useCallback } from 'react'
import Router from 'next/router'
import classNames from 'classnames'
import Link from 'next/link'
import LinkWrap from '@hashicorp/react-link-wrap'
import InlineSvg from '@hashicorp/react-inline-svg'
import LogoCorporate from '@hashicorp/mktg-logos/corporate/hashicorp/primary/black.svg?include'
import LogoCorporateMobile from '@hashicorp/mktg-logos/corporate/hashicorp/logomark/black.svg?include'
import LogoBoundary from '@hashicorp/mktg-logos/product/boundary/logomark/color.svg?include'
import LogoConsul from '@hashicorp/mktg-logos/product/consul/logomark/color.svg?include'
import LogoNomad from '@hashicorp/mktg-logos/product/nomad/logomark/color.svg?include'
import LogoPacker from '@hashicorp/mktg-logos/product/packer/logomark/color.svg?include'
import LogoTerraform from '@hashicorp/mktg-logos/product/terraform/logomark/color.svg?include'
import LogoVault from '@hashicorp/mktg-logos/product/vault/logomark/color.svg?include'
import LogoVagrant from '@hashicorp/mktg-logos/product/vagrant/logomark/color.svg?include'
import LogoWaypoint from '@hashicorp/mktg-logos/product/waypoint/logomark/color.svg?include'

import Arrow from './icons/icon-arrow'
import Close from './icons/icon-close'
import Hamburger from './icons/icon-hamburger'
import NavItem from './navItem'
import Image from '@hashicorp/react-image'
import fragment from './fragment.graphql'

function NavBadge({ children }) {
	const filled = ['New', 'Beta'].includes(children)
	return (
		<span className={classNames('badge', filled ? 'new' : null)}>
			{children}
		</span>
	)
}

const PRODUCT_LOGO_MAP = {
	Terraform: LogoTerraform,
	Packer: LogoPacker,
	Vault: LogoVault,
	Boundary: LogoBoundary,
	Consul: LogoConsul,
	Nomad: LogoNomad,
	Waypoint: LogoWaypoint,
	Vagrant: LogoVagrant,
	'Terraform Cloud': LogoTerraform,
}

function Nav({
	data: {
		infrastructureProducts,
		securityProducts,
		networkingProducts,
		applicationProducts,
		hcpDescription,
		hcpProducts,
		hcpCta,
		productsPromos,
		solutionsNav,
		solutionsPromos,
		companyNav,
		companyPromos,
		learnNav,
		learnPromos,
		supportNav,
		supportPromos,
	},
}) {
	const [activeDesktop, setActiveDesktop] = useState(false)
	const [activeMobile, setActiveMobile] = useState(false)
	const [activePanel, setActivePanel] = useState(null)

	// close all panels and hide background overlay
	const closePanels = useCallback(() => {
		setActiveDesktop(false)
		setActiveMobile(false)
		setActivePanel(null)
		document.body.classList.remove('g-noscroll')
	}, [])

	// activate a panel and show background overlay
	const activatePanel = (panel) => {
		if (activePanel === panel) {
			closePanels()
		} else {
			document.body.classList.add('g-noscroll')
			setActiveDesktop(!activeMobile)
			setActivePanel(panel)
		}
	}

	// activate mobile version
	const activateMobile = () => {
		if (activePanel) {
			closePanels()
		} else {
			document.body.classList.add('g-noscroll')
			setActiveDesktop(true)
			setActivePanel('mobile')
		}
	}

	// Clear state and `.g-noscroll` when changing from mobile/desktop.
	// We're just clearing state rather than trying to translate states
	// between mobile and desktop. This was also a request from design.
	const handleResize = () => {
		window.matchMedia('(min-width: 768px)').matches
			? activeMobile && closePanels()
			: activeDesktop && closePanels()
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	// after route change close all panels
	useEffect(() => {
		Router.events.on('routeChangeComplete', closePanels)
		Router.events.on('hashChangeComplete', closePanels)
		return () => {
			Router.events.off('routeChangeComplete', closePanels)
			Router.events.off('hashChangeComplete', closePanels)
		}
	}, [closePanels])

	// Redirect to the branding page when someone right-clicks on the
	// HashiCorp logo
	const logoOnContextMenu = (e) => {
		e.preventDefault()
		Router.push('https://www.hashicorp.com/brand')
	}

	return (
		<header className="g-nav g-type-body-strong">
			{activeDesktop || activeMobile ? (
				<div className="background" onClick={closePanels} />
			) : undefined}
			<nav className={`${activeDesktop || activeMobile ? 'active' : ''}`}>
				{/* Logos */}
				<Link
					href="/"
					onContextMenu={logoOnContextMenu}
					className="logo"
					title="HashiCorp"
				>
					<InlineSvg className="logo-desktop" src={LogoCorporate} />
					<InlineSvg className="logo-mobile" src={LogoCorporateMobile} />
				</Link>

				{/* Mobile Toggles */}
				<button
					type="button"
					className="mobile-toggle"
					onClick={activateMobile}
					aria-label={activeMobile ? 'Close Menu' : 'Open Menu'}
				>
					<Hamburger />
					<Close />
				</button>

				{/* Links */}
				<div className="links">
					<ul>
						<NavItem
							active={activePanel === 'products'}
							handleActivate={activatePanel}
							promos={productsPromos}
							title="Products"
						>
							<div className="column">
								<span className="eyebrow g-type-label-strong">
									Infrastructure
								</span>
								<ul className="product-list">
									{infrastructureProducts.map(({ url, product, badge }) => {
										return (
											<li key={url}>
												<Link href={url}>
													<InlineSvg
														className="product-logo"
														src={PRODUCT_LOGO_MAP[product]}
													/>
													{product}
													{badge ? <NavBadge>{badge}</NavBadge> : null}
												</Link>
											</li>
										)
									})}
								</ul>
								<span className="eyebrow g-type-label-strong">Networking</span>
								<ul className="product-list">
									{networkingProducts.map(({ url, product, badge }) => {
										return (
											<li key={url}>
												<Link href={url}>
													<InlineSvg
														className="product-logo"
														src={PRODUCT_LOGO_MAP[product]}
													/>
													{product}
													{badge ? <NavBadge>{badge}</NavBadge> : null}
												</Link>
											</li>
										)
									})}
								</ul>
							</div>
							<div className="column">
								<span className="eyebrow g-type-label-strong">Security</span>
								<ul className="product-list">
									{securityProducts.map(({ url, product, badge }) => {
										return (
											<li key={url}>
												<Link href={url}>
													<InlineSvg
														className="product-logo"
														src={PRODUCT_LOGO_MAP[product]}
													/>
													{product}
													{badge ? <NavBadge>{badge}</NavBadge> : null}
												</Link>
											</li>
										)
									})}
								</ul>
								<span className="eyebrow g-type-label-strong">
									Applications
								</span>
								<ul className="product-list">
									{applicationProducts.map(({ url, product, badge }) => {
										return (
											<li key={url}>
												<Link href={url}>
													<InlineSvg
														className="product-logo"
														src={PRODUCT_LOGO_MAP[product]}
													/>
													{product}
													{badge ? <NavBadge>{badge}</NavBadge> : null}
												</Link>
											</li>
										)
									})}
								</ul>
							</div>
							<div className="column divider hcp">
								<span className="eyebrow g-type-label-strong">
									HashiCorp Cloud Platform
								</span>
								{hcpDescription ? (
									<p className="hcp-blurb">{hcpDescription}</p>
								) : null}
								<ul className="product-list">
									{hcpProducts.map(({ url, product, badge }) => {
										return (
											<li key={url}>
												<Link href={url}>
													<InlineSvg
														className="product-logo"
														src={PRODUCT_LOGO_MAP[product]}
													/>
													{product}
													{badge ? <NavBadge>{badge}</NavBadge> : null}
												</Link>
											</li>
										)
									})}
								</ul>
								{hcpCta[0] ? (
									<div className="footer g-type-body-small-strong">
										<a href={hcpCta[0].url}>
											{hcpCta[0].title}
											<Arrow />
										</a>
									</div>
								) : null}
							</div>
						</NavItem>
						<NavItem
							active={activePanel === 'solutions'}
							handleActivate={activatePanel}
							promos={solutionsPromos}
							title="Solutions"
						>
							{solutionsNav.map((column, index) => {
								const cta = column.navCta[0]
								return (
									<div
										className={classNames(
											'column solutions',
											column.title ? '' : 'no-heading'
										)}
										// Index is stable
										// eslint-disable-next-line react/no-array-index-key
										key={index}
									>
										{column.title ? (
											<span className="eyebrow g-type-label-strong hidden-sm">
												{column.title}
											</span>
										) : null}
										<ul
											className={classNames(
												'product-list',
												column.navItems.length > 9 ? 'columns' : null
											)}
										>
											{column.navItems.map((item) => {
												return (
													<li key={item.url}>
														{item.external ? (
															<a
																href={item.url}
																rel="noopener noreferrer"
																target="_blank"
															>
																{item.title}
																{item.badge ? (
																	<NavBadge>{item.badge}</NavBadge>
																) : null}
															</a>
														) : (
															<LinkWrap
																Link={Link}
																href={item.url}
																className={
																	item.url === '/cloud-operating-model'
																		? 'highlight'
																		: null
																}
															>
																{item.title}
																{item.badge ? (
																	<NavBadge>{item.badge}</NavBadge>
																) : null}
															</LinkWrap>
														)}
													</li>
												)
											})}
										</ul>
										{cta ? (
											<div
												className={classNames(
													'footer g-type-body-small-strong',
													[
														cta.url === '/contact-sales'
															? 'contact-sales-link'
															: null,
													]
												)}
											>
												{cta.external ? (
													<a
														href={cta.url}
														rel="noopener noreferrer"
														target="_blank"
													>
														{cta.title}
														<Arrow />
													</a>
												) : (
													<LinkWrap href={cta.url}>
														{cta.title}
														<Arrow />
													</LinkWrap>
												)}
											</div>
										) : null}
									</div>
								)
							})}
						</NavItem>
						<NavItem
							active={activePanel === 'company'}
							handleActivate={activatePanel}
							promos={companyPromos}
							title="Company"
						>
							{companyNav.map((column, index) => {
								const cta = column.navCta[0]
								return (
									<div
										className={classNames(
											'column',
											column.title ? '' : 'no-heading'
										)}
										// Index is stable
										// eslint-disable-next-line react/no-array-index-key
										key={index}
									>
										{column.title ? (
											<span className="eyebrow g-type-label-strong hidden-sm">
												{column.title}
											</span>
										) : null}
										<ul
											className={classNames(
												'product-list',
												column.navItems.length > 9 ? 'columns' : null
											)}
										>
											{column.navItems.map((item) => {
												return (
													<li key={item.url}>
														{item.external ? (
															<a
																href={item.url}
																rel="noopener noreferrer"
																target="_blank"
															>
																{item.title}
																{item.badge ? (
																	<NavBadge>{item.badge}</NavBadge>
																) : null}
															</a>
														) : (
															<LinkWrap Link={Link} href={item.url}>
																{item.title}
																{item.badge ? (
																	<NavBadge>{item.badge}</NavBadge>
																) : null}
															</LinkWrap>
														)}
													</li>
												)
											})}
										</ul>
										{cta ? (
											<div
												className={classNames(
													'footer g-type-body-small-strong',
													[
														cta.url === '/contact-sales'
															? 'contact-sales-link'
															: null,
													]
												)}
											>
												{cta.external ? (
													<a
														href={cta.url}
														rel="noopener noreferrer"
														target="_blank"
													>
														{cta.title}
														<Arrow />
													</a>
												) : (
													<LinkWrap href={cta.url}>
														{cta.title}
														<Arrow />
													</LinkWrap>
												)}
											</div>
										) : null}
									</div>
								)
							})}
						</NavItem>
						<li className="nav-item">
							<Link href="/partners" className="link" id="ab_partners">
								Partners
							</Link>
						</li>
						<li className="nav-item">
							<Link href="/events?type=all" className="link" id="ab_events">
								Events
							</Link>
						</li>
					</ul>
					<ul>
						<NavItem
							active={activePanel === 'resources'}
							handleActivate={activatePanel}
							promos={learnPromos}
							title="Resources"
						>
							{learnNav.map((column, index) => {
								const cta = column.navCta[0]
								return (
									<div
										className={classNames(
											'column',
											column.title ? '' : 'no-heading'
										)}
										// Index is stable
										// eslint-disable-next-line react/no-array-index-key
										key={index}
									>
										{column.title ? (
											<span className="eyebrow g-type-label-strong hidden-sm">
												{column.title}
											</span>
										) : null}
										<ul
											className={classNames(
												'product-list',
												column.navItems.length > 9 ? 'columns' : null
											)}
										>
											{column.navItems.map((item) => {
												return (
													<li key={item.url}>
														{item.external ? (
															<a
																href={item.url}
																rel="noopener noreferrer"
																target="_blank"
															>
																{item.title}
																{item.badge ? (
																	<NavBadge>{item.badge}</NavBadge>
																) : null}
															</a>
														) : (
															<LinkWrap Link={Link} href={item.url}>
																{item.title}
																{item.badge ? (
																	<NavBadge>{item.badge}</NavBadge>
																) : null}
															</LinkWrap>
														)}
													</li>
												)
											})}
										</ul>
										{cta ? (
											<div
												className={classNames(
													'footer g-type-body-small-strong',
													[
														cta.url === '/contact-sales'
															? 'contact-sales-link'
															: null,
													]
												)}
											>
												{cta.external ? (
													<a
														href={cta.url}
														rel="noopener noreferrer"
														target="_blank"
													>
														{cta.title}
														<Arrow />
													</a>
												) : (
													<LinkWrap href={cta.url}>
														{cta.title}
														<Arrow />
													</LinkWrap>
												)}
											</div>
										) : null}
									</div>
								)
							})}
						</NavItem>
						<NavItem
							active={activePanel === 'success-and-support'}
							handleActivate={activatePanel}
							promos={supportPromos}
							title="Success &amp; Support"
						>
							{supportNav.map((column, index) => {
								const cta = column.navCta[0]
								return (
									<div
										className={classNames(
											'column',
											column.title ? '' : 'no-heading'
										)}
										// Index is stable
										// eslint-disable-next-line react/no-array-index-key
										key={index}
									>
										{column.title ? (
											<span className="eyebrow g-type-label-strong hidden-sm">
												{column.title}
											</span>
										) : null}
										<ul
											className={classNames(
												'product-list',
												column.navItems.length > 9 ? 'columns' : null
											)}
										>
											{column.navItems.map((item) => {
												return (
													<li key={item.url}>
														{item.external ? (
															<a
																href={item.url}
																rel="noopener noreferrer"
																target="_blank"
															>
																{item.title}
																{item.badge ? (
																	<NavBadge>{item.badge}</NavBadge>
																) : null}
															</a>
														) : (
															<LinkWrap Link={Link} href={item.url}>
																{item.title}
																{item.badge ? (
																	<NavBadge>{item.badge}</NavBadge>
																) : null}
															</LinkWrap>
														)}
													</li>
												)
											})}
										</ul>
										{cta ? (
											<div
												className={classNames(
													'footer g-type-body-small-strong',
													[
														cta.url === '/contact-sales'
															? 'contact-sales-link'
															: null,
													]
												)}
											>
												{cta.external ? (
													<a
														href={cta.url}
														rel="noopener noreferrer"
														target="_blank"
													>
														{cta.title}
														<Arrow />
													</a>
												) : (
													<LinkWrap href={cta.url}>
														{cta.title}
														<Arrow />
													</LinkWrap>
												)}
											</div>
										) : null}
									</div>
								)
							})}
						</NavItem>
						<li className="pricing">
							<a
								href="https://www.hashicorp.com/contact-sales"
								onClick={() => {
									if (window && window.analytics) {
										window.analytics.track('CTA Clicked', {
											name: 'Navigation Get Pricing',
											variant: 'Contact Sales',
										})
									}
								}}
							>
								Contact sales
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	)
}

Nav.fragmentSpec = { fragment, dependencies: [Image] }

export default Nav
