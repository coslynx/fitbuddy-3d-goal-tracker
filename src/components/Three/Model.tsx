import React, {
	useState,
	useEffect,
	useRef,
	useMemo,
	forwardRef,
	useCallback,
} from 'react'
import {
	useFrame,
	useLoader,
} from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader'
import { BasisTextureLoader } from 'three/examples/jsm/loaders/BasisTextureLoader'
import { MeshStandardMaterial } from 'three'
import { useScrollAnimation } from 'src/hooks/useScrollAnimation'
import { LOD } from '@react-three/drei'

interface ModelProps {
	scale?: number
	position?: [number, number, number]
}

export const Model: React.FC<ModelProps> = React.memo(
	({ scale = 1, position = [0, 0, 0] }) => {
		const [loading, setLoading] = useState(true)
		const [error, setError] = useState<Error | null>(null)
		const modelRef = useRef<THREE.Group>(null)
		const { scrollProgress } = useScrollAnimation()
		const VITE_THREE_MODEL_PATH =
			import.meta.env.VITE_THREE_MODEL_PATH || '/models/hero-model.glb'

		const gltf = useLoader(
			GLTFLoader,
			VITE_THREE_MODEL_PATH,
			(loader) => {
				const dracoLoader = new DRACOLoader()
				dracoLoader.setDecoderPath(
					'https://www.gstatic.com/draco/versioned/decoders/1.5.6/'
				)
				dracoLoader.preload()
				loader.setDRACOLoader(dracoLoader)

				const ktx2Loader = new KTX2Loader()
				ktx2Loader.setTranscoderPath(
					'https://unpkg.com/three@0.159.0/examples/js/libs/basis/'
				)
				ktx2Loader.detectSupport(
					new THREE.WebGLRenderer({
						canvas: document.createElement('canvas'),
					})
				)
				loader.setKTX2Loader(ktx2Loader)
			},
			(progress) => {
				// console.log('model loading ',{progress})
			},
			(error) => {
				console.error('model loading error', error)
				setError(error)
				setLoading(false)
			}
		)

		useEffect(() => {
			if (gltf) {
				if (modelRef.current) {
					// Dispose of the existing model
					modelRef.current.traverse((object: any) => {
						if (object.isMesh) {
							object.geometry.dispose()
							if (object.material.map) object.material.map.dispose()
							object.material.dispose()
						}
					})
				}

				modelRef.current = gltf.scene
				modelRef.current.scale.set(scale, scale, scale)
				modelRef.current.position.set(position[0], position[1], position[2])

				modelRef.current.traverse((object: any) => {
					object.frustumCulled = false
					if (object.isMesh) {
						object.castShadow = true
						object.receiveShadow = true
					}
				})

				setLoading(false)
			}
		}, [gltf, scale, position])

		useFrame(() => {
			if (modelRef.current) {
				modelRef.current.traverse((object: any) => {
					if (object.isMesh && object.material instanceof MeshStandardMaterial) {
						if (object.material.morphTargetInfluences) {
							object.material.morphTargetInfluences[0] =
								scrollProgress > 0 ? scrollProgress : 0
						}
					}
				})
			}
		})

		if (error) {
			console.error('Error loading model:', error)
			return (
				<mesh>
					<boxGeometry />
					<meshStandardMaterial color="red" />
				</mesh>
			)
		}

		if (!modelRef.current) {
			return null
		}

		return (
			<primitive
				object={modelRef.current}
				dispose={null}
				scale={scale}
				position={position}
			/>
		)
	},
	(prevProps, nextProps) => {
		return (
			prevProps.scale === nextProps.scale &&
			prevProps.position?.[0] === nextProps.position?.[0] &&
			prevProps.position?.[1] === nextProps.position?.[1] &&
			prevProps.position?.[2] === nextProps.position?.[2]
		)
	}
)