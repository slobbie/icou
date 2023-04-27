import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface routineItemInterface {
  id?: number
  title?: string;
  bgColor?: string
  // dec?: string;
}

interface routinesInterface {
  routines: routineItemInterface[];
}

const initialState: routinesInterface = {
  routines: []
};

const routineSlice = createSlice({
  name: 'routine',
  initialState,
  reducers: {
    setRoutine (state, action: PayloadAction<routineItemInterface>) {
      console.log('정해석  action.payload', action.payload);
      state.routines.push(action.payload)
    },
    deleteTodo (state, action: PayloadAction<number>) {
      state.routines = state.routines.filter((item, index) => {return index !== action.payload})
      console.log('정해석 삭제 성공', state.routines);
    }
  },
});

export default routineSlice;
