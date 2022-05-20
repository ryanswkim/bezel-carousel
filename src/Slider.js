import React, { useState } from 'react';
/* eslint-disable */
import Magnifier from './Magnifier';
import './slider.scss';

const SNAP_DIST = 12.5;

function Slider() {
  const [imageIndex, setIndex] = useState(0);
  const [x, setX] = useState(25);
  const [anchor, setAnchor] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [mousePos, setMouse] = useState(0);
  const [lg, setLg] = useState(window.innerWidth >= 992);

  window.addEventListener('resize', () => { setLg(window.innerWidth >= 992); });

  function shift(index){
    setX(-50 * index + 25);
    setAnchor(-50 * index);
    setIndex(index);
  }

  function importImages(r) {
    const images = {};
    r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importImages(require.context('./pictures', false, /\.(jpg)$/));
  const maxIndex = Object.values(images).length - 1;

  return (
  /* eslint-disable jsx-a11y/no-static-element-interactions */
    <div
      role="none"
      className="container"
      onMouseUp={() => {
        if (!dragging) {
          return;
        }
        setDragging(false);
        const i = 25 - imageIndex * 50;
        const d = x - i;
        if (d >= -SNAP_DIST && d <= SNAP_DIST) {
          shift(imageIndex);
        } else {
          shift((d < -SNAP_DIST) ? imageIndex + 1 : imageIndex - 1);
        }
      }}
      onMouseMove={(e) => {
        if (!dragging) {
          return;
        }
        const diff = (100 * (e.clientX - mousePos)) / document.documentElement.clientWidth;

        if ((diff > 0)) {
          setX(Math.min(25, (anchor + diff)));
        } else if (diff < 0) {
          setX(Math.max((25 - (50 * maxIndex)), anchor + diff));
        }
      }}
    >
      {Object.values(images).map((item) => (
        <div
          key={item}
          className="slide"
          style={dragging ? { transition: 'none', transform: `translateX(${x * 2}%)` }
            : { transition: '0.15s', transform: `translateX(${x * 2}%)` }}
        >
          <div
            role="none"
            className="image-container"
            onMouseDown={(e) => {
              setDragging(true);
              setMouse(e.clientX);
              setAnchor(x);
            }}
          >
            <Magnifier src={item} visible={lg} />
          </div>
        </div>
      ))}

      <div
        className={lg ? "buttons-lg" : "buttons-small"}
        id="buttons"
        style={{ bottom: '3%' }}
      >
        <input
          className="shift-btn"
          value="<"
          disabled={imageIndex === 0}
          style = {lg ? {display: 'inline-block'} : {display: 'none'}}
          key="left"
          type="button"
          onClick={() => {
            shift(imageIndex - 1);
          }}
        />
        {Object.values(images).map((item, index) => lg ? (
          <input
            style={(imageIndex === index) ? {border: '2.5px solid black'} : {border: '2px solid #EEE'}}
            key={item}
            type="image"
            onClick={() => { shift(index); }}
            src={item}
            alt="button"
          />
        ) : (
          <input
          style={(imageIndex === index) ? {backgroundColor: 'black'} : {backgroundColor: 'lightgrey'}}
          key={item}
          type="button"
          onClick={() => { shift(index); }}
        />
        ))}
        <input
          className="shift-btn"
          value=">"
          disabled={imageIndex === maxIndex}
          style = {lg ? {display: 'inline-block'} : {display: 'none'}}
          key="right"
          type="button"
          onClick={() => {
            shift(imageIndex + 1);
          }}
        />
      </div>

      <div className="filler" style={{ left: 0 }} />
      <div className="filler" style={{ right: 0 }} />
    </div>
  );
}

export default Slider;
