import React from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import classnames from 'classnames';
import shared from '../../../shared';
import { Note } from '../note/note';
import './notes.scss';

const { toolTypes } = shared.constants;
const { showIf } = shared.helpers;

export class Notes extends React.Component {
  static propTypes = {
    draw: React.PropTypes.func.isRequired,
    erase: React.PropTypes.func.isRequired,
    isMoving: React.PropTypes.bool.isRequired,
    isPanning: React.PropTypes.bool.isRequired,
    isResizing: React.PropTypes.bool.isRequired,
    isSelecting: React.PropTypes.bool.isRequired,
    measureCount: React.PropTypes.number.isRequired,
    mousePoint: React.PropTypes.object,
    notes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    previewNote: React.PropTypes.func.isRequired,
    selectNote: React.PropTypes.func.isRequired,
    selectedNotes: React.PropTypes.arrayOf(
      React.PropTypes.object,
    ).isRequired,
    startMoving: React.PropTypes.func.isRequired,
    startResizing: React.PropTypes.func.isRequired,
    startSelecting: React.PropTypes.func.isRequired,
    toolType: React.PropTypes.string.isRequired,
    updateMoving: React.PropTypes.func.isRequired,
    updateResizing: React.PropTypes.func.isRequired,
    updateSelecting: React.PropTypes.func.isRequired,
  }

  render() {
    return h('.notes', {
      className: this.getCursorClasses(),
      onMouseDown: this.handleMouseDown,
      onMouseMove: this.handleMouseMove,
      onMouseUp: this.handleMouseUp,
      style: this.getStyle(),
    }, [
      showIf(this.getIsDrawing())(
        h(Note, {
          className: 'notes__note--ghost',
          isSelected: false,
          note: {
            points: [
              {
                x: this.props.mousePoint ? this.props.mousePoint.x : 0,
                y: this.props.mousePoint ? this.props.mousePoint.y : 0,
              },
              {
                x: this.props.mousePoint ? this.props.mousePoint.x + 1 : 0,
                y: this.props.mousePoint ? this.props.mousePoint.y : 0,
              },
            ],
          },
        }),
      ),
      ...this.props.notes.map((note, index) =>
        h(Note, {
          key: index,
          isSelected: !!_.find(this.props.selectedNotes, { id: note.id }),
          onEndpointMouseDown: this.handleNoteEndpointMouseDown,
          onMouseDown: this.handleNoteMouseDown,
          onMouseUp: this.handleNoteMouseUp,
          note,
        }),
      ),
    ]);
  }

  getCursorClasses() {
    return classnames({
      'notes--grab': this.props.toolType === toolTypes.PAN,
    });
  }

  getIsDrawing() {
    return this.props.toolType === toolTypes.DRAW;
  }

  getStyle() {
    return {
      width: this.props.measureCount !== undefined
        ? this.props.measureCount * 4 * 8 * 40
        : 0,
    };
  }

  handleMouseDown = (e) => {
    const { MOVE, SELECT } = toolTypes;

    if (this.props.toolType === MOVE) {
      this.props.startMoving();
    } else if (this.props.toolType === SELECT) {
      const isAdditive = e.ctrlKey || e.metaKey;
      this.props.startSelecting(isAdditive);
    }

    return false;
  }

  handleMouseMove = (e) => {
    if (this.props.isMoving) {
      this.props.updateMoving();
    } else if (this.props.isResizing) {
      this.props.updateResizing();
    } else if (this.props.isSelecting) {
      const isAdditive = e.ctrlKey || e.metaKey;
      this.props.updateSelecting(isAdditive);
    }
  }

  handleMouseUp = () => {
    if (
      this.props.isMoving ||
      this.props.isPanning ||
      this.props.isResizing ||
      this.props.isSelecting
    ) return;

    if (this.props.toolType === toolTypes.DRAW) {
      this.props.draw();
    }
  }

  handleNoteMouseDown = (note, e) => {
    const { DRAW, SELECT } = toolTypes;

    if (
      this.props.toolType !== DRAW &&
      this.props.toolType !== SELECT
    ) return true;

    const isAdditive = e.ctrlKey || e.metaKey;
    this.props.previewNote(_.first(note.points));
    this.props.selectNote(note, isAdditive);
    this.props.startMoving();
    e.stopPropagation();
    return false;
  }

  handleNoteMouseUp = (note) => {
    const { ERASE } = toolTypes;

    if (this.props.toolType === ERASE) {
      this.props.erase(note);
    }
  }

  handleNoteEndpointMouseDown = (note, e) => {
    const { DRAW, MOVE, SELECT } = toolTypes;

    if (this.props.toolType === MOVE) {
      this.props.startMoving();
    } else if (this.props.toolType === DRAW || this.props.toolType === SELECT) {
      const isAdditive = e.ctrlKey || e.metaKey;
      this.props.previewNote(_.last(note.points));
      this.props.selectNote(note, isAdditive);
      this.props.startResizing();
    }

    e.stopPropagation();
  }
}

// import React from 'react';
// import h from 'react-hyperscript';
// import _ from 'lodash';
// import classnames from 'classnames';
// import { compose, mapProps, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
// import { Note } from '../note/note';
// import './notes.scss';
//
// const component = props => h('.notes', {
//   className: props.cursorClasses,
//   onMouseDown: props.onMouseDown,
//   onMouseMove: props.onMouseMove,
//   onMouseUp: props.onMouseUp,
//   style: props.style,
// }, [
//   props.ghostNote,
//   ...props.noteComponents,
// ]);
//
// const composed = compose(
//   setDisplayName('Notes'),
//   pure,
//   setPropTypes({
//     draw: React.PropTypes.func.isRequired,
//     erase: React.PropTypes.func.isRequired,
//     isMoving: React.PropTypes.bool.isRequired,
//     isPanning: React.PropTypes.bool.isRequired,
//     measureCount: React.PropTypes.number.isRequired,
//     mousePoint: React.PropTypes.object,
//     notes: React.PropTypes.array.isRequired,
//     previewNote: React.PropTypes.func.isRequired,
//     selectedNotes: React.PropTypes.array.isRequired,
//     selectNote: React.PropTypes.func.isRequired,
//     startMoving: React.PropTypes.func.isRequired,
//     startResizing: React.PropTypes.func.isRequired,
//     startSelecting: React.PropTypes.func.isRequired,
//     toolType: React.PropTypes.string.isRequired,
//     toolTypes: React.PropTypes.object.isRequired,
//     updateMoving: React.PropTypes.func.isRequired,
//     updateResizing: React.PropTypes.func.isRequired,
//     updateSelecting: React.PropTypes.func.isRequired,
//   }),
//   mapProps(props => ({
//     ...props,
//   })),
//   withHandlers({
//     onMouseDown,
//     onMouseMove,
//     onMouseUp,
//     onNoteEndpointMouseDown,
//     onNoteMouseDown,
//     onNoteMouseUp,
//   }),
//   mapProps(props => ({
//     ...props,
//     cursorClasses: classnames({
//       'notes--grab': props.toolType === props.toolTypes.PAN,
//     }),
//     ghostNote: props.toolType === props.toolTypes.DRAW
//       ? h(Note, {
//         className: 'ghost',
//         isSelected: false,
//         note: {
//           points: [
//             {
//               x: props.mousePoint ? props.mousePoint.x : 0,
//               y: props.mousePoint ? props.mousePoint.y : 0,
//             },
//             {
//               x: props.mousePoint ? props.mousePoint.x + 1 : 0,
//               y: props.mousePoint ? props.mousePoint.y : 0,
//             },
//           ],
//         },
//       })
//       : null,
//     noteComponents: props.notes.map((note, index) =>
//       h(Note, {
//         key: index,
//         isSelected: !!_.find(props.selectedNotes, { id: note.id }),
//         onEndpointMouseDown: props.onNoteEndpointMouseDown,
//         onEndpointMouseUp: props.onNoteEndpointMouseUp,
//         onMouseDown: props.onNoteMouseDown,
//         onMouseUp: props.onNoteMouseUp,
//         note,
//       }),
//     ),
//     style: {
//       width: props.measureCount !== undefined
//         ? props.measureCount * 4 * 8 * 40
//         : 0,
//     },
//   })),
// )(component);
//
// export const Notes = composed;
//
// function onMouseDown(props) {
//   return (e) => {
//     const { MOVE, SELECT } = props.toolTypes;
//
//     if (props.toolType === MOVE) {
//       props.startMoving();
//     } else if (props.toolType === SELECT) {
//       const isAdditive = e.ctrlKey || e.metaKey;
//       props.startSelecting(isAdditive);
//     }
//
//     return false;
//   };
// }
//
// function onMouseMove(props) {
//   return (e) => {
//     const { isMoving, isResizing, isSelecting } = props;
//
//     if (isMoving) {
//       props.updateMoving();
//     } else if (isResizing) {
//       props.updateResizing();
//     } else if (isSelecting) {
//       const isAdditive = e.ctrlKey || e.metaKey;
//       props.updateSelecting(isAdditive);
//     }
//   };
// }
//
// function onMouseUp(props) {
//   return () => {
//     const { isMoving, isPanning, isResizing, isSelecting } = props;
//
//     if (isMoving || isPanning || isResizing || isSelecting) return;
//
//     if (props.toolType === props.toolTypes.DRAW) {
//       props.draw();
//     }
//   };
// }
//
// function onNoteMouseDown(props) {
//   return (note, e) => {
//     const { toolType, toolTypes } = props;
//     const { DRAW, SELECT } = toolTypes;
//
//     if (toolType === DRAW || toolType === SELECT) {
//       const isAdditive = e.ctrlKey || e.metaKey;
//       props.previewNote(_.first(note.points));
//       props.selectNote(note, isAdditive);
//       props.startMoving();
//       e.stopPropagation();
//       return false;
//     }
//
//     return true;
//   };
// }
//
// function onNoteMouseUp(props) {
//   return (note) => {
//     const { toolType, toolTypes } = props;
//     const { ERASE } = toolTypes;
//
//     if (toolType === ERASE) {
//       props.erase(note);
//     }
//   };
// }
//
// function onNoteEndpointMouseDown(props) {
//   return (note, e) => {
//     const { toolType, toolTypes } = props;
//     const { DRAW, MOVE, SELECT } = toolTypes;
//
//     if (toolType === MOVE) {
//       props.startMoving();
//     } else if (toolType === DRAW || toolType === SELECT) {
//       const isAdditive = e.ctrlKey || e.metaKey;
//       props.previewNote(_.last(note.points));
//       props.selectNote(note, isAdditive);
//       props.startResizing();
//     }
//
//     e.stopPropagation();
//   };
// }
