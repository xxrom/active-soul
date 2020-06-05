import React, { useState } from 'react';
import { styled } from 'linaria/react';

const helixSize = 90;
// const animateDuration = 6;
// const numberOfDots = 36;
// const numberOfDots = 27;
// const dotsPerCircle = numberOfDots;
// const dotsPerLoop = dotsPerCircle / 4;

const Dot = (props) => <div>
  <DotCommon first color={'black'} {...props} />
  <DotCommon second color={'lightgray'}{...props} />
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


const Background = ({ children }) => {
  const [time, setTime] = useState(6);
  const [loop, setLoop] = useState(3);
  const [dots, setDots] = useState(27);
  const [dotSize, setDotSize] = useState(90)

  const Dots = [];
  for (let i = 0; i < dots; i++) {
    Dots.push(<Dot index={i} time={time} loop={loop} dots={dots} dotSize={dotSize} />);
  }

  console.log(`Dots`, Dots);
  console.log(`time ${time}`);

  return (
    <BackgroundDiv>
      <div style={{ position: 'absolute', left: '10px', top: '-200px', zIndex: '100' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div>

            <div>
              <TapBtn onClick={() => setTime(time + 0.5)}>{'+'}</TapBtn>
              <TapBtn onClick={() => time > 0.5 ? setTime(time - 0.5) : null}>{'-'}</TapBtn>
            </div>
            <div>
              <span>{`time: ${time} `}</span>
            </div>
          </div>
          <div>
            <div>
              <TapBtn onClick={() => setLoop(loop + 0.5)}>{'+'}</TapBtn>
              <TapBtn onClick={() => loop > 0.5 ? setLoop(loop - 0.5) : null}>{'-'}</TapBtn>
            </div>
            <div>
              <span>{`loop: ${loop} `}</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div>

            <div>
              <TapBtn onClick={() => setDots(dots + 9)}>{'+'}</TapBtn>
              <TapBtn onClick={() => dots > 9 ? setDots(dots - 9) : null}>{'-'}</TapBtn>
            </div>
            <div>
              <span>{`dots: ${dots} `}</span>
            </div>
          </div>
          <div>

            <div>
              <TapBtn onClick={() => setDotSize(dotSize + 10)}>{'+'}</TapBtn>
              <TapBtn onClick={() => dotSize > 10 ? setDotSize(dotSize - 10) : null}>{'-'}</TapBtn>
            </div>
            <div>
              <span>{`size: ${dotSize} `}</span>
            </div>
          </div>
        </div>
      </div>
      {Dots}
      {children}
    </BackgroundDiv>);
}

const BackgroundDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  height: ${helixSize}vmin;
  width: ${helixSize}vmin;
  border-radius: 50%;
`;

const TapBtn = styled.button`
  height: 40px;
  width: 40px;
  font-size: 1.5rem;
  border-radius: 50%;
`;

export { Background };