import { useRecoilValue } from 'recoil';

import { position } from '../atoms';

export default function usePosition(): number {
  return useRecoilValue(position);
}
