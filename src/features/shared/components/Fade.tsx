import { HTMLAttributes } from 'react';
import { FC } from 'react';

export interface FadeProps extends HTMLAttributes<HTMLElement> {
  in?: boolean;
}

export const Fade: FC<FadeProps> = (props) => {
  const { children, in: inProp } = props;

  return inProp ? <>{children}</> : null;
};
