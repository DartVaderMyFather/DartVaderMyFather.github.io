import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import {fragment, vertex} from '../shaders/shadertoyShader_space01'


function ShadertoyPlane_space01({
  size = 4,
  segments = 4,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  ...props
}) {
  const meshRef = useRef()
  const clockRef = useRef(new THREE.Clock())
  const { viewport } = useThree() 
  
  // Создаем шейдерный материал
  const shaderMaterial = useMemo(() => {
    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0.0 }, // Начинаем с 0
        iResolution: { value: new THREE.Vector2(1, 1) },
        iTimeDelta: { value: 0.0 },
        iFrameRate: { value: 30 },
        iFrame: { value: 0 },  
        iChannelTime: { value: [0, 0, 0, 0] },
        iChannelResolution: { value: [new THREE.Vector2(1, 1), new THREE.Vector2(1, 1), new THREE.Vector2(1, 1), new THREE.Vector2(1, 1)] },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      wireframe: false,
    })

    
    return material    
  })

  // Обновляем iTime каждый кадр
  useFrame((state, delta) => {
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material
      
      // Обновляем время
      material.uniforms.iTime.value = clockRef.current.getElapsedTime()
      
      // Обновляем iTimeDelta
      material.uniforms.iTimeDelta.value = delta
      
      // Обновляем iFrame (кадры)
      material.uniforms.iFrame.value += 1
      
      // Обновляем iResolution с учетом viewport
      material.uniforms.iResolution.value.set(
        viewport.width * size,
        viewport.height * size
      )
    }
  })

  // Обновляем iResolution при изменении размеров
  useEffect(() => {
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material
      material.uniforms.iResolution.value.set(
        viewport.width * size,
        viewport.height * size
      )
    }
  }, [viewport.width, viewport.height, size])


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


export default ShadertoyPlane_space01