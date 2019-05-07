import isObject from 'lodash/fp/isObject';
import test from 'ava';
import Dawww from '../index';

test('should return object', t => {
  const expected = true;
  const returnValue = Dawww({});
  const result = isObject(returnValue);
  t.is(result, expected);
});
