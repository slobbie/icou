import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface routineItemInterface {
  title?: string;
  dec?: string;
  count?: number;
  isDone?: boolean;
}

interface routineInterface {
  routine: routineItemInterface[];
}

const initialState: routineInterface = {
  routine: [
    { title: '물 5번 마시기',
      dec: '건강을 위해 물 다섯컵 어때요?',
      isDone: false
    },
    { title: '스쿼트 20회',
      dec: '하체는 체력! 스퀴트 20회를 제안합니다.',
      isDone: false
    },
    { title: '일기 쓰기',
      dec: '오늘하루를 마무리하며 일기를 써보는거 어떨까요?',
      isDone: false
    },
    { title: '손글씨 연습',
      dec: '이쁜 글씨를 위해 5분 투자 해보세요.',
      isDone: false
    },
    { title: '명상 하기',
      dec: '오늘 하루를 마무리 하며 명상을 해보세요.',
      isDone: false
    },
  ],
};

const routineSlice = createSlice({
  name: 'routine',
  initialState,
  reducers: {
    setRoutine (state, action: PayloadAction<routineItemInterface>) {
      state.routine.push(action.payload);
      console.log('정해석 루틴 추가', state.routine);
    },
  },
});

export default routineSlice;
