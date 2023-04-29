import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface routineItemInterface {
  id?: number
  title?: string;
  bgColor?: string
  // dec?: string;
}

interface routinesInterface {
  routines: routineItemInterface[];
  getTodoItem: routineItemInterface[]
}

const initialState: routinesInterface = {
  routines: [],
  getTodoItem: []
};

const routineSlice = createSlice({
  name: 'routine',
  initialState,
  reducers: {
    setRoutine (state, action: PayloadAction<routineItemInterface>) {
      state.routines.push(action.payload)
    },
    getTodoId (state, action: PayloadAction<number>) {
      const result = state.routines.filter((item) => {return item.id === action.payload})
      state.getTodoItem.push(result[0])
    },
    updateTodoItem (state, action: PayloadAction<routineItemInterface>) {
      const filterItem = state.routines.filter((item) => item.id !== action.payload.id)
      state.routines = filterItem
      state.routines.push(action.payload)
    },
    deleteTodo (state, action: PayloadAction<number>) {
      state.routines = state.routines.filter((item, index) => {return index !== action.payload})
      console.log('정해석 삭제 성공', state.routines);
    }
  },
});

export default routineSlice;
