import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { TrackEditingModal } from './track-editing-modal';

describe('TrackEditingModal Component', () => {
  it('should be defined', () => {
    const component = shallow(h(TrackEditingModal, {
      ...getRequiredProps(),
    }));
    expect(component.length).toEqual(1);
  });
  it('should have "done" as confirm text');
  it('should be open if staged track is not empty');
  it('should not be open if staged track is empty');
  it('should invoke dismiss event on confirm');
  it('should "Edit Track" as title text');
  describe('element __content', () => {
    it('should be defined');
  });
  describe('element __content__synth-dropdown', () => {
    it('should be defined');
  });
  describe('element __content__synth-dropdown__label', () => {
    it('should be defined');
    it('should contain "Synth Type:"');
  });
  describe('element __content__synth-dropdown__list', () => {
    it('should be defined');
    it('should have correct items');
    it('should have selected id equal to staged track synth type');
    it('should have correct selected item change handler');
  });
  describe('element __content__delete-button', () => {
    it('should be defined');
    it('should have correct click change handler');
    it('should have "delete" as text');
  });
  describe('method handleContentSynthDropdownListSelectedIdChange', () => {
    it('should invoke synth type set event with staged track id and selected synth type');
  });
  describe('method handleContentDeleteButtonClick', () => {
    it('should invoke delete event with staged track id');
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
