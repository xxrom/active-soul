import React from 'react';
import { styled } from 'linaria/react';
import { css } from 'linaria';

const helixSize = 60; // vmin;
const animateDuration = 2;
const numberOfDots = 18;
const dotsPerCircle = numberOfDots / 2;
const dotsPerLoop = dotsPerCircle / 6;

const Dot = (props) => <DotStyled {...props} />;

const DotStyled = styled.div`
  transform: rotate(${props =>
    props.index <= dotsPerCircle
      ? props.index * 360 / dotsPerCircle
      : (props.index + dotsPerLoop / 2) * 360 / dotsPerCircle
  }deg);

  position: absolute;
  left: 0;
  top: calc(50% - ${helixSize / 20}vmin);
  height: ${helixSize / 10}vmin  ;
  width: 50%;
  transform-origin: 100% 50%;
  backface-visibility: hidden;
  animation: update-z-index ${animateDuration}s linear infinite;

  animation-delay: ${props => -props.index * animateDuration / dotsPerLoop}s;

  &::after {
    background: ${props => props.color};
    margin: 1rem;
  }

  &::before {
    background: ${props => props.color};
    animation-delay: 1s;
    margin: 2rem;
  }

  &::before,
  &::after {
      content: '';
      /* background: red; */
      display: block;
      height: ${helixSize / 20}vmin;
      width:  ${helixSize / 20}vmin;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      border-radius: 50%;
      backface-visibility: hidden;
      animation: move-dot ${animateDuration}s linear infinite;
      will-change: transform;
  }

  @keyframes move-dot {
    0% {
        transform: translateY(-50%) translateX(0) scale(1);
        animation-timing-function: ease-in;
    }

    25% {
        transform: translateY(-50%) translateX( ${helixSize / 16}vmin ) scale(1.2);
        animation-timing-function: ease-out;
    }

    50% {
        transform: translateY(-50%) translateX(${helixSize / 8}vmin) scale(1);
        animation-timing-function: ease-in;
    }

    75% {
        transform: translateY(-50%) translateX(${helixSize / 16}vmin) scale(0.8);
        animation-timing-function: ease-out;
    }

    100% {
        transform: translateY(-50%) translateX(0) scale(1);
    }
}


@keyframes update-z-index {
    0% {
        z-index: 1;
    }

    49% {
        z-index: 1;
    }

    50% {
        z-index: -1;
    }

    100% {
        z-index: -1;
    }
}
`;


const Background = ({ children }) => {
  const onMove = () => console.log(`moved!`);

  const Dots = [];
  for (let i = 0; i < numberOfDots; i++) {
    Dots.push(<Dot index={i} color={i % 2 === 0 ? 'red' : 'blue'} />);
  }

  console.log(`Dots`, Dots);

  return <BackgroundDiv onMouseMove={onMove}>
    {Dots}
    {children}
  </BackgroundDiv>
}

const BackgroundDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  border: 1px solid gray;
  box-sizing: border-box;


  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  height: ${helixSize}vmin;
  width: ${helixSize}vmin;
  border-radius: 50%;
  background: skyblue;

  .dot {
    position: absolute;

    left: 0;
    top: calc(50% - ${helixSize / 20}vmin);
    height: ${helixSize / 10}vmin  ;
    width: 50%;
    transform-origin: 100% 50%;
    backface-visibility: hidden;
    animation: update-z-index ${animateDuration}s linear infinite;

    /* .mixin-init-dot(0); */
    &:nth-child(0) {
        transform: rotate((0 * 360 / ${dotsPerCircle}, deg));

        &::after {
            background: #fff;
        }
    }

    &:nth-child(1) {
        transform: rotate((1 * 360 / ${dotsPerCircle}, deg));

        &::after {
            background: #fff;
        }
    }

    &::after {
        content: '';
        background: red;
        display: block;
        height: ${helixSize / 20}vmin;
        width:  ${helixSize / 20}vmin;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        border-radius: 50%;
        backface-visibility: hidden;
        animation: move-dot ${animateDuration}s linear infinite;
        will-change: transform;
    }
  }

  @keyframes move-dot {
    0% {
        transform: translateY(-50%) translateX(0) scale(1);
        animation-timing-function: ease-in;
    }

    25% {
        transform: translateY(-50%) translateX( ${helixSize / 16}vmin ) scale(1.2);
        animation-timing-function: ease-out;
    }

    50% {
        transform: translateY(-50%) translateX(${helixSize / 8}vmin) scale(1);
        animation-timing-function: ease-in;
    }

    75% {
        transform: translateY(-50%) translateX(${helixSize / 16}vmin) scale(0.8);
        animation-timing-function: ease-out;
    }

    100% {
        transform: translateY(-50%) translateX(0) scale(1);
    }
}


@keyframes update-z-index {
    0% {
        z-index: 1;
    }

    49% {
        z-index: 1;
    }

    50% {
        z-index: -1;
    }

    100% {
        z-index: -1;
    }
}
`;

export { Background };