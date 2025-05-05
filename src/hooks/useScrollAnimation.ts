import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { debounce } from 'lodash'

export const useScrollAnimation = () => {
	const [scrollProgress, setScrollProgress] = useState<number>(0)
	const { camera } = useThree()

	const interpolate = useCallback(
		(
			scroll: number,
			keyframes: number[],
			values: number[] | [number, number, number][] | number[][]
		) => {
			if (
				!Array.isArray(keyframes) ||
				!Array.isArray(values) ||
				keyframes.length !== values.length ||
				keyframes.some((keyframe) => typeof keyframe !== 'number')
			) {
				throw new Error(
					'Invalid input: keyframes and values must be arrays of the same length, containing only numbers.'
				)
			}

			if (keyframes.length === 0) {
				return values[0]
			}

			const clampedScroll = Math.max(
				keyframes[0],
				Math.min(scroll, keyframes[keyframes.length - 1])
			)

			let i = 0
			for (; i < keyframes.length - 1; i++) {
				if (clampedScroll <= keyframes[i + 1]) {
					break
				}
			}

			const scrollSection =
				(clampedScroll - keyframes[i]) / (keyframes[i + 1] - keyframes[i])

			if (typeof values[0] === 'number') {
				return THREE.MathUtils.lerp(
					values[i] as number,
					values[i + 1] as number,
					scrollSection
				)
			} else if (Array.isArray(values[0])) {
				const result = []
				for (let j = 0; j < (values[0] as number[]).length; j++) {
					result.push(
						THREE.MathUtils.lerp(
							(values[i] as number[])[j],
							(values[i + 1] as number[])[j],
							scrollSection
						)
					)
				}
				return result
			}

			return values[i]
		},
		[]
	)

	useEffect(() => {
		const handleScroll = () => {
			try {
				const calculatedScrollProgress =
					window.scrollY /
					(document.documentElement.scrollHeight -
						document.documentElement.clientHeight)

				const normalizedScrollProgress = Math.max(
					0,
					Math.min(1, calculatedScrollProgress)
				)

				setScrollProgress(normalizedScrollProgress)
			} catch (error: any) {
				console.error('Error handling scroll:', error.message)
			}
		}

		const debouncedHandleScroll = debounce(handleScroll, 50)

		window.addEventListener('scroll', debouncedHandleScroll)

		return () => {
			window.removeEventListener('scroll', debouncedHandleScroll)
		}
	}, [])

	const animationValues = useMemo(() => {
		return {
			morphTargetInfluence: interpolate(
				scrollProgress,
				[0, 0.5, 1],
				[0, 0.75, 1]
			) as number,
			cameraPosition: interpolate(
				scrollProgress,
				[0, 1],
				[
					[0, 5, 10],
					[0, 10, 20],
				]
			) as [number, number, number],
			rotation: interpolate(
				scrollProgress,
				[0, 1],
				[0, Math.PI * 2]
			) as number,
		}
	}, [scrollProgress, interpolate])

	return animationValues
}