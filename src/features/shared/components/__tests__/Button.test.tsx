import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '../Button';
import ThemeProvider from '../ThemeProvider';

describe('Button', () => {
  test('should contain passed text', () => {
    render(
      <ThemeProvider>
        <Button>Some Text</Button>
      </ThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveTextContent('Some Text');
  });

  test('should respond to clicks when not disabled', () => {
    const handleClick = jest.fn();

    render(
      <ThemeProvider>
        <Button onClick={handleClick}>Some Text</Button>
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText('Some Text'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('should not respond to clicks when disabled', () => {
    const handleClick = jest.fn();

    render(
      <ThemeProvider>
        <Button disabled onClick={handleClick}>
          Some Text
        </Button>
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText('Some Text'));

    expect(handleClick).not.toHaveBeenCalled();
  });
});
