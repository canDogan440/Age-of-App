import { on } from '@ngrx/store';
import { rangeFood } from './../actions/filter.actions';
import { initState } from './../state/units.state';
import { createReducer } from '@ngrx/store';

const _unitsReucer = createReducer(
  initState,
  on(rangeFood, (state) => {
    return {
      ...state,
      
    };
  })
);

export function unitsReducer(state, action) {
  return _unitsReucer(state, action);
}
