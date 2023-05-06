import todoSlice from '@feature/home/slice/todoSlice';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  todo: todoSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
