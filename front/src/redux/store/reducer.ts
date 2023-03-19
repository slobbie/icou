import {combineReducers} from 'redux';
import todoSlice from '../slice/todo';

const rootReducer = combineReducers({
  todo: todoSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
