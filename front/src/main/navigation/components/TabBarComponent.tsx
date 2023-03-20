import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import React, {useEffect, useRef} from 'react';
import {LayoutChangeEvent} from 'react-native';
import styled from 'styled-components/native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

interface ITabBarComponent {
  active?: boolean;
  options: BottomTabNavigationOptions;
  onLayout: (e: LayoutChangeEvent) => void;
  onPress: () => void;
}

const TabBarComponent = ({
  onPress,
  onLayout,
  active,
  options,
}: ITabBarComponent) => {
  // handle lottie animation -----------------------------------------
  const ref = useRef<any>(null);

  useEffect(() => {
    if (active && ref?.current) {
      // @ts-ignore
      ref.current.play();
    }
  }, [active]);
  // animations ------------------------------------------------------

  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, {duration: 250}),
        },
      ],
    };
  });

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.5, {duration: 250}),
    };
  });

  return (
    <Pressable onLayout={onLayout} onPress={onPress}>
      <Circle style={animatedComponentCircleStyles}>
        <Icon style={animatedIconContainerStyles}>
          {/* {options.tabBarIcon} */}
          {/* <Text>?</Text> */}
          {options.tabBarIcon ? options.tabBarIcon({ref}) : <Text>?</Text>}
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

const Text = styled.Text``;
