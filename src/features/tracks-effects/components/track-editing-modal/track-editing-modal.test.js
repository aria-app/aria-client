import h from 'react-hyperscript';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { getSynthTypeList, TrackEditingModal } from './track-editing-modal';

describe('Track Editing Modal Component', () => {
  it('should be defined', () => {
    const component = shallow(h(TrackEditingModal, {
      ...getRequiredProps(),
    }));
    expect(component.length).toEqual(1);
  });

  it('should have "done" as confirm text', () => {
    const component = shallow(h(TrackEditingModal, {
      ...getRequiredProps(),
    }));
    expect(component.prop('confirmText')).toEqual('done');
  });

  it('should be open if staged track is not empty', () => {
    const stagedTrack = {
      id: 'my-track',
    };
    const component = shallow(h(TrackEditingModal, {
      ...getRequiredProps(),
      stagedTrack,
    }));
    expect(component.prop('isOpen')).toEqual(true);
  });

  it('should not be open if staged track is empty', () => {
    const stagedTrack = {};
    const component = shallow(h(TrackEditingModal, {
      ...getRequiredProps(),
      stagedTrack,
    }));
    expect(component.prop('isOpen')).toEqual(false);
  });

  it('should have dismiss event as on confirm', () => {
    const onDismiss = () => {};
    const stagedTrack = {
      id: 'my-track',
    };
    const component = shallow(h(TrackEditingModal, {
      ...getRequiredProps(),
      onDismiss,
      stagedTrack,
    }));
    expect(component.prop('onConfirm')).toEqual(onDismiss);
  });

  it('should "Edit Track" as title text', () => {
    const stagedTrack = {
      id: 'my-track',
    };
    const component = shallow(h(TrackEditingModal, {
      ...getRequiredProps(),
      stagedTrack,
    }));
    expect(component.prop('titleText')).toEqual('Edit Track');
  });

  describe('element __content', () => {
    it('should be defined', () => {
      const component = shallow(h(TrackEditingModal, {
        ...getRequiredProps(),
      }));
      const contentEl = component.find('.track-editing-modal__content');
      expect(contentEl.length).toEqual(1);
    });
  });

  describe('element __content__synth-dropdown', () => {
    it('should be defined', () => {
      const component = shallow(h(TrackEditingModal, {
        ...getRequiredProps(),
      }));
      const contentSynthDropdownEl = component.find('.track-editing-modal__content__synth-dropdown');
      expect(contentSynthDropdownEl.length).toEqual(1);
    });
  });

  describe('element __content__synth-dropdown__label', () => {
    it('should be defined', () => {
      const component = shallow(h(TrackEditingModal, {
        ...getRequiredProps(),
      }));
      const contentSynthDropdownLabelEl = component.find('.track-editing-modal__content__synth-dropdown__label');
      expect(contentSynthDropdownLabelEl.length).toEqual(1);
    });

    it('should contain "Synth Type:"', () => {
      const component = shallow(h(TrackEditingModal, {
        ...getRequiredProps(),
      }));
      const contentSynthDropdownLabelEl = component.find('.track-editing-modal__content__synth-dropdown__label');
      expect(contentSynthDropdownLabelEl.text()).toEqual('Synth Type:');
    });
  });

  describe('element __content__synth-dropdown__list', () => {
    it('should be defined', () => {
      const component = shallow(h(TrackEditingModal, {
        ...getRequiredProps(),
      }));
      const contentSynthDropdownListEl = component.find('.track-editing-modal__content__synth-dropdown__list');
      expect(contentSynthDropdownListEl.length).toEqual(1);
    });

    it('should have correct items', () => {
      const component = shallow(h(TrackEditingModal, {
        ...getRequiredProps(),
      }));
      const contentSynthDropdownListEl = component.find('.track-editing-modal__content__synth-dropdown__list');
      expect(contentSynthDropdownListEl.prop('items')).toEqual(getSynthTypeList());
    });

    it('should have selected id equal to staged track synth type', () => {
      const synthType = 'square';
      const stagedTrack = {
        id: 'my-track',
        synthType,
      };
      const component = shallow(h(TrackEditingModal, {
        ...getRequiredProps(),
        stagedTrack,
      }));
      const contentSynthDropdownListEl = component.find('.track-editing-modal__content__synth-dropdown__list');
      expect(contentSynthDropdownListEl.prop('selectedId')).toEqual(synthType);
    });

    it('should have correct selected item change handler', () => {
      const component = shallow(h(TrackEditingModal, {
        ...getRequiredProps(),
      }));
      const contentSynthDropdownListEl = component.find('.track-editing-modal__content__synth-dropdown__list');
      const { handleContentSynthDropdownListSelectedIdChange: handler } = component.instance();
      expect(contentSynthDropdownListEl.prop('onSelectedIdChange')).toEqual(handler);
    });
  });

  describe('element __content__delete-button', () => {
    it('should be defined', () => {
      const component = shallow(h(TrackEditingModal, {
        ...getRequiredProps(),
      }));
      const contentDeleteButtonEl = component.find('.track-editing-modal__content__delete-button');
      expect(contentDeleteButtonEl.length).toEqual(1);
    });

    it('should have correct click event handler', () => {
      const component = shallow(h(TrackEditingModal, {
        ...getRequiredProps(),
      }));
      const contentDeleteButtonEl = component.find('.track-editing-modal__content__delete-button');
      const { handleContentDeleteButtonClick } = component.instance();
      expect(contentDeleteButtonEl.prop('onClick')).toEqual(handleContentDeleteButtonClick);
    });

    it('should have "delete" as text', () => {
      const component = shallow(h(TrackEditingModal, {
        ...getRequiredProps(),
      }));
      const contentDeleteButtonEl = component.find('.track-editing-modal__content__delete-button');
      expect(contentDeleteButtonEl.prop('text')).toEqual('delete');
    });
  });

  describe('method handleContentSynthDropdownListSelectedIdChange', () => {
    it('should invoke synth type set event with staged track id and selected synth type', () => {
      const onSynthTypeSet = sinon.spy();
      const id = 'my-track';
      const newSynthType = 'square';
      const stagedTrack = {
        id,
      };
      const component = shallow(h(TrackEditingModal, {
        ...getRequiredProps(),
        onSynthTypeSet,
        stagedTrack,
      }));
      const expected = [id, newSynthType];
      component.instance().handleContentSynthDropdownListSelectedIdChange(newSynthType);
      expect(onSynthTypeSet.lastCall.args).toEqual(expected);
    });
  });

  describe('method handleContentDeleteButtonClick', () => {
    it('should invoke delete event with staged track id', () => {
      const onDelete = sinon.spy();
      const id = 'my-track';
      const stagedTrack = {
        id,
      };
      const component = shallow(h(TrackEditingModal, {
        ...getRequiredProps(),
        onDelete,
        stagedTrack,
      }));
      component.instance().handleContentDeleteButtonClick();
      expect(onDelete.lastCall.args).toEqual([id]);
    });
  });
});

function getRequiredProps() {
  return {
    onDelete: () => {},
    onDismiss: () => {},
    onSynthTypeSet: () => {},
    stagedTrack: {},
  };
}
