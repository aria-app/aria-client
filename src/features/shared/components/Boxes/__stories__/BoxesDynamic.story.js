import React from "react";
import { Boxes, Shell } from "../../../components";

const Content = props => (
  <div
    className="content"
    style={{
      backgroundColor: "red",
      color: "white",
      flex: "1 1 auto",
    }}
  >
    {props.item.id}
  </div>
);

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
    return (
      <Shell
        style={{
          padding: 16,
        }}
      >
        <Boxes
          boxContentComponent={Content}
          items={this.state.items}
          length={5}
          onItemsChange={this.handleItemsChange}
          step={64}
          style={{
            height: 84,
          }}
        />
      </Shell>
    );
  }

  handleItemsChange = items => {
    this.setState({
      items,
    });
  };
}
