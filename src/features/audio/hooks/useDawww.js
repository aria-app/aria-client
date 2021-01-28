import React from 'react';

import DawwwContext from '../contexts/DawwwContext';

export default function useDawww() {
  return React.useContext(DawwwContext);
}
