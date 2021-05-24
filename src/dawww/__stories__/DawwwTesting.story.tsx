import { ReactElement, useCallback, useEffect, useState } from 'react';

// import sampleSong from '../examples/loadTestingSong.json';
// import sampleSongAlt from '../examples/sampleSongAlt';
import Dawww from '../index';

const dawww = Dawww({
  // song: sampleSong,
});

export function DawwwTesting(): ReactElement {
  const [playbackState, setPlaybackState] = useState('STOPPED');
  const [position, setPosition] = useState(0);

  useEffect(() => {
    dawww.onPositionChange((position) => {
      setPosition(position);
    });

    dawww.onPlaybackStateChange((playbackState) => {
      setPlaybackState(playbackState);
    });
  }, []);

  const playPause = useCallback(() => {
    if (playbackState === 'STARTED') {
      dawww.pause();
    } else {
      dawww.start();
    }
  }, [playbackState]);

  const setSampleSong = useCallback(() => {
    // dawww.updateSong(sampleSong);
  }, []);

  const setSampleSongAlt = useCallback(() => {
    // dawww.updateSong(sampleSongAlt);
  }, []);

  const stop = useCallback(() => {
    dawww.stop();
  }, []);

  return (
    <div>
      <div>{playbackState}</div>
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          height: '20px',
          position: 'relative',
          width: `${0 * 64}px`,
          // width: `${sampleSong.measureCount * 64}px`,
        }}
      >
        <div
          style={{
            left: `${2 * position}px`,
            position: 'absolute',
            top: 0,
            width: '100px',
          }}
        >
          | {position}
        </div>
      </div>
      <div>
        <button onClick={playPause}>
          {playbackState === 'STARTED' ? 'pause' : 'play'}
        </button>
        <button onClick={stop}>stop</button>
        <button onClick={setSampleSong}>set sample song</button>
        <button onClick={setSampleSongAlt}>set alt song</button>
      </div>
    </div>
  );
}
