import _ from 'lodash';
import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { UploadOverlay } from './upload-overlay';

describe('UploadOverlay Component', () => {
  it('should be defined', () => {
    const component = shallow(h(UploadOverlay, {
      ...getDefaultProps(),
    }));
    expect(component.length).toEqual(1);
  });

  it('should have defined content when file is over', () => {
    const component = shallow(h(UploadOverlay, {
      ...getDefaultProps(),
      isFileOver: true,
    }));
    const uploadOverlayEl = component.find('.upload-overlay');
    expect(uploadOverlayEl.length).toEqual(1);
  });

  it('should not have defined content when file is not over', () => {
    const component = shallow(h(UploadOverlay, {
      ...getDefaultProps(),
      isFileOver: false,
    }));
    const uploadOverlayEl = component.find('.upload-overlay');
    expect(uploadOverlayEl.length).toEqual(0);
  });

  it('should invoke file drag cancel event when dragged file leaves', () => {
    const onFileDragCancel = sinon.spy();
    const component = shallow(h(UploadOverlay, {
      ...getDefaultProps(),
      isFileOver: true,
      onFileDragCancel,
    }));
    component.simulate('dragleave');
    expect(onFileDragCancel.called).toEqual(true);
  });

  it('should invoke file drop event with file when files are dropped', () => {
    const onFileDrop = sinon.spy();
    const component = shallow(h(UploadOverlay, {
      ...getDefaultProps(),
      isFileOver: true,
      onFileDrop,
    }));
    const files = [
      { content: '{ "id": "my-song" }' },
    ];
    const e = {
      dataTransfer: {
        files,
      },
      preventDefault: () => {},
      stopPropagation: () => {},
    };
    component.simulate('drop', e);
    expect(_.last(onFileDrop.args)[0]).toEqual(files[0]);
  });

  it('should invoke file drag cancel event when dropped files are empty', () => {
    const onFileDragCancel = sinon.spy();
    const component = shallow(h(UploadOverlay, {
      ...getDefaultProps(),
      isFileOver: true,
      onFileDragCancel,
    }));
    const files = [];
    const e = {
      dataTransfer: {
        files,
      },
      preventDefault: () => {},
      stopPropagation: () => {},
    };
    component.simulate('drop', e);
    expect(onFileDragCancel.called).toEqual(true);
  });

  describe('element __tint', () => {
    it('should be defined', () => {
      const component = shallow(h(UploadOverlay, {
        ...getDefaultProps(),
        isFileOver: true,
      }));
      const tintEl = component.find('.upload-overlay__tint');
      expect(tintEl.length).toEqual(1);
    });
  });

  describe('element __tint__drag-indicator', () => {
    it('should be defined', () => {
      const component = shallow(h(UploadOverlay, {
        ...getDefaultProps(),
        isFileOver: true,
      }));
      const tintDragIndicatorEl = component.find('.upload-overlay__tint__drag-indicator');
      expect(tintDragIndicatorEl.length).toEqual(1);
    });
  });
});

function getDefaultProps() {
  return {
    isFileOver: false,
    onFileDragCancel: () => {},
    onFileDrop: () => {},
  };
}
