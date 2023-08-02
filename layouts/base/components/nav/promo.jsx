import React from 'react'
import Image from '@hashicorp/react-image'

export default function Promo({ theme, image, title, linkUrl, linkTitle }) {
	return (
		<a
			className={`promo theme-${theme}`}
			href={linkUrl}
			onClick={click.bind(null, { theme, image, title, linkUrl, linkTitle })}
		>
			{image && (
				<Image {...image} aspectRatio={[280, 151, 280]} steps={[560]} alt="" />
			)}
			<div className="content">
				<span className="title g-type-display-6">{title}</span>
				<span className="callout g-type-body-small-strong">{linkTitle}</span>
			</div>
		</a>
	)
}

// Call to Segment Analytics on cta click
function click({ theme, image, title, linkUrl, linkTitle }) {
	if (window && window.analytics) {
		window.analytics.track('Nav Promo', {
			theme: theme,
			imgSrc: image && image.url,
			imgAlt: image && image.alt,
			url: linkUrl,
			title: title,
			callout: linkTitle,
		})
	}
}
