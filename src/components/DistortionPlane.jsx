import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { TextureLoader } from 'three'
import {fragment, vertex} from '../shaders/distortionShader'


function DistortionPlane({
  size = 4,
  segments = 64,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  intensity = 0.5,
  speed = 1.0,
  textureUrl = null, // URL текстуры
  textureIntensity = 0.5, // Интенсивность текстуры (0-1)
  autoRotate = true,
  ...props
}) {
  const meshRef = useRef()
  
  // Загружаем текстуру
  const texture = useLoader(
    TextureLoader, 
    textureUrl || '/textures/default.jpg' // Запасная текстура
  )
  
  // Настройки текстуры
  useEffect(() => {
    if (texture) {
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
    }
  }, [texture])
  
  // Создаем шейдерный материал
  const shaderMaterial = useMemo(() => {
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: intensity },
        uTexture: { value: texture },
        uSpeed: { value: speed },
        uWaveHeight: { value: 0.2 },
        uTextureIntensity: { value: textureIntensity }
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      side: THREE.DoubleSide,
      transparent: true
    })
    return material
  }, [intensity, speed, texture, textureIntensity])

  // Анимация
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material
      material.uniforms.uTime.value = state.clock.elapsedTime
      
      // Плавное изменение интенсивности
      const pulse = Math.sin(state.clock.elapsedTime * 0.5) * 0.5 + 0.5

    }
  })

  return (
    <mesh
      ref={meshRef}
      rotation={rotation}
      position={position}
      material={shaderMaterial}
      {...props}
    >
      <planeGeometry args={[size, size, segments, segments]} />
    </mesh>
  )
}

export default DistortionPlane