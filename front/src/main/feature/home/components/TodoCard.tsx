import React, { Dispatch, SetStateAction } from 'react'
import { Dimensions } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent, PanGestureHandlerProps } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import styled from 'styled-components/native'
import DeleteIcon from '@assets/icon/delete.png'
import SvgIcon from 'main/common/components/svgIcon/SvgIcon';
import { useDispatch } from 'react-redux';
import routineSlice, { routineItemInterface } from '../slice/routine';
// import EditIconIcon from '@assets/icon/edit.svg'

interface TaskInterface {
  title?: string;
  bgColor?: string
  id?: number;
}

interface ListItemProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  task?: TaskInterface
  onDismiss?: (task?: TaskInterface) => void;
  setUpdateIsBottomSheet?: Dispatch<SetStateAction<boolean>>
}

const LIST_ITEM_HEIGHT = 100;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

// 투두 리스트 카드
const TodoCards = ({
  task,
  onDismiss,
  simultaneousHandlers,
  setUpdateIsBottomSheet
}: ListItemProps) => {

  const dispatch = useDispatch()

  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(20);
  const opacity1 = useSharedValue(1);


  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity1.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(task);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0
    );
    return { opacity };
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity1.value,
    };
  });

  const showBottomSheet = (pItem: routineItemInterface) => {
    dispatch(routineSlice.actions.getTodoItem({
      id: pItem.id,
      title: pItem.title,
      bgColor: pItem.bgColor
    }))
    setUpdateIsBottomSheet((prev) => !prev)
  }

  return (
    <TodoContainer style={rTaskContainerStyle}>
      <IconBox style={rIconContainerStyle}>
        <Icon
          source={DeleteIcon}
        />
      </IconBox>
      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={panGesture}
      >
        <TodoCard
          bgColor={task.bgColor}
          style={rStyle}
        >
          <TodoCol>
            <TodoRow>
              <TodoTitleRow>
                <TodoTitle>{task.title}</TodoTitle>
              </TodoTitleRow>
              <TodoCountRow>
                <EditButton
                  onPress={() => showBottomSheet(task)}
                >
                  <SvgIcon name="edit" size={24} />
                </EditButton>
                {/* <TodoCountText>달성 횟수</TodoCountText> */}
              </TodoCountRow>
            </TodoRow>
            {/* <TodoRow>
              <TodoTime>시간입니다. </TodoTime>
            </TodoRow> */}
          </TodoCol>
        </TodoCard>
      </PanGestureHandler>
    </TodoContainer>
  )
}

export default TodoCards

const TodoContainer = styled(Animated.View)`
    width: 100%;
    align-items: center;
`

const TodoCard = styled(Animated.View)<{bgColor: string}>`
  display: flex;
  width: 90%;
  height: ${LIST_ITEM_HEIGHT}px;
  background-color: ${(props) => props.bgColor};
  border-radius: 18px;
  padding: 10px;
`

const TodoCol = styled.View`
  width: 100%;
  height: 100%;
  border: 1px solid ${({theme}) => theme.colors.white_fff};
`

const TodoRow = styled.View`
  margin-bottom: 5px;
  width: 100%;
  height: 30px;
  border: 1px solid ${({theme}) => theme.colors.white_fff};
  flex-direction: row;
  justify-content: space-between;
`

const TodoTitleRow = styled.View`
`

const TodoCountRow = styled.View`
  border: 1px solid ${({theme}) => theme.colors.white_fff};
`

// const TodoCountText = styled.Text`
//   font-size: 16px;
//   font-weight: bold;
//   color: #fff;
// `

const TodoTitle = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.colors.white_fff};
  font-weight: bold;
  width: 100%;
`

// const TodoTime  = styled.Text`
//   font-size: 12px;
//   color: ${({theme}) => theme.colors.white_fff};
//   font-weight: bold;
//   width: 100%;
// `

const IconBox = styled(Animated.View)`
  height: ${LIST_ITEM_HEIGHT}px;
  width: ${LIST_ITEM_HEIGHT}px;
  position: absolute;
  right: 10%;
  justify-content: center;
  align-items: center;
`

const Icon = styled.Image`
  width: ${LIST_ITEM_HEIGHT * 0.4}px;
  height: ${LIST_ITEM_HEIGHT * 0.4}px ;
`

const EditButton = styled.Pressable`
  width: 50px;
  align-items: center;
`
