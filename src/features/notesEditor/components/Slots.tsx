import Dawww from 'dawww';
import range from 'lodash/fp/range';
import PropTypes from 'prop-types';
import React from 'react';
import withStyles from '@material-ui/styles/withStyles';

const styles = {
  root: {
    flex: '1 0 auto',
    minHeight: '100%',
  },
};

function Slots(props) {
  const { classes, measureCount } = props;

  const slots = React.useMemo(
    () =>
      range(0, measureCount * 4 * 8).map(columnNumber =>
        range(0, Dawww.SCALE.length).map(rowNumber =>
          getSlot(columnNumber, rowNumber),
        ),
      ),
    [measureCount],
  );

  const stripes = React.useMemo(
    () =>
      range(0, measureCount * 2).map(
        n => `
          <rect
            fill="black"
            opacity="0.025"
            rx="4"
            ry="4"
            x="${(2 * n + 1) * 320}"
            y="0"
            width="320"
            height="${Dawww.SCALE.length * 40}"
          ></rect>
        `,
      ),
    [measureCount],
  );

  return (
    <div
      className={classes.root}
      dangerouslySetInnerHTML={{
        __html: `
        <svg
          width="${measureCount * 4 * 8 * 40}"
          height="${Dawww.SCALE.length * 40}"
          viewBox="0 0 ${measureCount * 4 * 8 * 40} ${Dawww.SCALE.length * 40}">
          ${stripes}
          ${slots}
        </svg>
      `,
      }}
    />
  );
}

Slots.propTypes = {
  classes: PropTypes.object,
  measureCount: PropTypes.number,
};

export default React.memo(withStyles(styles)(Slots));

function getSlot(column, row) {
  const isEven = x => x % 2 === 0;
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
