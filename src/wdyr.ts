import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const whyDidYouRender = require('@welldone-software/why-did-you-render');
whyDidYouRender(React, {
  trackAllPureComponents: true,
});
