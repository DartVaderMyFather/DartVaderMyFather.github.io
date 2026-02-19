// components/Shaders.jsx
import React, { Suspense } from 'react';
import Lazy3DPreview from '../Lazy3DPreview';
import OMGScene from '../OMG';
import DistortionScene from '../DistortionScene';
import ShadertoyScene from '../ShadertoyScene';
import ShadertoyScene_space01 from '../ShadertoyScene_space01';
import { SplitText } from '../SplitText/SplitText';

const Shaders = () => {
  return (
    <div className='wrapper'>
      {/* Карточка 1 - ShaderToy Shader */}
      <div className="cardShader">
        <h2>GSLS Shader N-01</h2>
        <Lazy3DPreview previewSrc="/previews/shader01.jpg">
          <ShadertoyScene_space01 />
        </Lazy3DPreview>
        <p className="text">Импорт шейдера GSLS (Fiber/Drei)</p>
      </div>

      {/* Карточка 2 - ShaderToy Shader */}
      <div className="cardShader">
        <h2>GSLS Shader N-02</h2>
        <Lazy3DPreview previewSrc="/previews/shader02.jpg">
          <ShadertoyScene />
        </Lazy3DPreview>
        <p className="text">Импорт шейдера GSLS (Fiber/Drei)</p>
      </div>

      {/* Карточка 3 - Distortion Shader */}
      <div className="cardShader">
        <h2>Distortion Shader</h2>
        <DistortionScene />
        <p className="text">
          Интерактивный дисторшн-эффект<br />
          с использованием GLSL шейдеров.
        </p>
      </div>

      {/* Карточка 4 - 3D модель */}
      <div className="cardShader">
        <h2>3D Model Viewer</h2>
        <div style={{ background: 'transparent', alignItems: 'center', minWidth: '100%', minHeight: '100%' }}>
          <Suspense fallback={<div>Loading 3D model...</div>}>
            <Lazy3DPreview previewSrc="/previews/shader03.jpg">
              <OMGScene />
            </Lazy3DPreview>
          </Suspense>
          <p className="text">Вау какая 3D моделечка крутится! Красивое</p>
        </div>
      </div>    
      
    </div>
  );
};

export default Shaders;