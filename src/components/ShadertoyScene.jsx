import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import ShadertoyPlane from './ShadertoyPlane.jsx'



function ShadertoyScene() {

  const [size, setSize] = useState(3)

  
  return (
    <div style={{justifySelf:'anchor-center', width:'100%', height: '500px', }}>
      <Canvas>
        <ShadertoyPlane 
          size={8}
          rotation={[0, 0, 0]}
        />        
        <ambientLight intensity={1} />        
      </Canvas>    
    </div>
  )
}

export default ShadertoyScene