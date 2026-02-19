// Lazy3DPreview.jsx
import React, { useState } from 'react';

const Lazy3DPreview = ({ previewSrc, children, alt = '3D preview' }) => {
  const [active, setActive] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio:'1/1',      
        cursor: 'pointer',
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {active ? (
        children
      ) : (
        <img
          src={previewSrc}
          alt={alt}
          style={{ width: '100%', aspectRatio:'1/1' }}
        />
      )}
    </div>
  );
};

export default Lazy3DPreview;