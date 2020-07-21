import { combineReducers } from 'redux';
import { restaurantReducer } from './restaurantReducer';

const rootReducer = combineReducers({
  restaurant: restaurantReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
