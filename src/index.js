import React from 'react';
import ReactDOM from 'react-dom';
import './styles/resets.scss';
import { ZenApp } from './components/zen-app/zen-app';

ReactDOM.render(
  React.createElement(ZenApp),
  document.querySelector('#zen-app-root')
);
