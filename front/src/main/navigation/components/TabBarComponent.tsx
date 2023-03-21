import React, {useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {ITabBarComponent} from '@navigation/interface/bottomTabNavigation.interface';

// 하단탭 아이콘 컴포넌트
const TabBarComponent = ({
  onPress,
  onLayout,
  active,
  options,
}: ITabBarComponent) => {
  const ref = useRef(null);

  useEffect(() => {
    if (active && ref?.current) {
      ref.current.play();
    }
  }, [active]);

  // 하단 메뉴 아이콘 박스 애니메이션
  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, {duration: 250}),
        },
      ],
    };
  });

  // 아이콘 애니메이션
  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.5, {duration: 250}),
    };
  });

  return (
    <Pressable onLayout={onLayout} onPress={onPress}>
      <Circle style={animatedComponentCircleStyles}>
        <Icon style={animatedIconContainerStyles}>
          {options.tabBarIcon && options.tabBarIcon({ ref })}
        </Icon>
      </Circle>
    </Pressable>
  );
};

export default TabBarComponent;

const Pressable = styled.Pressable`
  height: 60px;
  width: 60px;
  margin-top: -5px;
`;

const Circle = styled(Animated.View)`
  flex: 1;
  border-radius: 30px;
  background-color: #fff;
`;

const Icon = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;
