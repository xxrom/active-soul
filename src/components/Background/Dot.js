import React from 'react';
import { styled } from 'linaria/react';
import colors from '../../colors';

export const helixSize = 90;
// const animateDuration = 6;
// const numberOfDots = 36;
// const numberOfDots = 27;
// const dotsPerCircle = numberOfDots;
// const dotsPerLoop = dotsPerCircle / 4;

const Dot = (props) => <div>
  <DotCommon first color={colors.active} {...props} />
  <DotCommon second color={colors.background}{...props} />
</div>;

const DotCommon = styled.div`
  transform: rotate(${props => props.index * 360 / props.dots}deg);

  position: absolute;
  left: 0;
  top: calc(50% - 17.5px - ${props => (props.dotSize / 20)}vmin);
  height: ${props => (props.dotSize / 10)}vmin  ;
  width: 50%;
  min-width: 100px;
  transform-origin: 100% 50%;
  backface-visibility: hidden;

  animation: hide-dot ${props => props.time}s linear infinite;
  animation-delay: ${props =>
    props.first
      ? 0 - (props.index * props.time / (props.dots / props.loop))
      : -(props.time / 2) - (props.index * props.time / (props.dots / props.loop))}s;

  &::after {
    background: ${props => props.color};
    content: '';
    display: block;
    height: ${props => (props.dotSize / 20)}vmin;
    width:  ${props => (props.dotSize / 20)}vmin;
    min-height: ${props => (props.dotSize / 5)}px;
    min-width: ${props => (props.dotSize / 5)}px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    border-radius: 50%;
    backface-visibility: hidden;
    animation: move-dot ${props => props.time}s linear infinite;

    animation-delay: ${props => props.first
    ? 0 - (props.index * props.time / (props.dots / props.loop))
    : -(props.time / 2) - (props.index * props.time / (props.dots / props.loop))}s;
    will-change: transform;
  }

  @keyframes hide-dot {
    0% {
        z-index: 1;
    }
    25% {
        z-index: 1;
    }
    50% {
        z-index: -1;
    }
    75% {
        z-index: -1;
    }
    100% {
        z-index: -1;
    }
  }

  @keyframes move-dot {
    0% {
        transform: translateY(-50%) translateX(0) scale(1);
        animation-timing-function: ease-in;
    }
    25% {
        transform: translateY(-50%) translateX( ${helixSize / 16}vmin ) scale(1.5);
        animation-timing-function: ease-out;
    }
    50% {
        transform: translateY(-50%) translateX(${helixSize / 8}vmin) scale(1);
        animation-timing-function: ease-in;
    }
    75% {
        transform: translateY(-50%) translateX(${helixSize / 16}vmin) scale(0.5);
        animation-timing-function: ease-out;
    }
    100% {
        transform: translateY(-50%) translateX(0) scale(1);
    }
  }
`;

export { Dot };