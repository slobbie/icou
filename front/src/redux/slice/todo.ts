import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface todoSliceInterface {
  isDone: boolean;
}

const initialState: todoSliceInterface = {
  isDone: false,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    todo(state, action: PayloadAction<todoSliceInterface>) {
      state.isDone = action.payload.isDone;
    },
  },
});

export default todoSlice;
