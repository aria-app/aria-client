import React from 'react';
import './VFXLayer.scss';

export class VFXLayer extends React.Component {
  componentDidMount() {
    window.addEventListener('mousemove', this.handleWindowMouseMove);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleWindowMouseMove);
  }

  render() {
    return (
      <div
        className="vfx-layer"
        ref={this.setRef}
      />
    );
  }

  handleWindowMouseMove = (e) => {
    if (!this.ref) return;
    const xFactor = ((window.innerWidth / 2) - e.pageX) / 40;
    const yFactor = ((window.innerHeight / 2) - e.pageY) / 40;

    this.ref.style.transform = `translate3d(${xFactor}px, ${yFactor}px, 0)`;
  }

  setRef = (ref) => {
    this.ref = ref;
  }
}
