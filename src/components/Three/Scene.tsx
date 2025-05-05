import React, { useRef, useEffect } from 'react'
import {
	useFrame,
	Canvas,
	useThree,
	extend,
	JSX,
} from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useScrollAnimation } from 'src/hooks/useScrollAnimation'

extend({ OrbitControls })

interface SceneProps extends JSX.IntrinsicElements['scene'] {}

export const Scene: React.FC<SceneProps> = (props) => {
	const scene = useRef<THREE.Scene>(new THREE.Scene())
	const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
	const controls = useRef<OrbitControls | null>(null)
	const directionalLightRef = useRef<THREE.DirectionalLight | null>(null)

	const { scrollProgress } = useScrollAnimation()

	useEffect(() => {
		if (scene.current) {
			if (!cameraRef.current) {
				cameraRef.current = new THREE.PerspectiveCamera(
					60,
					window.innerWidth / window.innerHeight,
					0.1,
					100
				)
				cameraRef.current.position.set(0, 2, 5)
				scene.current.add(cameraRef.current)
			}

			if (cameraRef.current) {
				controls.current = new OrbitControls(
					cameraRef.current,
					document.body
				)
				controls.current.enableDamping = true
				controls.current.dampingFactor = 0.1
				controls.current.screenSpacePanning = false
				controls.current.minDistance = 2
				controls.current.maxDistance = 6
				controls.current.maxPolarAngle = Math.PI / 2
			}

			if (!directionalLightRef.current) {
				directionalLightRef.current = new THREE.DirectionalLight(
					'#ffffff',
					0.8
				)
				directionalLightRef.current.position.set(1, 1, 1)
				scene.current.add(directionalLightRef.current)
			}

			const ambientLight = new THREE.AmbientLight('#ffffff', 0.2)
			scene.current.add(ambientLight)

			const handleResize = () => {
				if (cameraRef.current) {
					cameraRef.current.aspect =
						window.innerWidth / window.innerHeight
					cameraRef.current.updateProjectionMatrix()
				}
			}

			window.addEventListener('resize', handleResize)

			return () => {
				window.removeEventListener('resize', handleResize)
				if (controls.current) {
					controls.current.dispose()
				}
			}
		}
	}, [])

	useFrame(() => {
		if (controls.current) {
			controls.current.update()
		}
	})

	return (
		<div className="relative w-full h-full">
			<Canvas
				shadows
				dpr={[1, 2]}
				gl={{ antialias: true }}
				camera={{
					fov: 60,
					position: [0, 2, 5],
				}}
			>
				<ambientLight intensity={0.2} color="#ffffff" />
				<directionalLight
					ref={directionalLightRef}
					intensity={0.8}
					color="#ffffff"
					position={[1, 1, 1]}
				/>
				<React.Suspense fallback={null}>{props.children}</React.Suspense>
			</Canvas>
		</div>
	)
}