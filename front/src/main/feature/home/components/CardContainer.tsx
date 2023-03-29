import React from 'react';
import {Dimensions} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { RootState } from '@store/reducer';
import styled from 'styled-components/native';

interface CardContainerProps {
  color: string;
  priority: Animated.SharedValue<number>;
  firstPriority: Animated.SharedValue<number>;
  secondPriority: Animated.SharedValue<number>;
  thirdPriority: Animated.SharedValue<number>;
}

// 홈 카드 컨테이너
const CardContainer = ({
  color,
  priority,
  firstPriority,
  secondPriority,
  thirdPriority,
}: CardContainerProps) => {
  const routine = useSelector((state: RootState) => state.routine.routine);

  const {width, height} = Dimensions.get('window');

  const bottomBuffer = 30;
  // useShardValue() -> Animated.Value를 생성, 이값에 접근 하여 애니메이션 효과를 적용
  // Animated.Value는 변경 가능한 숫자 값으로, 일반 숫자 변수와 달리 값이 변경될 때마다 자동으로 연관된 컴포넌트가 다시 렌더링
  const yTranslation = useSharedValue(bottomBuffer);
  // rotation 값
  const rotation = useSharedValue(bottomBuffer);

  const isRightFlick = useSharedValue(true);

  // 화면을 드래그 하여 이동하는 제스처 이벤트
  const gesture = Gesture.Pan()
    // pan 제스처가 시작될 때 호출되는 콜백 함수를 등록 하는 메소드
    .onBegin(({absoluteX, translationY}) => {
      // absoluteX 화면을 기준으로 현재 위치 x 좌표
      // translationY 제스처 시간 동안 누적된 Y축을
      if (absoluteX < width / 2) {
        isRightFlick.value = false;
      }
      yTranslation.value = translationY + bottomBuffer;
      rotation.value = translationY + bottomBuffer;
    })
    // Pan 제스처가 업데이트될 때마다 호출되는 콜백 함수를 등록하는 메소드
    // Pan 제스처가 업데이트되면 새로운 위치 정보가 전달되는데,
    // 이를 활용하여 화면의 UI 요소를 업데이트하거나, 제스처의 위치 정보를 이용하여 추가적인 로직을 실행
    .onUpdate(({translationY}) => {
      yTranslation.value = translationY + bottomBuffer;
      rotation.value = translationY + bottomBuffer;
    })
    //  Pan 제스처가 종료될 때 호출되는 콜백 함수를 등록하는 메소드
    .onEnd(() => {
      // 전달 받은 기본값
      const priorities = [
        firstPriority.value,
        secondPriority.value,
        thirdPriority.value,
      ];

      const lastItem = priorities[priorities.length - 1];

      for (let i = priorities.length - 1; i > 0; i--) {
        priorities[i] = priorities[i - 1];
      }

      priorities[0] = lastItem;

      firstPriority.value = priorities[0];
      secondPriority.value = priorities[1];
      thirdPriority.value = priorities[2];

      yTranslation.value = withTiming(
        bottomBuffer,
        {
          duration: 400,
          // Easing 시간의 흐름에 따라 값을 변화 시키는데 사용
          easing: Easing.quad,
        },
        () => {
          isRightFlick.value = true;
        },
      );

      rotation.value = withTiming(
        -1280,
        {
          duration: 400,
          easing: Easing.linear,
        },
        () => {
          rotation.value = 30;
        },
      );
    });

  // 애니메이션에 필요한 스타일 속성을 계산하고 반환할 수 있다.
  const style = useAnimatedStyle(() => {
    const getPosition = () => {
      // 카드 높이
      switch (priority.value) {
        case 1:
          return 150;
        case 0.9:
          return 175;
        case 0.8:
          return 200;
        default:
          return 0;
      }
    };
    return {
      position: 'absolute',
      height: 200,
      width: 325,
      backgroundColor: color,
      // withTiming 애니메이션을 시작하고 시간에 따라 값을 변화 시킬수 있다.
      bottom: withTiming(getPosition(), {duration: 500}),
      borderRadius: 8,
      zIndex: priority.value * 100,
      transform: [
        {translateY: yTranslation.value},
        {
          // interpolate 애니메이션에 사용되는 입력 범위와 출력범위를 정의 하는 함수
          // 입력 범위와 출력 범위 사의의 값을 선형적으로 보간하는 애니메이션을 만들수 있다.
          rotate: `${interpolate(
            rotation.value,
            isRightFlick.value ? [30, height] : [30, -height],
            [0, 4],
          )}rad`,
        },
        {
          scale: withTiming(priority.value, {
            duration: 500,
          }),
        },
      ],
    };
  });


  return (
    // 앱에서 제스처 이벤트를 감지하고 이벤트 처리를 위한 콜백을 등록 할수 있다.
    <GestureDetector gesture={gesture}>
      <CardBox style={style}>
        <>
          {routine.map((item, i) => {
            <Spacer key={i} >
              <Container>
                <Box>
                  <Title>{item.title}</Title>
                  <Dec>{item.dec}</Dec>
                  <Count>{item.count}</Count>
                  <ConfirmButton>
                    <ButtonText>확인</ButtonText>
                  </ConfirmButton>
                </Box>
              </Container>
            </Spacer>
          })}
        </>
      </CardBox>
    </GestureDetector>
  );
};

export default CardContainer;


const CardBox = styled(Animated.View)`
  flex: 1;
`;

const Spacer = styled.View`
  flex: 1;
`;

const Container = styled.View`
  flex-direction: row;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Box = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  font-size: 24px;
  color: #fff;
`;

const Dec = styled.Text`
  margin-top: 10px;
  color: #fff;
  font-size: 20px;
`;

const ConfirmButton = styled.Pressable`
  width: 100px;
  height: 50px;
  border-radius: 5px;
  margin-top: 10px;
  background-color: tomato;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 20px;
`;

const Count = styled.Text`
  margin-top: 10px;
  color: #fff;
  font-size: 20px;
`;
