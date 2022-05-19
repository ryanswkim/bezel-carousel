import React, { useState } from 'react';
import Magnifier from './Magnifier';
import './slider.scss';

const SNAP_DIST = 12.5;

function Slider() {
  const [imageIndex, setIndex] = useState(0);
  const [x, setX] = useState(25);
  const [anchor, setAnchor] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [mousePos, setMouse] = useState(0);

  function shift(index) {
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
        if ((diff > 0 && imageIndex === 0) || (diff < 0 && imageIndex === maxIndex)) {
          return;
        }
        setX(anchor + diff);
      }}
    >
      {Object.values(images).map((item) => (
        <div
          key={item}
          className="slide"
          style={dragging ? { transition: 'none', transform: `translateX(${x * 2}%)` }
            : { transition: '0.5s', transform: `translateX(${x * 2}%)` }}
        >
          <div
            className="image-container"
            onMouseDown={(e) => {
              setDragging(true);
              setMouse(e.clientX);
              setAnchor(x);
            }}

          >
            <img draggable={false} className="carousel-img" src={item} alt="watch display" />
            <Magnifier src={item} />
          </div>
        </div>
      ))}
      <div className="filler" style={{ left: 0 }} />
      <div className="filler" style={{ right: 0 }} />
      <div className="buttons">
        <input
          className="shift-btn"
          value="<"
          disabled={imageIndex === 0}
          key="left"
          type="button"
          onClick={() => {
            shift(imageIndex - 1);
            // setX(Math.min(x + 50, 25));
            // setAnchor(x);
            // setIndex(imageIndex - 1);
          }}
        />
        {Object.values(images).map((item, index) => (
          <input
            className={(imageIndex === index) ? 'selected-btn' : 'unselected-btn'}
            key={item}
            type="image"
            onClick={() => { shift(index); }}
            src={item}
            alt="button"
          />
        ))}
        <input
          className="shift-btn"
          value=">"
          disabled={imageIndex === maxIndex}
          key="right"
          type="button"
          onClick={() => {
            shift(imageIndex + 1);
          }}
        />
      </div>
    </div>
  );
}

export default Slider;
