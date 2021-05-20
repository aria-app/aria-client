import styled from '@emotion/styled';
import { ElementType, ReactElement, ReactNode } from 'react';

const Root = styled.span<Partial<TextProps>>(
  ({ color = 'text', theme, variant = 'body' }) => ({
    color: {
      background: theme.palette.background.default,
      border: theme.palette.divider,
      error: theme.palette.error.main,
      paper: theme.palette.background.paper,
      primary: theme.palette.primary.main,
      subtle: theme.palette.text.secondary,
      success: theme.palette.success.main,
      text: theme.palette.text.primary,
      warning: theme.palette.warning.main,
    }[color],
    fontSize: {
      body: `${16 / 16}rem`,
      bodySmall: `${12 / 16}rem`,
      display: `${96 / 16}rem`,
      headline: `${24 / 16}rem`,
      label: `${16 / 16}rem`,
    }[variant],
    fontWeight: {
      body: 400,
      bodySmall: 400,
      display: 600,
      headline: 400,
      label: 600,
    }[variant],
    lineHeight: {
      body: 1,
      bodySmall: 1,
      display: 1,
      headline: 1,
      label: 1,
    }[variant],
  }),
);

export type TextProps = {
  children: ReactNode;
  color?: string;
  component: ElementType;
  variant?: string;
  [key: string]: any;
};

export function Text(props: TextProps): ReactElement {
  const { children, component = 'span', ...rest } = props;

  return (
    <Root as={component} {...rest}>
      {children}
    </Root>
  );
}
