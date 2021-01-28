import React from 'react';
import { useRecoilState } from 'recoil';

import Dawww from '../../../dawww';
import * as atoms from '../atoms';
import DawwwContext from '../contexts/DawwwContext';
import dawww from '../dawww';

export default function DawwwProvider(props) {
  const [instance, setInstance] = React.useState(null);
  const [, setPosition] = useRecoilState(atoms.position);

  const initializeDawww = React.useCallback(() => {
    // const instance = new Dawww({});
    const newInstance = dawww;

    setInstance(newInstance);

    newInstance.onPositionChange(setPosition);
  }, [setInstance, setPosition]);

  const setDawwwPosition = React.useCallback(
    (position) => {
      instance.setPosition(position);
    },
    [instance],
  );

  return (
    <DawwwContext.Provider
      value={{
        atoms,
        constants: {},
        helpers: {
          addPoints: Dawww.addPoints,
        },
        initializeDawww,
        setDawwwPosition,
      }}
      {...props}
    />
  );
}
