import React from 'react';
import { useRecoilState } from 'recoil';

import Dawww from '../../../dawww';
import * as atoms from '../atoms';
import AudioContext from '../contexts/AudioContext';
import dawww from '../dawww';

export default function AudioProvider(props) {
  const [instance, setInstance] = React.useState(null);
  const [, setPosition] = useRecoilState(atoms.position);

  const initializeAudio = React.useCallback(() => {
    // const instance = new Dawww({});
    const newInstance = dawww;

    setInstance(newInstance);

    newInstance.onPositionChange(setPosition);
  }, [setInstance, setPosition]);

  const setAudioPosition = React.useCallback(
    (position) => {
      instance.setPosition(position);
    },
    [instance],
  );

  return (
    <AudioContext.Provider
      value={{
        atoms,
        constants: {},
        helpers: {
          addPoints: Dawww.addPoints,
        },
        initializeAudio,
        setAudioPosition,
      }}
      {...props}
    />
  );
}
