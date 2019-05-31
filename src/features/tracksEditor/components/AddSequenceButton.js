import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';
import styled from '@material-ui/styles/styled';

const AddSequenceButtonPlusHorizontal = styled('div')(props => ({
  backgroundColor: props.theme.palette.primary.main,
  height: 1,
  left: '50%',
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: 9,
}));

const AddSequenceButtonPlusVertical = styled('div')(props => ({
  backgroundColor: props.theme.palette.primary.main,
  height: 9,
  left: '50%',
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1,
}));

const StyledAddSequenceButton = styled('div')(props => ({
  alignItems: 'center',
  backgroundColor: transparentize(0.5, props.theme.palette.primary.main),
  border: `1px solid ${props.theme.palette.primary.main}`,
  cursor: 'pointer',
  display: 'flex',
  flex: '0 0 auto',
  height: 84,
  justifyContent: 'center',
  position: 'absolute',
  width: 64,
}));

export default class AddSequenceButton extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    position: PropTypes.number,
  };

  render() {
    return (
      <StyledAddSequenceButton
        className="add-sequence-button"
        onClick={this.handleClick}
        style={{
          left: this.props.position * 64,
        }}
      >
        <AddSequenceButtonPlusVertical className="add-sequence-button__plus__vertical" />
        <AddSequenceButtonPlusHorizontal className="add-sequence-button__plus__horizontal" />
      </StyledAddSequenceButton>
    );
  }

  handleClick = () => {
    this.props.onClick(this.props.position);
  };
}
