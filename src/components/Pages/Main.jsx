import React, { Suspense } from 'react';
import Lazy3DPreview from '../Lazy3DPreview';
import OMGScene from '../OMG';
import DistortionScene from '../DistortionScene';
import ShadertoyScene from '../ShadertoyScene';
import ShadertoyScene_space01 from '../ShadertoyScene_space01';
import { SplitText } from '../SplitText/SplitText';

const Main = () => {
  return (
    <div className='wrapper'>
      
    {/* Карточка 1 - Bento frames */}
      <div className="card">
        <h2>Bento frames</h2>
        <p className="text">
          Верстка в виде карточек
        </p>        
      </div>      

    {/* Карточка 2 - Bento frames */}
      <div className="card2">
        <h2>Bento frames</h2>
        <p className="text">
          Верстка в виде карточек
        </p>      
      </div>   
    
    </div>
  );
};

export default Main;