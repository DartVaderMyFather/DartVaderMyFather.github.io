// ShaderCanvas.jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ShaderCanvas = ({ shaderCode, uniforms = {} }) => {
  const canvasRef = useRef(null);
  const mountRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Основные переменные
    let scene, camera, renderer, material, geometry, mesh;
    let animationFrameId;

    // Инициализация Three.js
    const init = () => {
      // Создаем сцену
      scene = new THREE.Scene();

      // Создаем камеру
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      // Создаем рендерер
      renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.current,
        antialias: true,
        alpha: true 
      });
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );

      // Адаптируем шейдерный код из Shadertoy
      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      // Преобразуем шейдерный код Shadertoy в формат Three.js
      const fragmentShader = `
        uniform float iTime;
        uniform vec3 iResolution;
        uniform vec4 iMouse;
        
        ${shaderCode}
        
        void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
        }
      `;

      // Создаем материал с шейдером
      material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          iTime: { value: 0 },
          iResolution: { 
            value: new THREE.Vector3(
              mountRef.current.clientWidth,
              mountRef.current.clientHeight,
              1
            )
          },
          iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
          ...uniforms
        }
      });

      // Создаем геометрию (полноэкранный квад)
      geometry = new THREE.PlaneGeometry(2, 2);
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    };

    // Анимация
    const animate = (time) => {
      animationFrameId = requestAnimationFrame(animate);
      
      if (material && material.uniforms.iTime) {
        material.uniforms.iTime.value = time * 0.001;
      }
      
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };

    // Обработчик изменения размера
    const handleResize = () => {
      if (!mountRef.current || !renderer) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      renderer.setSize(width, height);
      
      if (material && material.uniforms.iResolution) {
        material.uniforms.iResolution.value.set(width, height, 1);
      }
    };

    // Обработчик мыши
    const handleMouseMove = (e) => {
      if (!mountRef.current || !material || !material.uniforms.iMouse) return;
      
      const rect = mountRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      material.uniforms.iMouse.value.set(x, rect.height - y, 0, 0);
    };

    const handleMouseDown = (e) => {
      if (!mountRef.current || !material || !material.uniforms.iMouse) return;
      
      const rect = mountRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      material.uniforms.iMouse.value.set(
        material.uniforms.iMouse.value.x,
        material.uniforms.iMouse.value.y,
        x,
        rect.height - y
      );
    };

    // Инициализация
    init();
    animate(0);
    window.addEventListener('resize', handleResize);
    
    const canvas = mountRef.current;
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);

    // Очистка
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (renderer) renderer.dispose();
    };
  }, [shaderCode, uniforms]);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        position: 'relative'
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ShaderCanvas;