import React from 'react';
import { styled } from 'linaria/react';

const DotsParameters = ({ time, loop, dots, dotSize, setTime, setLoop, setDots, setDotSize }) => {
  return <ControlsWrapper>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>
        <div>
          <TapBtn onClick={() => time > 0.5 ? setTime(time - 0.5) : null}>{'-'}</TapBtn>
          <TapBtn onClick={() => setTime(time + 0.5)}>{'+'}</TapBtn>
        </div>
        <div>
          <span>{`time: ${time} `}</span>
        </div>
      </div>
      <div>
        <div>
          <TapBtn onClick={() => loop > 0.5 ? setLoop(loop - 0.5) : null}>{'-'}</TapBtn>
          <TapBtn onClick={() => setLoop(loop + 0.5)}>{'+'}</TapBtn>
        </div>
        <div>
          <span>{`loop: ${loop} `}</span>
        </div>
      </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>

        <div>
          <TapBtn onClick={() => dots > 9 ? setDots(dots - 9) : null}>{'-'}</TapBtn>
          <TapBtn onClick={() => setDots(dots + 9)}>{'+'}</TapBtn>
        </div>
        <div>
          <span>{`dots: ${dots} `}</span>
        </div>
      </div>
      <div>

        <div>
          <TapBtn onClick={() => dotSize > 10 ? setDotSize(dotSize - 10) : null}>{'-'}</TapBtn>
          <TapBtn onClick={() => setDotSize(dotSize + 10)}>{'+'}</TapBtn>
        </div>
        <div>
          <span>{`size: ${dotSize} `}</span>
        </div>
      </div>
    </div>
  </ControlsWrapper>;
}

export { DotsParameters };

const TapBtn = styled.button`
  height: 40px;
  width: 40px;
  font-size: 1.5rem;
  border-radius: 50%;
`;

const ControlsWrapper = styled.div`
 position: absolute;
  left: 10px;
  top: -200px;
  z-index: 100;
`;