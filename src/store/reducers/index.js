import { combineReducers } from 'redux';

import primeiroReducer from './primeiroReducer';
import segundoReducer from './segundoReducer';

export default combineReducers({
  primeiroReducer,
  segundoReducer,
});
