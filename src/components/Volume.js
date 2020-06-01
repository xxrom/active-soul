import React, { useState, useRef } from 'react';

import { styled } from 'linaria/react';

const Volume = ({ setVolume, volume }) => {
  const [isFocusThumb, setIsFocusThumb] = useState(false);
  const onChange = (e) => {
    console.log(e);
    console.log(e.target.value);
    setVolume(e.target.value);
  }

  const onFocusThumb = () => {
    setIsFocusThumb(true);
  }
  const onBlurThumb = () => {
    setIsFocusThumb(false);
  }

  return <RangeSlider>
    <Range onFocus={onFocusThumb} onBlur={onBlurThumb} onChange={onChange} type="range" min="0" max="100" value={volume} step="5" />
    <Thumb style={{ left: `${((rangeWidth - ThumbWidth) / 100) * volume}px` }}>{volume}</Thumb>
    {isFocusThumb && <Drop style={{ left: `${((rangeWidth - ThumbWidth) / 100) * volume}px` }} />}
  </RangeSlider>;
}

export { Volume };

const ThumbWidth = 30;

const Drop = styled.span`
    position: absolute;
		box-sizing: content-box;
		width: 30px;
		height: 30px;
		border-radius: 80% 0 55% 50% / 55% 0 80% 50%;
		background: gray;
		transform: rotateZ(-45deg);
    top: ${1.22 * ThumbWidth}px;
`;

const Thumb = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: ${ThumbWidth}px;
  height: ${ThumbWidth}px;
  border-radius: 50%;
  left: 0;
  top: ${1.22 * ThumbWidth}px;
  z-index: 1;
  color: white;
`;

const shade10 = '#aaa';
const shade1 = '#d7dcdf';
const shade0 = '#fff';
const teal = '#1abc9c';

const rangeWidth = 150;

const rangeHandleColor = shade10;
const rangeHandleColorHover = teal;
const rangeHandleSize = ThumbWidth;

const rangeTrackColor = shade1;
const rangeTrackHeight = 10;

const rangeLabelColor = shade10;
const rangeLabelWidth = 60;

const RangeSlider = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: ${rangeWidth}px;
  height: 30px;
`;

const Range = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: ${rangeTrackHeight}px;
  border-radius: 5px;
  background: ${rangeTrackColor};
  outline: none;
  padding: 0;
  margin: 0;
  z-index: 1;

  /* // Range Handle */
  &::-webkit-slider-thumb {
    appearance: none;
    width: ${rangeHandleSize}px;
    height: ${rangeHandleSize}px;
    border-radius: 50%;
    background: ${rangeHandleColor};
    cursor: pointer;
    transition: background .15s ease-in-out;

    &:hover {
      background: ${rangeHandleColorHover};
    }
  }

  &:active::-webkit-slider-thumb {
    background: ${rangeHandleColorHover};
  }

  &::-moz-range-thumb {
    width: ${rangeHandleSize}px;
    height: ${rangeHandleSize}px;
    border: 0;
    border-radius: 50%;
    background: ${rangeHandleColor};
    cursor: pointer;
    transition: background .15s ease-in-out;

    &:hover {
      background: ${rangeHandleColorHover};
    }
  }

  &:active::-moz-range-thumb {
    background: ${rangeHandleColorHover};
  }

  /* // Focus state */
  &:focus {

    &::-webkit-slider-thumb {
      box-shadow:inset 0 0 0 2px ${teal},
                 inset 0 0 0 4px ${shade0};
    }
  }
`;

// const RangeValue = styled.div`
//   display: block;
//   position: relative;
//   width: ${rangeLabelWidth};
//   color: ${shade0};
//   line-height: 20px;
//   text-align: center;
//   border-radius: 3px;
//   background: ${rangeLabelColor};
//   padding: 5px 10px;
//   margin-left: 8px;

//   &:after {
//     position: absolute;
//     top: 8px;
//     left: -7px;
//     width: 0;
//     height: 0;
//     border-top: 7px solid transparent;
//     border-right: 7px solid ${rangeLabelColor};
//     border-bottom: 7px solid transparent;
//     content: '';
//   }
// `;