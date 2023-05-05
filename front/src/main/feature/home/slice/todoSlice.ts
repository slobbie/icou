import {createSlice, PayloadAction} from '@reduxjs/toolkit';

/** 투두 아이템 인퍼페이스 */
export interface todoItemInterface {
  id?: number
  title?: string;
  bgColor?: string
}

/** 투두 initialState 인퍼페이스 */
interface routinesInterface {
  todoId: number
  todoList: todoItemInterface[];
  getTodoItem: todoItemInterface
}

/** 투두 initialState  */
const initialState: routinesInterface = {
  todoId: 0,
  todoList: [],
  getTodoItem: {}
};

/** 투두 슬라이스 */
const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    /**
     * @description 투두 아이템 생성
     */
    setRoutine (state, action: PayloadAction<todoItemInterface>) {
      state.todoList.push(action.payload)
    },
    /**
     * @description 선택 투두 항목  얻기
     */
    getTodoItem (state, action: PayloadAction<todoItemInterface>) {
      state.getTodoItem.id = action.payload.id
      state.getTodoItem.title = action.payload.title
      state.getTodoItem.bgColor = action.payload.bgColor
    },
    /**
     * @description 투두 아이템 수정
     */
    updateTodoItem (state, action: PayloadAction<todoItemInterface>) {
      const findItem = state.todoList.findIndex((item) => item.id === action.payload.id)
      state.todoList[findItem].id =  action.payload.id
      state.todoList[findItem].title =  action.payload.title
      state.todoList[findItem].bgColor =  action.payload.bgColor
    },
    /**
     * @description 투두 아이템 id 증가
     */
    updateTodoId (state, action: PayloadAction<number>) {
      state.todoId = action.payload
    },
    /**
     * @description 투두 아이템 삭제
     */
    deleteTodo (state, action: PayloadAction<number>) {
      state.todoList = state.todoList.filter((item, index) => {return index !== action.payload})
    }
  },
});

export default todoSlice;
