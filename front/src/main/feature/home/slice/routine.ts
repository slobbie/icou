import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface routineItemInterface {
  id?: number
  title?: string;
  bgColor?: string
}

interface routinesInterface {
  todoId: number
  routines: routineItemInterface[];
  getTodoItem: routineItemInterface
}

const initialState: routinesInterface = {
  todoId: 0,
  routines: [],
  getTodoItem: {}
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
     * @description 선택 투두 항목  얻기
     */
    getTodoItem (state, action: PayloadAction<routineItemInterface>) {
      state.getTodoItem.id = action.payload.id
      state.getTodoItem.title = action.payload.title
      state.getTodoItem.bgColor = action.payload.bgColor
    },
    /**
     * @description 투두 아이템 수정
     */
    updateTodoItem (state, action: PayloadAction<routineItemInterface>) {
      const findItem = state.routines.findIndex((item) => item.id === action.payload.id)
      state.routines[findItem].id =  action.payload.id
      state.routines[findItem].title =  action.payload.title
      state.routines[findItem].bgColor =  action.payload.bgColor
    },
    updateTodoId (state, action: PayloadAction<number>) {
      state.todoId = action.payload
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
