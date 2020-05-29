import React, { memo, useState, useCallback, useEffect } from 'react';

import { PlayStop } from '../common/PlayStop';
import song from '../assets/1.webm';

export const PLAY = 'PLAY';
export const PAUSE = 'PAUSE';
const AutoPlay = false;

const Controls = memo(() => {
  const [state, setState] = useState(() => AutoPlay ? PLAY : PAUSE);
  const [player, setPlayer] = useState(new Audio(song));

  const [volume, setVolume] = useState(25);

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
      console.log(`player inited`, player);
      // let playedPromise;

      switch (state) {
        case PLAY:
          console.log(`play!`);
          // playedPromise =
          player.play();
          break;

        case PAUSE:
          console.log(`stop!`);
          // playedPromise =
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

  const onPlay = useCallback(() => setState(PLAY), [setState]);
  const onPause = useCallback(() => setState(PAUSE), [setState]);
  const onToggleSong = useCallback(() => state === PLAY ? setState(PAUSE) : setState(PLAY), [setState, state]);


  const onChangeVolume = useCallback(() => {
    if (player.volume === 1) {
      player.volume = 0.25;
    } else {
      player.volume += 0.25;
    }

    setVolume(player.volume * 100);
  }, [player, setVolume]);


  return (<div>
    <div>
      {state}
    </div>
    <PlayStop onToggle={onToggleSong} state={state} />
    <button onClick={onPlay}>Play</button>
    <button onClick={onPause}>Pause</button>
    <button onClick={onChangeVolume}>{`Volume: ${volume}%`}</button>
  </div>);
});

export { Controls };
