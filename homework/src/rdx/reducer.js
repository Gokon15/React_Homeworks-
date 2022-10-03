import { combineReducers } from 'redux';
import { reducer as appReducer } from './app/reducer';
import { reducer as goodsReducer } from './goods/reducer';

export const rootReducer = combineReducers({ 
  app: appReducer,
  goods: goodsReducer,
});