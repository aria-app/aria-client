import h from 'react-hyperscript';
import { mount } from 'enzyme';
// import sinon from 'sinon/pkg/sinon';
import { DownloadButton } from './download-button';

describe('DownloadButton Component', () => {
  it('should be defined', () => {
    const component = mount(h(DownloadButton));
    expect(component).toBeDefined();
  });

  it('should contain text', () => {
    const buttonText = 'Some Text';
    const component = mount(h(DownloadButton, {
      buttonText,
    }));
    const el = component.find('.download-button');
    expect(el.text()).toEqual(buttonText);
  });
});
