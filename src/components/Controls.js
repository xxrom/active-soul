import React, { memo, useState, useCallback, useEffect } from 'react';

import { PlayStop } from '../common/PlayStop';
import { Volume } from '.';
import song from '../assets/1.webm';

export const PLAY = 'PLAY';
export const PAUSE = 'PAUSE';
const AutoPlay = false;

const Controls = memo(() => {
  const [state, setState] = useState(() => AutoPlay ? PLAY : PAUSE);
  const [player, setPlayer] = useState(new Audio(song));

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
          player.play();
          break;

        case PAUSE:
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

  // const onPlay = useCallback(() => setState(PLAY), [setState]);
  // const onPause = useCallback(() => setState(PAUSE), [setState]);
  const onToggleSong = useCallback(() => state === PLAY ? setState(PAUSE) : setState(PLAY), [setState, state]);

  return (<div>
    <PlayStop onToggle={onToggleSong} state={state} />
    {/* <div>
      <button onClick={onPlay}>Play</button>
      <button onClick={onPause}>Pause</button>
    </div> */}
    <Volume setVolume={setVolume} volume={volume} />
  </div>);
});

export { Controls };
