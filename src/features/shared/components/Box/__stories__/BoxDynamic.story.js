import React from 'react';
import { Box, Shell } from '../../../components';

const Content = props => (
  <div
    className="content"
    style={{
      backgroundColor: 'red',
      color: 'white',
      flex: '1 1 auto',
    }}>
    {props.item.id}
  </div>
);

export class BoxDynamic extends React.Component {
  state = {
    item: {
      id: 0,
      length: 1,
      x: 0,
    },
  };

  render() {
    return (
      <Shell
        style={{
          padding: 16,
        }}>
        <div
          style={{
            height: 100,
            position: 'relative',
            width: 500,
          }}>
          <Box
            contentComponent={Content}
            item={this.state.item}
            onItemChange={this.handleItemChange}
            step={100}
          />
        </div>
      </Shell>
    );
  }

  handleItemChange = (item) => {
    this.setState({
      item,
    });
  };
}
