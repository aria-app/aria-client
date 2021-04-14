import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Button from '../Button';
import ThemeProvider from '../ThemeProvider';

describe('Button', () => {
  it('should render correctly', () => {
    const { getByRole } = render(
      <ThemeProvider>
        <Button>Some Text</Button>
      </ThemeProvider>,
    );

    expect(getByRole('button')).toHaveTextContent('Some Text');
  });

  it('should accept click handlers', () => {
    const handleClick = jest.fn();

    render(
      <ThemeProvider>
        <Button onClick={handleClick}>Some Text</Button>
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText('Some Text'));

    expect(handleClick).toHaveBeenCalled();
  });
});
