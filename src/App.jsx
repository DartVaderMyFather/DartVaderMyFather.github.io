import { useState } from 'react'
import './App.css'
import React, { Suspense } from 'react'
import OMGScene from './components/OMG'
import './styles/fonts.css'
import DistortionScene from './components/DistortionScene'// Импортируем наши компоненты
import ShadertoyScene from './components/ShadertoyScene'
import ShadertoyScene_space01 from './components/ShadertoyScene_space01'




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
        {/*<img src={fire} width={200} alt="Fire effect" />*/}  
        <h1>Web React JSX frontend Motion Graphics Artem Grechko 2026</h1>
      </div> 


<div className='wrapper'>

{/* Карточка 1 - ShaderToy Shader */}
      <div className="card">        
        <h2>GSLS Shader N-01</h2>
        {/* Используем наш компонент с дисторшн-эффектом */}
        <div>
        <ShadertoyScene_space01/>
          </div>
        <p className="text">
          Импорт шейдера GSLS (Fiber/Drei)
        </p>
      </div>    

{/* Карточка 2 - ShaderToy Shader */}
      <div className="card">        
        <h2>GSLS Shader N-02</h2>
        {/* Используем наш компонент с дисторшн-эффектом */}
        <ShadertoyScene/>
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
            <OMGScene  />
          </Suspense>
       
        <p className="text">
          Вау какая 3D моделечка крутится! Красивое
        </p>
      </div></div>

{/* Карточка 4 - TEXT MOTION */}
      <div className="card">        
        <h2>CSS Dynamic Font Animation</h2>

          {/*<h2 className="text-path">Тронь</h2>
          <h2 className="text-path2">буковки</h2>*/}
          <p className="text">
          Анимации Fade-in/Cycle/Fade-out. <br/>
          Наведись на MOTION буквы....
           </p>            
         
          <div class="wave-text">
            <span class="letter">M</span>
            <span class="letter">O</span>
            <span class="letter">T</span>
            <span class="letter">I</span>
            <span class="letter">O</span>
            <span class="letter">N</span>
        </div>       

        
        <div style={{
          textAlign: 'center',
          fontSize: '5em',
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

{/*Карточка 4 - Text Changer*/}
      <div className="card">        
        <h2>Text Changer</h2>
              {/* Панель слайдеров */}
      <div style={{ 
        backgroundColor: 'transparent',
        padding: '20px',
        borderRadius: '0px',
        marginBottom: '10px'
      }}>
        {/* Слайдер для цвета */}
        <div style={{ marginInline: '30%',marginBottom:'5%' }}>
          <label className='slFont'>
            <strong className='color01'>Color:</strong> {colorValue.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={colorValue}
            onChange={(e) => setColorValue(parseFloat(e.target.value))}
            style={{ 
              width: '100%',
              height: '3px',
              cursor: 'pointer',
              borderRadius: '100%',
              background: 'linear-gradient(to right, #9400D3, #7FFFD4)',
             // Убираем стандартный стиль
              WebkitAppearance: 'none',
              appearance: 'none',
            }}
          />
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            fontSize: '12px',
            color: 'orange',
            marginTop: '0px'
          }}>
            <span style={{color:'#9400D3',}}>Purple</span>
            <span style={{color:'#7FFFD4',}}>Aqua marine</span>
          </div>
        </div>
        
        {/* Слайдер для масштаба */}
        <div style={{ marginInline: '30%', marginBottom:'5%' }}>
          <label className='slFont'>
            <strong className='color01'>Scale:</strong> {scaleValue.toFixed(2)}x
          </label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={scaleValue}
            onChange={(e) => setScaleValue(parseFloat(e.target.value))}
            style={{ 
              width: '100%',
              height: '3px',
              cursor: 'pointer',
              borderRadius: '100%',
              background: 'linear-gradient(to right, #272727, #dfdfdf)',
             // Убираем стандартный стиль
              WebkitAppearance: 'none',
              appearance: 'none',
            }}
          />
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            fontSize: '12px',
            color: 'orange',
            marginTop: '0px'
          }}>
            <span style={{color:'#424242',}}>50%</span>
            <span style={{color:'#838383',}}>100%</span>
            <span style={{color:'#ffffff',}}>300%</span>
          </div>

        </div>  
              {/* Ваш существующий текст с добавлением color */}
              <h1 style={{ 
          fontSize: '1.5em', 
          fontWeight: 'bold',
          textAlign: 'center',
          margin: '100px',
          color: `rgb(${r}, ${g}, ${b})`,  // УНИВЕРСАЛЬНЫЙ ЦВЕТ
          transform: `scale(${scaleValue})`,
          transformOrigin: 'center center', // Масштабируем от центра
          transition: 'all 0.1s ease' // Плавная анимация
                }}>
                SUPER<br/>
                DUPER<br/>
                FONT
              </h1>
        </div>          
         <p className="text">
          Изменения параметров текста через слайдер.
        </p>
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