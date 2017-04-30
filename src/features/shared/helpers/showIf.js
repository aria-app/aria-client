import isFunction from 'lodash/fp/isFunction';

export function showIf(condition) {
  return (result) => {
    if (isFunction(result)) {
      return condition ? result() : null;
    }

    return condition ? result : null;
  };
}
