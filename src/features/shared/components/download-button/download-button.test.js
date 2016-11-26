import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { DownloadButton } from './download-button';

describe('DownloadButton Component', () => {
  it('should be defined', () => {
    const component = shallow(h(DownloadButton, {
      content: '',
      filename: '',
      text: '',
    }));
    expect(component.length).toEqual(1);
  });
  it('should contain text');
  it('should have correctly formatted href');
  it('should have download equal to filename');
  // it('should contain text', () => {
  //   const text = 'Some Text';
  //   const component = mount(h(DownloadButton, {
  //     content: '',
  //     filename: '',
  //     text,
  //   }));
  //   const el = component.find('.download-button');
  //   expect(el.text()).toEqual(text);
  // });
  //
  // it('should have correctly formatted href', () => {
  //   const content = 'Some Text';
  //   const uri = encodeURIComponent(content);
  //   const href = `data:text/json;charset=utf-8,${uri}`;
  //   const component = mount(h(DownloadButton, {
  //     filename: '',
  //     text: '',
  //     content,
  //   }));
  //   const el = component.find('.download-button');
  //   expect(el.prop('href')).toEqual(href);
  // });
  //
  // it('should have download equal to filename', () => {
  //   const filename = 'Some Text';
  //   const component = mount(h(DownloadButton, {
  //     content: '',
  //     text: '',
  //     filename,
  //   }));
  //   const el = component.find('.download-button');
  //   expect(el.prop('download')).toEqual(filename);
  // });
});
