import { createAction } from '@reduxjs/toolkit';

export const songAddRequestStarted = createAction('songAddRequestStarted');
export const songAddRequestSucceeded = createAction('songAddRequestSucceeded');
export const songDeleteRequestStarted = createAction(
  'songDeleteRequestStarted',
);
export const songDeleteRequestSucceeded = createAction(
  'songDeleteRequestSucceeded',
);
