import React, { useState } from 'react';
import Magnifier from './Magnifier';
import './slider.scss';

function Slider() {
  const [imageIndex, setIndex] = useState(0);
  const [x, setX] = useState(0);
  const [anchor, setAnchor] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [mousePos, setMouse] = useState(0);

  function shift(index) {
    setX(-100 * index);
    setAnchor(-100 * index);
    setIndex(index);
  }

  function importImages(r) {
    const images = {};
    r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importImages(require.context('./pictures', false, /\.(jpg)$/));
  const maxIndex = Object.values(images).length - 1;
  const maxShift = -100 * maxIndex;

  return (
  /* eslint-disable jsx-a11y/no-static-element-interactions */
    <div
      className="container"
      onMouseUp={() => {
        setDragging(false);
        const right = -Math.round((x - 35) / 100);
        const left = -Math.round((x + 35) / 100);
        if (right === left === imageIndex) {
          shift(imageIndex);
        } else {
          shift((right !== imageIndex) ? right : left);
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
          style={dragging ? { transition: 'none', transform: `translateX(${x}%)` }
            : { transition: '0.5s', transform: `translateX(${x}%)` }}
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
          disabled={x === 0}
          key="left"
          type="button"
          onClick={() => {
            setX(Math.min(x + 100, 0));
            setAnchor(x);
            setIndex(imageIndex - 1);
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
          disabled={x === maxShift}
          key="right"
          type="button"
          onClick={() => {
            setX(Math.max(x - 100, maxShift));
            setAnchor(x);
            setIndex(imageIndex + 1);
          }}
        />
      </div>
    </div>
  );
}

export default Slider;
