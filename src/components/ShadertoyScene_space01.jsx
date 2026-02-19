import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import ShadertoyPlane_space01 from './ShadertoyPlane_space01.jsx'



function ShadertoyScene_space01() {

  const [size, setSize] = useState(3)

  
  return (
    <div >
      <Canvas style={{ width: '100%', aspectRatio:'1/1' }}>
        <ShadertoyPlane_space01 
          size={10}
          rotation={[0, 0, 0]}
        />        
        <ambientLight intensity={1} />        
      </Canvas>    
    </div>
  )
}

export default ShadertoyScene_space01