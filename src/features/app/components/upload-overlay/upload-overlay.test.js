import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { UploadOverlay } from './upload-overlay';

describe('UploadOverlay Component', () => {
  it('should be defined', () => {
    const component = shallow(h(UploadOverlay, {
      isFileOver: false,
      onFileDragCancel: () => {},
      onFileDrop: () => {},
    }));
    expect(component.length).toEqual(1);
  });
  it('should have defined content when file is over');
  it('should not have defined content when file is not over');
  it('should invoke file drag cancel event when dragged file leaves');
  it('should invoke file drop event with files when files are dropped');
  it('should invoke file drag cancel event when dropped files are empty');
  describe('element __tint', () => {
    it('should be defined');
  });
  describe('element __tint__drag-indicator', () => {
    it('should be defined');
  });
});
