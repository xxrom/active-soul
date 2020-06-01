import React from 'react';
import { css, cx } from 'linaria';
import { styled } from 'linaria/react';
import { PLAY } from '../components';

const PlayMerge = css`
  padding-left: 12%;
  animation: beat 1s ease infinite alternate;
`;

const SVGcss = css`
  position: relative;
  height: 50%;
  width: 50%;
`;
const BtnSvg = styled.polygon`
    fill: #999;
    animation: beat 3s ease infinite alternate;
    transform-origin: 50% 50%;

    @keyframes beat {
      from {
        transform: scale(0.9);
      }

      to {
        transform: scale(1);
      }
    }
`;
const BigButton = styled.div`
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20vmin;
      height: 20vmin;
      min-height: 150px;
      min-width: 150px;
      border: 1px solid gray;
      animation: 1s ease infinite alternate;
      border-radius: 50%;

    &:hover {
      cursor: pointer;

      ${BtnSvg} {
        fill: #a41d33;
        opacity: 1;
      }
    }
`;

const PlayPause = ({ state }) => <svg className={cx(state === PLAY && PlayMerge, SVGcss)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 3">
  {state === PLAY
    ? <BtnSvg points="0 0  0 3  3 1.5  0 0" />
    : <>
      <BtnSvg points='0 0  0 3  1 3  1 0' />
      <BtnSvg points='2 0  2 3  3 3  3 0' />
    </>}
</svg>;

const PlayStop = (props) => {
  return <BigButton onClick={props.onToggle}><PlayPause {...props} /></BigButton>;
}

export { PlayStop };
