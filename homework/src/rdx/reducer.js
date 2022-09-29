import { combineReducers } from 'redux';
import { reducer as todoListReducer } from './todoList/reducer';
import { reducer as appReducer } from './app/reducer';

export const rootReducer = combineReducers({ 
  todo: todoListReducer, 
  app: appReducer 
});