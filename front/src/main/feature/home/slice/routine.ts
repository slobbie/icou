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
    /**
     * @description 투두 아이템 생성
     */
    setRoutine (state, action: PayloadAction<routineItemInterface>) {
      state.routines.push(action.payload)
    },
    /**
     * @description 선택 투두 항목 Id 얻기
     */
    getTodoId (state, action: PayloadAction<number>) {
      const result = state.routines.filter((item) => {return item.id === action.payload})
      state.getTodoItem.push(result[0])
    },
    /**
     * @description 투두 아이템 수정
     */
    updateTodoItem (state, action: PayloadAction<routineItemInterface>) {
      const filterItem = state.routines.filter((item) => item.id !== action.payload.id)
      state.routines = filterItem
      state.routines.push(action.payload)
    },
    /**
     * @description 투두 아이템 삭제
     */
    deleteTodo (state, action: PayloadAction<number>) {
      state.routines = state.routines.filter((item, index) => {return index !== action.payload})
    }
  },
});

export default routineSlice;
