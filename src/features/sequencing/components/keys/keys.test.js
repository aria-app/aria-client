import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import shared from '../../../shared';
import { Keys } from './keys';

const { scale } = shared.constants;

describe('Keys Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Keys, {
      onNotePreview: () => {},
    }));
    expect(component.length).toEqual(1);
  });

  describe('element __key', () => {
    it('should be defined once for each step in scale', () => {
      const component = shallow(h(Keys, {
        onNotePreview: () => {},
      }));
      const keyEls = component.find('.keys__key');
      expect(keyEls.length).toEqual(scale.length);
    });

    it('should have class name corresponding to step', () => {
      const component = shallow(h(Keys, {
        onNotePreview: () => {},
      }));
      const keyEls = component.find('.keys__key');
      expect(keyEls.first().prop('className')).toContain('keys__key--b');
    });

    it('should invoke note preview event with corresponding step on mouse up', () => {
      const onNotePreview = sinon.spy();
      const component = shallow(h(Keys, {
        onNotePreview,
      }));
      const keyEls = component.find('.keys__key');
      const expected = {
        y: scale[0].y,
      };
      keyEls.first().simulate('mouseup');
      expect(onNotePreview.lastCall.args).toEqual([expected]);
    });
  });

  describe('element __key__label', () => {
    it('should be defined once for each step in scale', () => {
      const component = shallow(h(Keys, {
        onNotePreview: () => {},
      }));
      const keyLabelEls = component.find('.keys__key__label');
      expect(keyLabelEls.length).toEqual(scale.length);
    });

    it('should contain step name', () => {
      const component = shallow(h(Keys, {
        onNotePreview: () => {},
      }));
      const keyLabelEls = component.find('.keys__key__label');
      expect(keyLabelEls.first().text()).toEqual(scale[0].name);
    });
  });
});
