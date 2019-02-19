import isEmpty from 'lodash/fp/isEmpty';
import negate from 'lodash/fp/negate';
import PropTypes from 'prop-types';
import React from 'react';
import { showIf } from 'react-render-helpers';
import styled from 'styled-components/macro';
import shared from '../../../shared';

const { IconButton, Toolbar } = shared.components;

const StyledTrackEditorToolbar = styled(Toolbar)`
  border-bottom: 1px solid ${props => props.theme.midgray};
`;

export class TracksEditorToolbar extends React.PureComponent {
  static propTypes = {
    isRedoEnabled: PropTypes.bool.isRequired,
    isUndoEnabled: PropTypes.bool.isRequired,
    onRedo: PropTypes.func,
    onSequenceDelete: PropTypes.func,
    onSequenceDuplicate: PropTypes.func,
    onSequenceOpen: PropTypes.func,
    onUndo: PropTypes.func,
    selectedSequence: PropTypes.object,
  }

  static defaultProps = {
    selectedSequence: {},
  };

  render() {
    return (
      <StyledTrackEditorToolbar
        position="top"
        isAlternate={this.getIsAlternate()}
        leftItems={
          <React.Fragment>
            <IconButton
              icon="undo"
              isDisabled={!this.props.isUndoEnabled}
              onClick={this.props.onUndo}
              title="Undo"
            />
            {showIf(this.props.isRedoEnabled)(
              <IconButton
                icon="redo"
                isDisabled={!this.props.isRedoEnabled}
                onClick={this.props.onRedo}
                title="Redo"
              />
            )}
          </React.Fragment>
        }
        leftItemsAlt={
          <React.Fragment>
            <IconButton
              icon="undo"
              isDisabled={!this.props.isUndoEnabled}
              onClick={this.props.onUndo}
              title="Undo"
            />
            {showIf(this.props.isRedoEnabled)(
              <IconButton
                icon="redo"
                isDisabled={!this.props.isRedoEnabled}
                onClick={this.props.onRedo}
                title="Redo"
              />
            )}
          </React.Fragment>
        }
        rightItemsAlt={
          <React.Fragment>
            <IconButton
              icon="pencil"
              onClick={this.openSequence}
            />
            <IconButton
              icon="clone"
              onClick={this.props.onSequenceDuplicate}
            />
            <IconButton
              icon="trash"
              onClick={this.props.onSequenceDelete}
            />
          </React.Fragment>
        }
      />
    );
  }

  getIsAlternate = () =>
    negate(isEmpty)(this.props.selectedSequence);

  openSequence = () => {
    this.props.onSequenceOpen(this.props.selectedSequence);
  };
}
