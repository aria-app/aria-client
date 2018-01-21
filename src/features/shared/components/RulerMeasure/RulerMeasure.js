import range from 'lodash/fp/range';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import { hideIf } from 'react-render-helpers';
import { RulerEighth } from '../RulerEighth/RulerEighth';
import './RulerMeasure.scss';

export class RulerMeasure extends React.PureComponent {
  static propTypes = {
    isLastMeasure: PropTypes.bool.isRequired,
    measureIndex: PropTypes.number.isRequired,
    measureWidth: PropTypes.number.isRequired,
  }

  render() {
    return h('.ruler-measure', {
      style: this.getStyle(),
    }, [
      hideIf(this.props.isLastMeasure)(
        h('.ruler-measure__label', [
          this.props.measureIndex + 1,
        ]),
      ),
      hideIf(this.props.isLastMeasure)(
        range(0, 7).map(eighthIndex =>
          h(RulerEighth, {
            key: eighthIndex,
            measureWidth: this.props.measureWidth,
            eighthIndex,
          }),
        ),
      ),
    ]);
  }

  getStyle = () => ({
    transform: `translateX(${this.props.measureIndex * this.props.measureWidth}px)`,
  });
}
