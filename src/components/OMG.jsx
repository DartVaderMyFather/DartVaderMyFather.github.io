// Исправленный OMG.jsx
import React, { useRef } from 'react';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';

function Model({ url,color = "white" }) {
  const { scene } = useGLTF(url);
  const meshRef = useRef();

  // Используем useFrame вместо useEffect для анимации
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;      
    }
  });

  // Обходим все материалы модели и делаем их зеркальными
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.metalness = 0;    // Полная металличность
      child.material.roughness = 0;    // Низкая шероховатость = зеркало
      child.material.envMapIntensity = 1; // Интенсивность отражения окружения
      child.material.color.set(color);
    }
  });

  return <primitive ref={meshRef} object={scene} scale={2} />;
}

// Предзагруженная модель
useGLTF.preload('/models/OMG.gltf');



export function OMGScene() {
  return (
    <Canvas 
      style={{ justifySelf:'center', width:'100%', height: '500px', }}
      camera={{ position: [30, 90, 30], fov: 2 }}
    >
      <ambientLight intensity={0} />
      <directionalLight position={[90, -180, 90]} intensity={6} color={'deepskyblue'}/>
      <directionalLight position={[-190, 180, -180]} intensity={6} color={'deeppink'}/>      
      <Model url="/models/OMG.gltf" />      
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}

export default OMGScene;