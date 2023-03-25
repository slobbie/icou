import routineSlice from '@feature/home/slice/routine';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  routine: routineSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
