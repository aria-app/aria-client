import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { BPMModal, getBPMRangeItems } from './bpm-modal';

describe('BPMModal Component', () => {
  it('should be defined', () => {
    const component = shallow(h(BPMModal, {
      ...getRequiredProps(),
    }));
    expect(component.length).toEqual(1);
  });

  it('should have "done" as confirm text', () => {
    const component = shallow(h(BPMModal, {
      ...getRequiredProps(),
    }));
    expect(component.prop('confirmText')).toEqual('done');
  });

  it('should have correct value for is open', () => {
    const isOpen = true;
    const component = shallow(h(BPMModal, {
      ...getRequiredProps(),
      isOpen,
    }));
    expect(component.prop('isOpen')).toEqual(isOpen);
  });

  it('should have correct value for on confirm', () => {
    const onConfirm = () => {};
    const component = shallow(h(BPMModal, {
      ...getRequiredProps(),
      onConfirm,
    }));
    expect(component.prop('onConfirm')).toEqual(onConfirm);
  });

  it('should have "Set BPM" as title text', () => {
    const component = shallow(h(BPMModal, {
      ...getRequiredProps(),
    }));
    expect(component.prop('titleText')).toEqual('Set BPM');
  });

  describe('element __content', () => {
    it('should be defined', () => {
      const component = shallow(h(BPMModal, {
        ...getRequiredProps(),
      }));
      const contentEl = component.find('.bpm-modal__content');
      expect(contentEl.length).toEqual(1);
    });
  });

  describe('child component __content__dropdown-list', () => {
    it('should be defined', () => {
      const component = shallow(h(BPMModal, {
        ...getRequiredProps(),
      }));
      const contentDropdownListEl = component.find('.bpm-modal__content__dropdown-list');
      expect(contentDropdownListEl.length).toEqual(1);
    });

    it('should have bpm range items as items', () => {
      const component = shallow(h(BPMModal, {
        ...getRequiredProps(),
      }));
      const contentDropdownListEl = component.find('.bpm-modal__content__dropdown-list');
      expect(contentDropdownListEl.prop('items')).toEqual(getBPMRangeItems());
    });

    it('should have correct value for selected id', () => {
      const bpm = 120;
      const component = shallow(h(BPMModal, {
        ...getRequiredProps(),
        bpm,
      }));
      const contentDropdownListEl = component.find('.bpm-modal__content__dropdown-list');
      expect(contentDropdownListEl.prop('selectedId')).toEqual(bpm);
    });

    it('should have correct value for selected id change event', () => {
      const component = shallow(h(BPMModal, {
        ...getRequiredProps(),
      }));
      const contentDropdownListEl = component.find('.bpm-modal__content__dropdown-list');
      const { handleContentDropdownListSelect } = component.instance();
      expect(contentDropdownListEl.prop('onSelectedIdChange')).toEqual(handleContentDropdownListSelect);
    });
  });

  describe('method handleContentDropdownListSelect', () => {
    it('should invoke BPM change event with value', () => {
      const onBPMChange = sinon.spy();
      const component = shallow(h(BPMModal, {
        ...getRequiredProps(),
        onBPMChange,
      }));
      const value = 200;
      component.instance().handleContentDropdownListSelect(value);
      expect(onBPMChange.lastCall.args).toEqual([value]);
    });
  });
});

function getRequiredProps() {
  return {
    bpm: 150,
    isOpen: false,
    onBPMChange: () => {},
    onConfirm: () => {},
  };
}
