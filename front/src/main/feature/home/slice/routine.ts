import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface routineItemInterface {
  title?: string;
  dec?: string;
  count?: number;
  isDone?: boolean;
}

interface routineInterface {
  routine: routineItemInterface[];
}

const initialState: routineInterface = {
  routine: [],
};

const routineSlice = createSlice({
  name: 'routine',
  initialState,
  reducers: {
    setRoutine(state, action: PayloadAction<routineItemInterface>) {
      state.routine.push(action.payload);
      console.log('정해석 루틴 추가', state.routine);
    },
  },
});

export default routineSlice;
