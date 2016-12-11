import _ from 'lodash';
import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Ruler } from './ruler';

describe('Ruler Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Ruler, {
      ...getRequiredProps(),
    }));
    expect(component.length).toEqual(1);
  });

  describe('element __body', () => {
    it('should be defined', () => {
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
      }));
      const bodyEl = component.find('.ruler__body');
      expect(bodyEl.length).toEqual(1);
    });
  });

  describe('element __body__header', () => {
    it('should be defined', () => {
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
      }));
      const bodyHeaderEl = component.find('.ruler__body__header');
      expect(bodyHeaderEl.length).toEqual(1);
    });
  });

  describe('element __body__measures', () => {
    it('should be defined', () => {
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
      }));
      const bodyMeasuresEl = component.find('.ruler__body__measures');
      expect(bodyMeasuresEl.length).toEqual(1);
    });

    it('should have width equal to measure count * notes per measure * 2px per note', () => {
      const measureCount = 4;
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
        measureCount,
      }));
      const bodyMeasuresEl = component.find('.ruler__body__measures');
      expect(bodyMeasuresEl.prop('style').width).toEqual(measureCount * 32 * 2);
    });

    it('should invoke play event on mouse down', () => {
      const onPlay = sinon.spy();
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
        onPlay,
      }));
      const bodyMeasuresEl = component.find('.ruler__body__measures');
      bodyMeasuresEl.simulate('mousedown', {
        persist: () => {},
        target: {},
      });
      expect(onPlay.called).toEqual(true);
    });

    it('should invoke position set event with internal mouse position / (notes per measure * 2px per note) on mouse down', () => {
      const onPositionSet = sinon.spy();
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
        onPositionSet,
      }));
      const bodyMeasuresEl = component.find('.ruler__body__measures');
      const e = {
        persist: () => {},
        pageX: 200,
        target: {
          offsetLeft: 60,
        },
      };
      const expected = (e.pageX - e.target.offsetLeft) / (32 * 2);
      bodyMeasuresEl.simulate('mousedown', e);
      expect(_.last(onPositionSet.args)[0]).toEqual(expected);
    });

    it('should invoke pause event on mouse down', () => {
      const onPause = sinon.spy();
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
        onPause,
      }));
      const bodyMeasuresEl = component.find('.ruler__body__measures');
      bodyMeasuresEl.simulate('mousedown', {
        persist: () => {},
        target: {},
      });
      expect(onPause.called).toEqual(true);
    });
  });

  describe('element __body__measures__measure', () => {
    it('should be defined once for each measure', () => {
      const measureCount = 4;
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
        measureCount,
      }));
      const bodyMeasuresMeasureEls = component.find('.ruler__body__measures__measure');
      expect(bodyMeasuresMeasureEls.length).toEqual(measureCount);
    });

    it('should have key equal to corresponding measure index', () => {
      const measureCount = 4;
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
        measureCount,
      }));
      const bodyMeasuresMeasureEls = component.find('.ruler__body__measures__measure');
      expect(bodyMeasuresMeasureEls.at(0).key()).toEqual('0');
      expect(bodyMeasuresMeasureEls.at(1).key()).toEqual('1');
      expect(bodyMeasuresMeasureEls.at(2).key()).toEqual('2');
      expect(bodyMeasuresMeasureEls.at(3).key()).toEqual('3');
    });

    it('should have translateX equal to measure index * notes per measure * 2px per note', () => {
      const measureCount = 4;
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
        measureCount,
      }));
      const bodyMeasuresMeasureEls = component.find('.ruler__body__measures__measure');
      expect(bodyMeasuresMeasureEls.at(0).prop('style').transform).toEqual('translateX(0px)');
      expect(bodyMeasuresMeasureEls.at(1).prop('style').transform).toEqual('translateX(64px)');
      expect(bodyMeasuresMeasureEls.at(2).prop('style').transform).toEqual('translateX(128px)');
      expect(bodyMeasuresMeasureEls.at(3).prop('style').transform).toEqual('translateX(192px)');
    });
  });

  describe('element __body__measures__measure__label', () => {
    it('should be defined once for each measure - 1', () => {
      const measureCount = 4;
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
        measureCount,
      }));
      const bodyMeasuresMeasureLabelEls = component.find('.ruler__body__measures__measure__label');
      expect(bodyMeasuresMeasureLabelEls.length).toEqual(measureCount - 1);
    });

    it('should not be defined in last measure', () => {
      const measureCount = 4;
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
        measureCount,
      }));
      const bodyMeasuresMeasureEls = component.find('.ruler__body__measures__measure');
      expect(bodyMeasuresMeasureEls.at(0).find('.ruler__body__measures__measure__label').length).toEqual(1);
      expect(bodyMeasuresMeasureEls.at(1).find('.ruler__body__measures__measure__label').length).toEqual(1);
      expect(bodyMeasuresMeasureEls.at(2).find('.ruler__body__measures__measure__label').length).toEqual(1);
      expect(bodyMeasuresMeasureEls.at(3).find('.ruler__body__measures__measure__label').length).toEqual(0);
    });

    it('should contain corresponding label index + 1', () => {
      const measureCount = 4;
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
        measureCount,
      }));
      const bodyMeasuresMeasureLabelEls = component.find('.ruler__body__measures__measure__label');
      expect(bodyMeasuresMeasureLabelEls.at(0).text()).toEqual('1');
      expect(bodyMeasuresMeasureLabelEls.at(1).text()).toEqual('2');
      expect(bodyMeasuresMeasureLabelEls.at(2).text()).toEqual('3');
    });
  });

  describe('element __body__measures__measure__eighth', () => {
    it('should be defined (once for each measure - 1) * (eighths per measure - 1)', () => {
      const measureCount = 4;
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
        measureCount,
      }));
      const bodyMeasuresMeasureEighthEls = component.find('.ruler__body__measures__measure__eighth');
      expect(bodyMeasuresMeasureEighthEls.length).toEqual((measureCount - 1) * 7);
    });

    it('should not be defined in last measure', () => {
      const measureCount = 4;
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
        measureCount,
      }));
      const bodyMeasuresMeasureEls = component.find('.ruler__body__measures__measure');
      expect(bodyMeasuresMeasureEls.at(0).find('.ruler__body__measures__measure__eighth').length).toEqual(7);
      expect(bodyMeasuresMeasureEls.at(1).find('.ruler__body__measures__measure__eighth').length).toEqual(7);
      expect(bodyMeasuresMeasureEls.at(2).find('.ruler__body__measures__measure__eighth').length).toEqual(7);
      expect(bodyMeasuresMeasureEls.at(3).find('.ruler__body__measures__measure__eighth').length).toEqual(0);
    });

    it('should have translateX equal to (eighth index + 1) * notes per measure * 2px per note / eighths per measure', () => {
      const measureCount = 4;
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
        measureCount,
      }));
      const bodyMeasuresMeasureEighthEls = component.find('.ruler__body__measures__measure__eighth');
      const expected = `translateX(${(((1 * 32) * 2) / 8)}px)`;
      expect(bodyMeasuresMeasureEighthEls.at(0).prop('style').transform).toEqual(expected);
    });
  });

  describe('element __song-length-button', () => {
    it('should be defined', () => {
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
      }));
      const songLengthButtonEl = component.find('.ruler__song-length-button');
      expect(songLengthButtonEl.length).toEqual(1);
    });
  });

  describe('element __song-length-button__side--left', () => {
    it('should be defined', () => {
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
      }));
      const songLengthButtonSideLeftEl = component.find('.ruler__song-length-button__side--left');
      expect(songLengthButtonSideLeftEl.length).toEqual(1);
    });

    it('should invoke song shorten event when clicked', () => {
      const onSongShorten = sinon.spy();
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
        onSongShorten,
      }));
      const songLengthButtonSideLeftEl = component.find('.ruler__song-length-button__side--left');
      songLengthButtonSideLeftEl.simulate('click');
      expect(onSongShorten.called).toEqual(true);
    });
  });

  describe('child component __song-length-button__side--left__icon', () => {
    it('should be defined', () => {
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
      }));
      const songLengthButtonSideLeftIconEl = component.find('.ruler__song-length-button__side--left__icon');
      expect(songLengthButtonSideLeftIconEl.length).toEqual(1);
    });

    it('should have chevron left icon', () => {
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
      }));
      const songLengthButtonSideLeftIconEl = component.find('.ruler__song-length-button__side--left__icon');
      expect(songLengthButtonSideLeftIconEl.prop('icon')).toEqual('chevron-left');
    });

    it('should have small size', () => {
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
      }));
      const songLengthButtonSideLeftIconEl = component.find('.ruler__song-length-button__side--left__icon');
      expect(songLengthButtonSideLeftIconEl.prop('size')).toEqual('small');
    });
  });

  describe('element __song-length-button__side--right', () => {
    it('should be defined', () => {
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
      }));
      const songLengthButtonSideRightEl = component.find('.ruler__song-length-button__side--right');
      expect(songLengthButtonSideRightEl.length).toEqual(1);
    });

    it('should invoke song shorten event when clicked', () => {
      const onSongExtend = sinon.spy();
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
        onSongExtend,
      }));
      const songLengthButtonSideRightEl = component.find('.ruler__song-length-button__side--right');
      songLengthButtonSideRightEl.simulate('click');
      expect(onSongExtend.called).toEqual(true);
    });
  });

  describe('child component __song-length-button__side--right__icon', () => {
    it('should be defined', () => {
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
      }));
      const songLengthButtonSideRightIconEl = component.find('.ruler__song-length-button__side--right__icon');
      expect(songLengthButtonSideRightIconEl.length).toEqual(1);
    });

    it('should have chevron right icon', () => {
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
      }));
      const songLengthButtonSideRightIconEl = component.find('.ruler__song-length-button__side--right__icon');
      expect(songLengthButtonSideRightIconEl.prop('icon')).toEqual('chevron-right');
    });

    it('should have small size', () => {
      const component = shallow(h(Ruler, {
        ...getRequiredProps(),
      }));
      const songLengthButtonSideRightIconEl = component.find('.ruler__song-length-button__side--right__icon');
      expect(songLengthButtonSideRightIconEl.prop('size')).toEqual('small');
    });
  });
});

function getRequiredProps() {
  return {
    measureCount: 1,
    onPause: () => {},
    onPlay: () => {},
    onPositionSet: () => {},
    onSongExtend: () => {},
    onSongShorten: () => {},
    playbackState: '',
  };
}
