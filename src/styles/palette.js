import { color, lightness } from 'kewler';

const neutralBase = color('#907080');
const primaryBase = color('#fc8003');
const accentBase = color('#41bebc');
const errorBase = color('#DF5920');
const successBase = color('#20DF59');

export const neutral = getRange(neutralBase);
export const primary = getRange(primaryBase);
export const accent = getRange(accentBase);
export const error = getRange(errorBase);
export const success = getRange(successBase);

export const backgroundColor = neutral[2];
export const backgroundColorPrimary = primary[6];
export const backgroundColorAccent = accent[6];

export const textColor = neutral[9];
export const textColorInverted = neutral[2];
export const textColorPrimary = primary[6];
export const textColorAccent = accent[6];

function getRange(base) {
  return [
    'black', // 0
    base(lightness(-45.00))(),
    base(lightness(-33.75))(),
    base(lightness(-22.50))(),
    base(lightness(-11.25))(),
    base(lightness(0))(),
    base(lightness(11.25))(),
    base(lightness(22.50))(),
    base(lightness(33.75))(),
    base(lightness(45.00))(),
    'white', // 10
  ];
}
