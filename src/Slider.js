import React, { useState } from 'react';
import './slider.scss';

import i1 from './pictures/watch1.jpg';
import i2 from './pictures/watch2.jpg';
import i3 from './pictures/watch3.jpg';
import i4 from './pictures/watch4.jpg';
import i5 from './pictures/watch5.jpg';
import i6 from './pictures/watch6.jpg';
import i7 from './pictures/watch7.jpg';
import i8 from './pictures/watch8.jpg';

const images = [i1, i2, i3, i4, i5, i6, i7, i8];

function Slider() {
  const sliderArr = [1, 2, 3, 4, 5, 6, 7, 8];
  const [imageIndex, setIndex] = useState(0);
  const [x, setX] = useState(0);
  function shift(index) {
    setX(-100 * index + 100);
    setIndex(index - 1);
  }

  return (
    /* eslint-disable react/no-array-index-key */
    <div className="container">
      {sliderArr.map((item, index) => (
        <div key={index} className="slide" style={{ transform: `translateX(${x}%)` }}>
          <img className="carousel-img" src={images[index]} alt="watch display" />
        </div>
      ))}
      <div className="filler" style={{ left: 0 }} />
      <div className="filler" style={{ right: 0 }} />
      <div className="buttons">
        <input
          className=" shift-btn"
          value="<"
          disabled={x === 0}
          key="left"
          type="button"
          onClick={() => {
            setX(Math.min(x + 100, 0));
            setIndex(imageIndex - 1);
          }}
        />
        {sliderArr.map((item, index) => (
          <input
            className={(imageIndex === index) ? 'selected-btn' : 'unselected-btn'}
            key={index}
            type="image"
            onClick={() => { shift(item); }}
            src={images[index]}
            alt="button"
          />
        ))}
        <input
          className="shift-btn"
          value=">"
          disabled={x === -700}
          key="right"
          type="button"
          onClick={() => {
            setX(Math.max(x - 100, -700));
            setIndex(imageIndex + 1);
          }}
        />
      </div>

    </div>
  );
}

export default Slider;
