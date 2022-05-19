import React, { useState } from 'react';
/* eslint-disable */

function Magnifier({
  src,
  magnifierHeight = 200,
  magnifierWidth = 200,
  zoomLevel = 1.5,
}) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [delta, setDelta] = useState(0);
  return (
    <div
      style={{
        height: `100%`,
        width: `100%`
      }}
    >
      <img
        src={src}
        style={{ width: `100%`, height: `100%`, userSelect: `none`, borderRadius: `5%`, border: `1px solid black`, opacity: 0 }}
        onMouseEnter={(e) => {
          const elem = e.currentTarget;
          const { width, height } = elem.getBoundingClientRect();
          setSize([width, height]);
          setShowMagnifier(true);
        }}
        onMouseMove={(e) => {
          const elem = e.currentTarget;
          const { top, left } = elem.getBoundingClientRect();

          setDelta(document.documentElement.clientWidth - 1600);

          const x = e.pageX - left - window.pageXOffset;
          const y = e.pageY - top - window.pageYOffset;
          setXY([x, y]);
        }}
        onMouseLeave={() => {
          setShowMagnifier(false);
        }}
        alt={'watch display'}
      />

      <div
        style={{
          display: showMagnifier ? '' : 'none',
          position: 'absolute',

          pointerEvents: 'none',
          height: `${magnifierHeight}px`,
          width: `${magnifierWidth}px`,
          borderRadius: 100,
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifierWidth / 2}px`,
          border: '2px solid #013220',
          backgroundColor: 'white',
          backgroundImage: `url('${src}')`,
          backgroundRepeat: 'no-repeat',

          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,

          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
        }}
      ></div>
    </div>
  );
}

export default Magnifier;