import React from 'react';
import h from 'react-hyperscript';
import './zen-app.scss';
import { ZenSequence } from '../zen-sequence/zen-sequence';

export const ZenApp = React.createClass({
  render() {
    return (
      h('div.zen-app', [
        h(ZenSequence),
      ])
    );
  },
});
