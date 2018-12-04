import omit from 'lodash/fp/omit';

/* eslint-disable react/forbid-foreign-prop-types */
export const getExtraProps = instance =>
  omit(Object.keys(instance.constructor.propTypes), instance.props);
