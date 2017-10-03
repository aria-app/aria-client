import range from 'lodash/fp/range';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import { hideIf } from '../../helpers';
import { RulerEighth } from '../ruler-eighth/ruler-eighth';
import './ruler-measure.scss';

const measurePreviewWidth = 64;

export class RulerMeasure extends React.PureComponent {
  static propTypes = {
    isLastMeasure: PropTypes.bool.isRequired,
    measureIndex: PropTypes.number.isRequired,
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
            eighthIndex,
          }),
        ),
      ),
    ]);
  }

  getStyle = () => ({
    transform: `translateX(${this.props.measureIndex * measurePreviewWidth}px)`,
  });
}
