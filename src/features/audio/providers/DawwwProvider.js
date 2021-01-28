import React from 'react';
import { useRecoilState } from 'recoil';

import Dawww from '../../../dawww';
import * as atoms from '../atoms';
import DawwwContext from '../contexts/DawwwContext';
import dawww from '../dawww';

export default function DawwwProvider(props) {
  const [dawwwInstance, setDawwwInstance] = React.useState(null);
  const [, setPosition] = useRecoilState(atoms.position);

  const initializeDawwwInstance = React.useCallback(() => {
    // const instance = new Dawww({});
    const instance = dawww;

    setDawwwInstance(instance);

    instance.onPositionChange(setPosition);
  }, [setDawwwInstance, setPosition]);

  return (
    <DawwwContext.Provider
      value={{
        atoms,
        constants: {},
        dawwwInstance,
        helpers: {
          addPoints: Dawww.addPoints,
        },
        initializeDawwwInstance,
      }}
      {...props}
    />
  );
}
