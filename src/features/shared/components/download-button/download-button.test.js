import h from 'react-hyperscript';
import { mount } from 'enzyme';
import { DownloadButton } from './download-button';

describe('DownloadButton Component', () => {
  it('should be defined', () => {
    const component = mount(h(DownloadButton, {
      content: '',
      filename: '',
      text: '',
    }));
    expect(component).toBeDefined();
  });

  it('should contain text', () => {
    const text = 'Some Text';
    const component = mount(h(DownloadButton, {
      content: '',
      filename: '',
      text,
    }));
    const el = component.find('.download-button');
    expect(el.text()).toEqual(text);
  });

  it('should have correctly formatted href prop', () => {
    const content = 'Some Text';
    const uri = encodeURIComponent(content);
    const href = `data:text/json;charset=utf-8,${uri}`;
    const component = mount(h(DownloadButton, {
      filename: '',
      text: '',
      content,
    }));
    const el = component.find('.download-button');
    expect(el.prop('href')).toEqual(href);
  });

  it('should have correct download prop', () => {
    const filename = 'Some Text';
    const component = mount(h(DownloadButton, {
      content: '',
      text: '',
      filename,
    }));
    const el = component.find('.download-button');
    expect(el.prop('download')).toEqual(filename);
  });
});
