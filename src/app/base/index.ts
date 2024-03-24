import { combineReducers } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import common from './commonSlice';

const reducer = combineReducers({
  common,
});

export default reducer;
