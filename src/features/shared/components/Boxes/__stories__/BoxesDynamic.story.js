import React from 'react';
import h from 'react-hyperscript';
import { Boxes, Shell } from '../../../components';

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

export class BoxesDynamic extends React.Component {
  state = {
    items: [
      {
        id: 0,
        length: 2,
        x: 0,
      },
      {
        id: 1,
        length: 1,
        x: 2,
      },
    ],
  };

  render() {
    return h(Shell, {
      style: {
        padding: 16,
      },
    }, [
      h(Boxes, {
        boxContentComponent: Content,
        items: this.state.items,
        length: 5,
        onItemsChange: this.handleItemsChange,
        step: 64,
        style: {
          height: 84,
        },
      }),
    ]);
  }

  handleItemsChange = (items) => {
    this.setState({
      items,
    });
  };
}
