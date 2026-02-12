import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import DistortionPlane from './DistortionPlane'

// Примеры текстур (можно использовать любые URL)
const TEXTURES = [
  { name: 'Ушастик', url: '/textures/space.jpg' },
  { name: 'Прорицатель', url: '/textures/fire.jpg' },
  { name: 'Булочка', url: '/textures/water.jpg' },
  { name: 'DebugTexture', url: '/textures/debugtexture.jpg' },
  { name: 'txtKotiki', url: '/textures/txtKotiki.jpg' },
  { name: 'txtKotiki_2', url: '/textures/txtKotiki_2.jpg' }

]

function DistortionScene() {
  const [intensity, setIntensity] = useState(0.5)
  const [speed, setSpeed] = useState(1.0)
  const [size, setSize] = useState(3)
  const [textureIntensity, setTextureIntensity] = useState(0.5)
  const [selectedTexture, setSelectedTexture] = useState(0)
  
  return (
    <div style={{ justifySelf:'center', width:'100%', height: '500px', }}>
      <Canvas>
        <DistortionPlane 
          size={10}
          intensity={intensity}
          speed={speed}
          textureUrl={TEXTURES[selectedTexture].url}
          textureIntensity={textureIntensity}
          rotation={[0, 0, 0]}
        />
        
        <ambientLight intensity={1} />
        
      </Canvas>
      
      {/* Панель управления */}
      <div style={{
        justifySelf:'center',
        bottom: '5%',       
        translate: '0% -120%',
        background: 'rgba(31, 31, 31, 0.85)',
        padding: '15px',
        borderRadius: '10px',
        display:'flex',
        flexWrap:'wrap',
        gap: '0px',
        alignItems: 'center',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        maxWidth: '100%',
        zIndex: 100
      }}>
        {/* Выбор текстуры */}
        <div>
          <label style={{ color: 'white', fontSize: '12px', display: 'block', marginBottom: '5px' }}>
            Котик Милашка
          </label>
          <select
            value={selectedTexture}
            onChange={(e) => setSelectedTexture(parseInt(e.target.value))}
            style={{
              background: '#333',
              color: 'white',
              border: '1px solid #555',
              borderRadius: '5px',
              padding: '5px 10px',
              fontSize: '12px'
            }}
          >
            {TEXTURES.map((tex, idx) => (
              <option key={idx} value={idx}>
                {tex.name}
              </option>
            ))}
          </select>
        </div>
        
        
        {/* Интенсивность дисторшна */}
        <div>
          <label style={{ color: 'white', fontSize: '12px', display: 'block', marginBottom: '5px' }}>
            Дисторшн: {intensity.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={intensity}
            onChange={(e) => setIntensity(parseFloat(e.target.value))}
            style={{ width: '100px' }}
          />
        </div>
        
        {/* Скорость */}
        <div>
          <label style={{ color: 'white', fontSize: '12px', display: 'block', marginBottom: '5px' }}>
            Скорость: {speed.toFixed(2)}
          </label>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            style={{ width: '100px' }}
          />
        </div>
        
        
      </div>
    </div>
  )
}

export default DistortionScene