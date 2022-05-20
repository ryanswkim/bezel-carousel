import React, { useState } from 'react';
/* eslint-disable */

const GLASS_HEIGHT = 200;
const GLASS_WIDTH = 200;
const ZOOM = 1.5;

function Magnifier({
  src, visible,
}) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <img
        src={src}
        draggable={false}
        style={{
          width: '100%', height: '100%', userSelect: 'none', borderRadius: '5%', border: '1px solid black',
        }}
        onMouseEnter={(e) => {
          const target = e.currentTarget;
          const { width, height } = target.getBoundingClientRect();
          setSize([width, height]);
          setShowMagnifier(true);
        }}
        onMouseMove={(e) => {
          const target = e.currentTarget;
          const { top, left } = target.getBoundingClientRect();

          const w = e.pageX - left - window.pageXOffset;
          const h = e.pageY - top - window.pageYOffset;
          setXY([w, h]);
        }}
        onMouseLeave={() => { setShowMagnifier(false); }}
        alt="Watch display"
      />

      {(visible) ? (
      <div
        style={{
          display: showMagnifier ? '' : 'none',

          position: 'absolute',
          top: `${y - GLASS_HEIGHT / 2}px`,
          left: `${x - GLASS_WIDTH / 2}px`,
          height: `${GLASS_HEIGHT}px`,
          width: `${GLASS_WIDTH}px`,
          borderRadius: '100%',
          border: '2px solid #013220',

          backgroundImage: `url('${src}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${imgWidth * ZOOM}px ${
            imgHeight * ZOOM
          }px`,
          backgroundPositionX: `${-x * ZOOM + GLASS_WIDTH / 2}px`,
          backgroundPositionY: `${-y * ZOOM + GLASS_HEIGHT / 2}px`,

          pointerEvents: 'none',
        }}
      />
      ) : ''}
    </div>
  );
}

export default Magnifier;
