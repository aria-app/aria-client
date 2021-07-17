import { Box } from 'aria-ui';
import range from 'lodash/fp/range';
import { FC, memo, useMemo } from 'react';

export interface SlotsProps {
  measureCount: number;
  octaveCount: number;
}

export const Slots: FC<SlotsProps> = memo((props) => {
  const { measureCount, octaveCount } = props;
  const scaleLength = octaveCount * 12;

  const slots = useMemo(
    () =>
      range(0, measureCount * 4 * 8).map((columnNumber) =>
        range(0, scaleLength).map((rowNumber) =>
          getSlot(columnNumber, rowNumber),
        ),
      ),
    [measureCount, scaleLength],
  );

  const stripes = useMemo(
    () =>
      range(0, measureCount * 2).map(
        (n) => `
          <rect
            fill="black"
            opacity="0.025"
            rx="4"
            ry="4"
            x="${(2 * n + 1) * 320}"
            y="0"
            width="320"
            height="${scaleLength * 40}"
          ></rect>
        `,
      ),
    [measureCount, scaleLength],
  );

  return (
    <Box
      dangerouslySetInnerHTML={{
        __html: `
        <svg
          width="${measureCount * 4 * 8 * 40}"
          height="${scaleLength * 40}"
          viewBox="0 0 ${measureCount * 4 * 8 * 40} ${scaleLength * 40}">
          ${stripes}
          ${slots}
        </svg>
      `,
      }}
      sx={{
        flex: '1 0 auto',
        minHeight: '100%',
      }}
    />
  );
});

function getSlot(column, row) {
  const isEven = (x) => x % 2 === 0;
  const fill = isEven(Math.floor(column / 8)) ? 'black' : 'black';
  const size = 4;
  return `
    <rect
      fill="${fill}"
      opacity="0.26"
      rx="2"
      ry="2"
      x="${column * 40 + (40 - size) / 2}"
      y="${row * 40 + (40 - size) / 2}"
      width="${size}"
      height="${size}"
    ></rect>
  `;
}
