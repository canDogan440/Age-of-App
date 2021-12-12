import { createAction } from '@ngrx/store';

export const rangeWood = createAction('rangeWood');
export const rangeFood = createAction('rangeFood');
export const rangeGold = createAction('rangeGold');

export const onDark = createAction('onDark');
export const onFeudal = createAction('onFeudal');
export const onCastle = createAction('onCastle');
export const onImperial = createAction('onImperial');

export const reset = createAction('reset');
