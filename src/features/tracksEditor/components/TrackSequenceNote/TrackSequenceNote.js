import getOr from "lodash/fp/getOr";
import styled from "styled-components/macro";

export const TrackSequenceNote = styled.div(props => {
  const x0 = getOr(0, "note.points[0].x", props);
  const x1 = getOr(0, "note.points[1].x", props);
  const y0 = getOr(0, "note.points[0].y", props);

  return {
    backgroundColor: props.theme.almostblack,
    height: 1,
    left: 0,
    position: "absolute",
    top: 0,
    transform: `translate(${x0 * 2}px, ${y0}px)`,
    width: (x1 - x0 + 1) * 2,
  };
});
