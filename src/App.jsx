import { useState } from 'react'
import './App.css'
import React, { Suspense } from 'react'
import Lazy3DPreview from './components/Lazy3DPreview';
import OMGScene from './components/OMG'
import './styles/fonts.css'
import DistortionScene from './components/DistortionScene'// Импортируем наши компоненты
import ShadertoyScene from './components/ShadertoyScene'
import ShadertoyScene_space01 from './components/ShadertoyScene_space01'
import { SplitText } from './components/SplitText/SplitText';




function App() {  
  
  // Переменные для слайдеров карточка 2
  const [colorValue, setColorValue] = useState(0);
  const [scaleValue, setScaleValue] = useState(1);

  // Задайте любые два цвета здесь!
  const color1 = { r: 145, g: 0, b: 200 };
  const color2 = { r: 127, g: 255, b: 212 };

  // Интерполяция
  const r = Math.round(color1.r + (color2.r - color1.r) * colorValue);
  const g = Math.round(color1.g + (color2.g - color1.g) * colorValue);
  const b = Math.round(color1.b + (color2.b - color1.b) * colorValue);

  

  return (
    <>
      <div>
        <p>Web React JSX frontend Motion Graphics Artem Grechko 2026</p>
      </div> 


<div className='wrapper'>

{/* Карточка 1 - ShaderToy Shader */}
      <div className="card">        
        <h2>GSLS Shader N-01</h2>
        {/* Используем наш компонент с дисторшн-эффектом */}
        <Lazy3DPreview previewSrc="/previews/shader01.jpg">
          <ShadertoyScene_space01 />
        </Lazy3DPreview>
        <p className="text">
          Импорт шейдера GSLS (Fiber/Drei)
        </p>
      </div>    

{/* Карточка 2 - ShaderToy Shader */}
      <div className="card">        
        <h2>GSLS Shader N-02</h2>
        {/* Используем наш компонент с дисторшн-эффектом */}
        <Lazy3DPreview previewSrc="/previews/shader02.jpg">
          <ShadertoyScene/>
        </Lazy3DPreview>
        <p className="text">
          Импорт шейдера GSLS (Fiber/Drei)
        </p>
      </div>    

{/* Карточка 3 - Distortion Shader */}
      <div className="card">        
        <h2>Distortion Shader</h2>
        {/* Используем наш компонент с дисторшн-эффектом */}
        <DistortionScene/>
        <p className="text">
          Интерактивный дисторшн-эффект<br/>
          с использованием GLSL шейдеров.         
        </p>
      </div>
      

{/* Карточка 4 - 3D модель */}
      <div className="card">
        <h2>3D Model Viewer</h2>
        <div style={{ 
          /*overflow: 'hidden',*/
          background: 'transparent',
          alignItems: 'center',
          minWidth: '100%',
          minHeight: '100%'
        }}>
          <Suspense fallback={<div>Loading 3D model...</div>}>
            <Lazy3DPreview previewSrc="/previews/shader03.jpg">
          <OMGScene/>
        </Lazy3DPreview>
          </Suspense>
       
        <p className="text">
          Вау какая 3D моделечка крутится! Красивое
        </p>
      </div></div>

{/* Карточка 5 - TEXT MOTION */}
      <div className="card">        
        <h2>CSS Dynamic Font<br/> Animation</h2>

          {/*<h2 className="text-path">Тронь</h2>
          <h2 className="text-path2">буковки</h2>*/}
          <p className="text">
          Анимации Fade-in/Cycle/Fade-out. <br/>
          Наведись на MOTION буквы....
           </p>            
         
          <div className="wave-text">
            <span className="letter">M</span>
            <span className="letter">O</span>
            <span className="letter">T</span>
            <span className="letter">I</span>
            <span className="letter">O</span>
            <span className="letter">N</span>
        </div>       

        
        <div style={{
          textAlign: 'center',
          fontSize: '350%',
          margin: '0%',
          transformOrigin: 'center center',
        }}>
                  <div className="variable">
          <span className="work">BOLD</span>WIDE
        </div>   
        </div>
                <p className="textanimated">
          HELLO WORLD
        </p>         
      </div>

{/*Карточка 7 - SplitText*/}
      <div className="card">

         <div>
      <h2>Java Text Animation N-01<br/>
      SplitText</h2>

      <p className="text">
          Определяем входящий текст как отдельные символы и буквы. 
          После анимируем через пресеты заводим как стили. 
          Тайминги можно настраивать отдельно.
      </p>  

      <SplitText
          preset="rotateIn"
          paramsAnimate={{
            duration: 0.1,
            stagger: 0.01,
            delay: 0.0,
            direction: 'forward',
            easing: 'ease-out'
          }}
          paramsFinal={{
            duration: 0.1,
            stagger: 0.01,
            delay: 0.0,
            direction: 'reverse',
            easing: 'ease-in'
          }}
          trigger="hover"
          splitBy="char"
          style={{ fontSize: '200%', margin: '10%', cursor: 'pointer'}}
        >
        Анимация rotateIn
      </SplitText>

      <SplitText
          preset="colorFadeWithFinal"
          paramsAnimate={{
            duration: 0.2,
            stagger: 0.1,
            delay: 0.0,
            direction: 'forward',
            easing: 'ease-out'
          }}
          paramsFinal={{
            duration: 0.2,
            stagger: 0.1,
            delay: 0.0,
            direction: 'reverse',
            easing: 'ease-in'
          }}
          trigger="hover"
          splitBy="char"
          style={{ fontSize: '200%', margin: '10%', cursor: 'pointer'}}
        >
        Анимация colorFade
      </SplitText>

      <SplitText
          preset="randomDrift"
          paramsAnimate={{ duration: 0.3, stagger: 0.01, delay: 0.0, direction: 'forward',}}
          hoverOutParams={{ duration: 0.3, stagger: 0.01, delay: 0.0, direction: 'reverse', easing: 'ease-in' }}

          trigger="hover"
          splitBy="char"
          style={{ fontSize: '200%', margin: '10%', cursor: 'pointer'}}
        >
        Анимация randomDrift
      </SplitText>


      <SplitText
          preset="customWave"
          paramsAnimate={{ duration: 0.5, stagger: 0.01, delay: 0.0, direction: 'forward',}}
          hoverOutParams={{ duration: 0.5, stagger: 0.01, delay: 0.0, direction: 'reverse', easing: 'ease-in' }}

          trigger="hover"
          splitBy="char" 
          style={{ fontSize: '200%', margin: '10%', cursor: 'pointer'}}
        >
        Анимация customWave
      </SplitText>
    </div>

         </div>


      </div>

      {/* Футер */}
      <p className="read-the-docs">
        Это тестовая страница для Web элементов на React.
      </p>
    </>
  )
}

export default App