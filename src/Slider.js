import React, { useState } from 'react';
import Magnifier from './Magnifier';
import './slider.scss';

function Slider() {
  const [imageIndex, setIndex] = useState(0);
  const [x, setX] = useState(0);

  function shift(index) {
    setX(-100 * index);
    setIndex(index);
  }

  function importImages(r) {
    const images = {};
    r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importImages(require.context('./pictures', false, /\.(jpg)$/));
  const maxShift = -100 * (Object.values(images).length - 1);

  return (
  // /* eslint-disable react/no-array-index-key */
    <div className="container">
      {Object.values(images).map((item) => (
        <div key={item} className="slide" style={{ transform: `translateX(${x}%)` }}>
          <div className="image-container">
            <img className="carousel-img" src={item} alt="watch display" />
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
            setIndex(imageIndex + 1);
          }}
        />
      </div>
    </div>
  );
}

export default Slider;
