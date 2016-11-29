import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { DownloadButton } from './download-button';

describe('DownloadButton Component', () => {
  it('should be defined', () => {
    const component = shallow(h(DownloadButton, {
      ...getRequiredProps(),
    }));
    expect(component.length).toEqual(1);
  });

  it('should contain text', () => {
    const text = 'Some Text';
    const component = shallow(h(DownloadButton, {
      ...getRequiredProps(),
      text,
    }));
    expect(component.text()).toEqual(text);
  });

  it('should have correctly formatted href', () => {
    const content = 'Some Text';
    const uri = encodeURIComponent(content);
    const href = `data:text/json;charset=utf-8,${uri}`;
    const component = shallow(h(DownloadButton, {
      ...getRequiredProps(),
      content,
    }));
    expect(component.prop('href')).toEqual(href);
  });

  it('should have download equal to filename', () => {
    const filename = 'file.json';
    const component = shallow(h(DownloadButton, {
      ...getRequiredProps(),
      filename,
    }));
    expect(component.prop('download')).toEqual(filename);
  });
});

function getRequiredProps() {
  return {
    content: '',
    filename: '',
    text: '',
  };
}
