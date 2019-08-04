import { combineReducers } from 'redux';
import getUsers from './getUsers';
import redirect from './redirect';
import searchInput from './searchInput';
import status from './status';

const reducers = combineReducers({
  getUsers,
  redirect,
  searchInput,
  status,
});

export default reducers;