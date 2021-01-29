import React from 'react';

import SongContext from '../contexts/SongContext';

export default function useSong() {
  return React.useContext(SongContext);
}
