import React, { useState, useEffect, useCallback } from 'react'
import { Model } from 'src/components/Three/Model'
import { Scene } from 'src/components/Three/Scene'
import { useScrollAnimation } from 'src/hooks/useScrollAnimation'

interface FeatureItem {
	id: number
	title: string
	description: string
	imageUrl: string
	animationStart: number
}

const sanitizeString = (str: string): string => {
	const temp = document.createElement('div')
	temp.textContent = str
	return temp.innerHTML
}

export const Features: React.FC = React.memo(() => {
	const [features, setFeatures] = useState<FeatureItem[]>([])
	const [error, setError] = useState<string | null>(null)
	const { scrollProgress } = useScrollAnimation()

	useEffect(() => {
		try {
			const initialFeatures: FeatureItem[] = [
				{
					id: 1,
					title: 'Goal Setting',
					description:
						'Set personalized fitness goals and track your progress towards a healthier lifestyle.',
					imageUrl: 'public/assets/goal.svg',
					animationStart: 0.2,
				},
				{
					id: 2,
					title: 'Progress Tracking',
					description:
						'Monitor your daily activity, workouts, and achievements with intuitive progress visualizations.',
					imageUrl: 'public/assets/progress.svg',
					animationStart: 0.5,
				},
				{
					id: 3,
					title: 'Social Sharing',
					description:
						'Share your fitness milestones and connect with friends to stay motivated and inspired.',
					imageUrl: 'public/assets/share.svg',
					animationStart: 0.8,
				},
			]
			setFeatures(initialFeatures)
		} catch (e: any) {
			setError(`Failed to load features: ${e.message}`)
		}
	}, [])

	const renderFeatureItem = useCallback(
		(feature: FeatureItem) => (
			<div
				key={feature.id}
				className={`md:grid md:grid-cols-2 md:gap-8 items-center py-8 ${
					scrollProgress >= feature.animationStart
						? 'transition-opacity duration-700 opacity-100'
						: 'opacity-0'
				}`}
			>
				<img
					src={feature.imageUrl}
					alt={feature.title}
					className="h-32 w-32 rounded-full object-cover shadow-md"
				/>
				<div className="text-center md:text-left">
					<h3 className="font-montserrat text-2xl font-bold text-primary mb-2">
						{sanitizeString(feature.title)}
					</h3>
					<p className="font-open-sans text-lg text-gray-700">
						{sanitizeString(feature.description)}
					</p>
				</div>
			</div>
		),
		[scrollProgress]
	)

	return (
		<section id="features" className="py-24 bg-secondary">
			<div className="mx-auto max-w-5xl px-4">
				{error && (
					<div className="text-red-500">
						Error: {sanitizeString(error)}
					</div>
				)}
				{features.map(renderFeatureItem)}
			</div>
		</section>
	)
})