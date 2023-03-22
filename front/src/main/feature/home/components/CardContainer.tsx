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
import Card from './Card';

interface CardContainerProps {
  color: string;
  priority: Animated.SharedValue<number>;
  firstPriority: Animated.SharedValue<number>;
  secondPriority: Animated.SharedValue<number>;
  thirdPriority: Animated.SharedValue<number>;
}

const CardContainer = ({
  color,
  priority,
  firstPriority,
  secondPriority,
  thirdPriority,
}: CardContainerProps) => {
  const {width, height} = Dimensions.get('window');
  const bottomBuffer = 30;
  const yTranslation = useSharedValue(bottomBuffer);
  const rotation = useSharedValue(bottomBuffer);
  const isRightFlick = useSharedValue(true);

  const gesture = Gesture.Pan()
    .onBegin(({absoluteX, translationY}) => {
      if (absoluteX < width / 2) {
        isRightFlick.value = false;
      }
      yTranslation.value = translationY + bottomBuffer;
      rotation.value = translationY + bottomBuffer;
    })
    .onUpdate(({translationY}) => {
      yTranslation.value = translationY + bottomBuffer;
      rotation.value = translationY + bottomBuffer;
    })
    .onEnd(() => {
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
      bottom: withTiming(getPosition(), {duration: 500}),
      borderRadius: 8,
      zIndex: priority.value * 100,
      transform: [
        {translateY: yTranslation.value},
        {
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
    <GestureDetector gesture={gesture}>
      <Card color={color} style={style} />
    </GestureDetector>
  );
};

export default CardContainer;
