import React, { useCallback, useState, useEffect } from 'react';
import { styled } from 'linaria/react';
import colors from '../../colors';

export const time = {
  play: 5,
  pause: 10
};

export const mods = {
  'default': {
    loop: 3,
    dots: 27,
    dotSize: 90
  },
  'XX': {
    loop: 2,
    dots: 27,
    dotSize: 215
  },
  'XXX': {
    loop: 3,
    dots: 27,
    dotSize: 215
  },
  'Mini': {
    loop: 2,
    dots: 9,
    dotSize: 80
  },
  'Off': {
    loop: 2,
    dots: 0,
    dotSize: 80
  },
}

const ModSwitcher = ({
  setLoop,
  setDots,
  setDotSize }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [currentMode, setCurrentMode] = useState(
    () => {
      const mode = typeof localStorage.getItem('mode') === 'string'
        ? localStorage.getItem('mode')
        : mods['default'] | Object.keys(mods)[0];

      return mode;
    }
  );

  useEffect(() => {
    handleChangeMode(currentMode)();
  }, []);


  const handleChangeMode = useCallback((modeName) => () => {
    if (!mods[modeName]) {
      return;
    }

    setCurrentMode(modeName);
    localStorage.setItem('mode', modeName);

    setLoop(mods[modeName].loop);
    setDots(mods[modeName].dots);
    setDotSize(mods[modeName].dotSize);
  }, [
    setLoop,
    setDots,
    setDotSize]);


  const handleClick = useCallback(() => setIsHidden(!isHidden), [isHidden, setIsHidden]);

  return (
    <Wrapper>
      <ShowHideBtn className={isHidden ? 'hidden' : 'active'} onClick={handleClick}>
        {isHidden ? '' : 'X'}
      </ShowHideBtn>
      {
        !isHidden &&
        <ModsWrapper>
          <ModsText>Mods:</ModsText>
          {Object.keys(mods).map((key) => <ModeBtn className={currentMode === key ? 'active' : ''} onClick={handleChangeMode(key)}>{key}</ModeBtn>)}
        </ModsWrapper>
      }
    </Wrapper>);
}

export { ModSwitcher };

const btnSize = 5;
const maxBtnSize = 30;

const Wrapper = styled.div`
  position: absolute;
  bottom: -${0.5 * btnSize}px;
  left: ${0.5 * btnSize}px;
  display: flex;
  align-items: center;

  flex-direction: row;
  z-index: 10;
  border-radius: 10px;
  padding: 10px;
  min-height: 8rem;
`;

const ModsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;

  background: ${colors.active};
  border-radius: 10px;
`;


const ShowHideBtn = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  height: ${btnSize / 1.5}vmin;
  width: ${btnSize / 1.5}vmin;
  min-width: ${btnSize / 1.5}vmin;
  min-height: ${btnSize / 1.5}vmin;
  max-height: ${maxBtnSize}px;
  max-width: ${maxBtnSize}px;

  border: 4px solid ${colors.hidden};
  border-radius: 50%;
  margin-right: 5px;
  font-size: 1.2rem;

  &.active {
    background: ${colors.focus};
  }
`;

const ModsText = styled.span`
  margin: 0 10px;
  color: ${colors.background};
  font-size: 2rem;
`;

const ModeBtn = styled.span`
  display: flex;
  justify-content:  center;
  align-items: center;
  margin: 0 5px;

  height: ${btnSize}vmin;
  width: ${btnSize}vmin;
  min-width: ${btnSize}vmin;
  min-height: ${btnSize}vmin;


  color: white;
  font-size: 1.2rem;

  border-radius: 50%;
  background: ${colors.passiveFill};
  transform: rotate(30deg);
  cursor: pointer;

  &.active {
    background: ${colors.focus};
    color: ${colors.passive};
  }
`;