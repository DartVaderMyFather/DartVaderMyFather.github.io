import React, { Suspense } from 'react';
import Lazy3DPreview from '../Lazy3DPreview';
import OMGScene from '../OMG';
import DistortionScene from '../DistortionScene';
import ShadertoyScene from '../ShadertoyScene';
import ShadertoyScene_space01 from '../ShadertoyScene_space01';
import { SplitText } from '../SplitText/SplitText';

const Text = () => {
  return (
    <div className='wrapper'>
      
      {/* Карточка 5 - TEXT MOTION */}
      <div className="card">
        <h2>CSS Dynamic Font<br /> Animation</h2>
        <p className="text">
          Анимации Fade-in/Cycle/Fade-out. <br />
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
        <div style={{ textAlign: 'center', fontSize: '350%', margin: '0%', transformOrigin: 'center center' }}>
          <div className="variable">
            <span className="work">BOLD</span>WIDE
          </div>
        </div>
        <p className="textanimated">HELLO WORLD</p>
      </div>

      {/* Карточка 7 - SplitText */}
      <div className="card">
        <div>
          <h2>Java Text Animation N-01<br />SplitText</h2>
          <p className="text">
            Определяем входящий текст как отдельные символы и буквы.
            После анимируем через пресеты заводим как стили.
            Тайминги можно настраивать отдельно.
          </p>

          <SplitText
            preset="rotateIn"
            paramsAnimate={{ duration: 0.1, stagger: 0.01, delay: 0.0, direction: 'forward', easing: 'ease-out' }}
            paramsFinal={{ duration: 0.1, stagger: 0.01, delay: 0.0, direction: 'reverse', easing: 'ease-in' }}
            trigger="hover"
            splitBy="char"
            style={{ fontSize: '200%', margin: '10%', cursor: 'pointer' }}
          >
            Анимация rotateIn
          </SplitText>

          <SplitText
            preset="colorFadeWithFinal"
            paramsAnimate={{ duration: 0.2, stagger: 0.1, delay: 0.0, direction: 'forward', easing: 'ease-out' }}
            paramsFinal={{ duration: 0.2, stagger: 0.1, delay: 0.0, direction: 'reverse', easing: 'ease-in' }}
            trigger="hover"
            splitBy="char"
            style={{ fontSize: '200%', margin: '10%', cursor: 'pointer' }}
          >
            Анимация colorFade
          </SplitText>

          <SplitText
            preset="randomDrift"
            paramsAnimate={{ duration: 0.3, stagger: 0.01, delay: 0.0, direction: 'forward' }}
            hoverOutParams={{ duration: 0.3, stagger: 0.01, delay: 0.0, direction: 'reverse', easing: 'ease-in' }}
            trigger="hover"
            splitBy="char"
            style={{ fontSize: '200%', margin: '10%', cursor: 'pointer' }}
          >
            Анимация randomDrift
          </SplitText>

          <SplitText
            preset="customWave"
            paramsAnimate={{ duration: 0.5, stagger: 0.01, delay: 0.0, direction: 'forward' }}
            hoverOutParams={{ duration: 0.5, stagger: 0.01, delay: 0.0, direction: 'reverse', easing: 'ease-in' }}
            trigger="hover"
            splitBy="char"
            style={{ fontSize: '200%', margin: '10%', cursor: 'pointer' }}
          >
            Анимация customWave
          </SplitText>
        </div>
      </div>
    </div>
  );
};

export default Text;