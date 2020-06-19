import React, { useState, Children, cloneElement } from 'react';
import { styled } from 'linaria/react';
import { Dot, helixSize } from './Dot';
// import { DotsParameters } from './DotsParameters';
import { ModSwitcher, mods } from './ModSwitcher';


const Background = ({ children }) => {
  const [time, setTime] = useState(mods.default.time);
  const [loop, setLoop] = useState(mods.default.loop);
  const [dots, setDots] = useState(mods.default.dots);
  const [dotSize, setDotSize] = useState(mods.default.dotSize);

  const Dots = [];
  for (let i = 0; i < dots; i++) {
    Dots.push(<Dot index={i} time={time} loop={loop} dots={dots} dotSize={dotSize} />);
  }

  const dotsParameters = {
    parameters: {
      time,
      loop,
      dots,
      dotSize
    },
    setParameters: {
      setTime,
      setLoop,
      setDots,
      setDotSize
    }
  };

  return (
    <BackgroundDiv>
      {Dots}
      {Children.map(children, child => cloneElement(child, { setTime }))}
      {/* <DotsParameters {...{ ...dotsParameters.parameters, ...dotsParameters.setParameters }} /> */}
      <ModSwitcher  {...dotsParameters.setParameters} />
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
`;

export { Background };