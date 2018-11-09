import React from 'react';
import h from 'react-hyperscript';
import { Box, Shell } from '../../../components';

const Content = props =>
  h('.content', {
    style: {
      backgroundColor: 'red',
      color: 'white',
      flex: '1 1 auto',
    },
  }, [
    props.item.id,
  ]);

export class BoxDynamic extends React.Component {
  state = {
    item: {
      id: 0,
      length: 1,
      x: 0,
    },
  };

  render() {
    return h(Shell, {
      style: {
        padding: 16,
      },
    }, [
      h('div', {
        style: {
          height: 100,
          position: 'relative',
          width: 500,
        },
      }, [
        h(Box, {
          contentComponent: Content,
          item: this.state.item,
          onItemChange: this.handleItemChange,
          step: 100,
        }),
      ]),
    ]);
  }

  handleItemChange = (item) => {
    this.setState({
      item,
    });
  };
}
