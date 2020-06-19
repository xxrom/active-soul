import React, { useState, useCallback } from 'react';
import { styled } from 'linaria/react';

import colors from '../../colors';

const Volume = ({ setVolume, volume }) => {
  const [isFocusThumb, setIsFocusThumb] = useState(false);
  const onChange = useCallback((e) => {
    setVolume(e.target.value);
  }, [setVolume]);

  const onFocusThumb = () => {
    setIsFocusThumb(true);
  }
  const onBlurThumb = () => {
    setIsFocusThumb(false);
  }

  return <RangeSlider>
    <Range onFocus={onFocusThumb} onBlur={onBlurThumb} onChange={onChange} type="range" min="0" max="100" value={volume} step="1" />
    {isFocusThumb && <Thumb style={{ left: `${((rangeWidth - ThumbWidth) / 100) * volume}px` }}>{volume}</Thumb>}
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

const shade10 = colors.hidden;
const shade5 = colors.hidden;
const shade0 = '#ffffff00';
const teal = colors.active;

const rangeWidth = 150;

const rangeHandleColor = shade10;
const rangeHandleColorHover = teal;
const rangeHandleSize = ThumbWidth;

// const rangeTrackColor = shade1;
const rangeTrackColorHover = shade5;
const rangeTrackHeight = 10;

const RangeSlider = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: ${rangeWidth}px;
  height: 30px;
  top: 5px;
`;

const Range = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: ${rangeTrackHeight}px;
  border-radius: 5px;
  background: #00000000;
  outline: none;
  padding: 0;
  margin: 0;
  z-index: 1;
  cursor: pointer;
  transition: background .25s ease-in-out;

  &:hover {
    background: ${rangeTrackColorHover};
  }

  /* Range Handle */
  &::-webkit-slider-thumb {
    appearance: none;
    width: ${rangeHandleSize}px;
    height: ${rangeHandleSize}px;
    border-radius: 50%;
    background: ${rangeHandleColor};
    cursor: pointer;
    transition: background .25s ease-in-out;
    border: 2px solid white;

    &:hover {
      background: ${rangeHandleColorHover};
    }
  }

  &:active::-webkit-slider-thumb {
    &:hover {
      background: ${rangeHandleColorHover};
    }
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
