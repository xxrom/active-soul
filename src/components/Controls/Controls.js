import React, { memo, useState, useCallback, useEffect } from 'react';
import { styled } from 'linaria/react';

import { PlayStop } from '../../common/PlayStop';
import { Volume } from './Volume';
import song from '../../assets/1.webm';
import { time } from '../Background/ModSwitcher';

export const PLAY = 'PLAY';
export const PAUSE = 'PAUSE';
const AutoPlay = false;

const Controls = memo(({ setTime }) => {
  const [state, setState] = useState(() => AutoPlay ? PLAY : PAUSE);
  const [player] = useState(new Audio(song));

  const [volume, setVolume] = useState(25);

  useEffect(() => {
    player.volume = volume / 100;
  }, [player, volume]);

  useEffect(() => {
    if (!player) {
      return;
    }
    player.loop = true;
  }, [player]);

  const interactPlayer = useCallback((player, state) => {
    if (!player) {
      console.log(`player not inited!`, player);
    }

    try {
      switch (state) {
        case PLAY:
          setTime(time.play);
          player.play();
          break;

        case PAUSE:
          setTime(time.pause);
          player.pause();
          break;

        default:
          console.warn(`WARN: unhandled player state action!`);
      }
    } catch (err) {
      console.log(`Error:`, err);
    }
  }, []);

  useEffect(() => interactPlayer(player, state), [interactPlayer, player, state]);

  const onToggleSong = useCallback(() => state === PLAY ? setState(PAUSE) : setState(PLAY), [setState, state]);

  return (<Center>
    <PlayStop onToggle={onToggleSong} state={state} />
    <Volume setVolume={setVolume} volume={volume} />
  </Center>);
});

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 60px;
  z-index: 2;
`;

export { Controls };
