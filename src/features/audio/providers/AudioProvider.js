import React from 'react';
import { useRecoilState } from 'recoil';

import * as atoms from '../atoms';
import AudioContext from '../contexts/AudioContext';
import dawww from '../dawww';

export default function AudioProvider(props) {
  const audioManager = React.useRef(dawww);
  const [, setPosition] = useRecoilState(atoms.position);

  React.useEffect(() => {
    audioManager.current.onPositionChange(setPosition);
  }, [audioManager, setPosition]);

  return (
    <AudioContext.Provider
      value={{
        atoms,
        audioManager: audioManager.current,
      }}
      {...props}
    />
  );
}
