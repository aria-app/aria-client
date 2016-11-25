import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { BPMModal } from './bpm-modal';

describe('BPMModal Component', () => {
  it('should be defined', () => {
    const component = shallow(h(BPMModal, {
      BPM: 150,
      isOpen: true,
      onBPMChange: () => {},
      onConfirm: () => {},
    }));
    expect(component.length).toEqual(1);
  });
  it('should have "done" as confirm text');
  it('should have correct value for is open');
  it('should have correct value for on confirm');
  it('should have "Set BPM" as title text');
  describe('element __content', () => {
    it('should be defined');
  });
  describe('child component __content__dropdown-list', () => {
    it('should be defined');
    it('should have bpm range items as items');
    it('should have correct value for selected id');
    it('should have correct value for on selected id change');
  });
  describe('method handleContentDropdownListSelect', () => {
    it('should invoke BPM change event with value');
  });
});
