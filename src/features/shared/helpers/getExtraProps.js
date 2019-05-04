import getOr from "lodash/fp/getOr";
import omit from "lodash/fp/omit";

/* eslint-disable react/forbid-foreign-prop-types */
export const getExtraProps = instance =>
  omit(
    Object.keys(getOr({}, "constructor.propTypes", instance)),
    instance.props,
  );
