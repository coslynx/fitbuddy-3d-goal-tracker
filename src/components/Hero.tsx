import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Model } from 'src/components/Three/Model'
import { Scene } from 'src/components/Three/Scene'
import { useScrollAnimation } from 'src/hooks/useScrollAnimation'

interface HeroProps {
	appName: string
}

export const Hero: React.FC<HeroProps> = ({ appName }) => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)
	const [isVisible, setIsVisible] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)
	const { scrollProgress } = useScrollAnimation()

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true)
		}, 500)

		return () => clearTimeout(timer)
	}, [])

	useEffect(() => {
		if (scrollProgress > 0 && loading) {
			setLoading(false)
		}
	}, [scrollProgress, loading])

	return (
		<section
			id="hero"
			className={`relative bg-secondary py-24 transition-opacity duration-500 ${
				isVisible ? 'opacity-100' : 'opacity-0'
			}`}
			ref={containerRef}
		>
			<div className="absolute inset-0 h-full w-full">
				{error ? (
					<div className="flex h-full items-center justify-center text-red-500">
						Failed to load 3D model. Please try again later.
					</div>
				) : loading ? (
					<div className="flex h-full items-center justify-center">
						<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
					</div>
				) : (
					<Scene>
						<Model />
					</Scene>
				)}
			</div>

			<div className="relative mx-auto max-w-5xl px-4 py-16 text-center">
				<h1 className="font-montserrat text-5xl font-bold text-primary">{appName}</h1>
				<p className="mt-4 font-open-sans text-lg text-gray-700">
					Track your fitness goals and share progress updates with friends.
				</p>
				<a
					href="#"
					className="mt-8 inline-block rounded bg-primary px-8 py-3 font-montserrat text-lg font-bold text-secondary shadow-md transition-colors duration-300 hover:bg-accent"
				>
					Get Started
				</a>
			</div>
		</section>
	)
}