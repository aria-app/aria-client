import { useRecoilValue } from 'recoil';

import { position } from '../atoms';

export function usePosition(): number {
  return useRecoilValue(position);
}
