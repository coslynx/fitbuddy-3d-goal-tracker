import React from 'react'
import logo from 'public/assets/logo.svg'

interface CTAProps {
	heading: string
	description: string
	buttonText: string
	buttonLink: string
}

export const CTA: React.FC<CTAProps> = React.memo(({ heading, description, buttonText, buttonLink }) => {
	const isValidUrl = (url: string) => {
		try {
			new URL(url)
			return true
		} catch (e) {
			console.error('Invalid URL:', url)
			return false
		}
	}

	const isButtonLinkValid = isValidUrl(buttonLink)

	return (
		<section id="cta" className="bg-secondary py-12 text-center">
			<div className="mx-auto max-w-5xl px-4">
				<h1 className="font-montserrat text-4xl font-bold text-primary flex items-center justify-center gap-2">
					{heading}
					<img src={logo} alt="Logo" className="h-8 w-8" />
				</h1>
				<p className="mt-4 font-open-sans text-lg text-gray-700">{description}</p>
				{isButtonLinkValid ? (
					<a
						href={buttonLink}
						className="mt-8 inline-block rounded bg-primary px-8 py-3 font-montserrat text-lg font-bold text-secondary shadow-md transition-colors duration-300 hover:bg-accent"
						target="_blank"
						rel="noopener noreferrer"
					>
						{buttonText}
					</a>
				) : (
					<button
						className="mt-8 inline-block rounded bg-gray-500 px-8 py-3 font-montserrat text-lg font-bold text-gray-300 shadow-md cursor-not-allowed"
						disabled
					>
						{buttonText}
					</button>
				)}
			</div>
		</section>
	)
})