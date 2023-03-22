import React, {useReducer} from 'react';
import styled from 'styled-components/native';
import Svg, {Path} from 'react-native-svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import TabBarComponent from '@navigation/components/TabBarComponent';
import {LayoutChangeEvent} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';
import {ITabBarNavigationOptions} from '@navigation/interface/bottomTabNavigation.interface';

const AnimatedTabBar = ({
  state: {index: activeIndex, routes},
  navigation,
  descriptors,
}: BottomTabBarProps) => {
  const {bottom} = useSafeAreaInsets();

  // 체인지 이벤트에서 값을 받아 객체에 x값과 activeIndex 값을 저장
  const reducer = (state: any, action: {x: number; index: number}) => {
    // Add the new value to the state
    return [...state, {x: action.x, index: action.index}];
  };

  const [layout, dispatch] = useReducer(reducer, []);

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    dispatch({x: event.nativeEvent.layout.x, index});
  };

  const xOffset = useDerivedValue(() => {
    if (layout.length !== routes.length) {
      return 0;
    }
    // 배열에서 저장된 인덱스 와 현재 전달된 인덱스를 비교
    return [...layout].find(({index}) => index === activeIndex)!.x - 25;
  }, [activeIndex, layout]);

  // x 값 이동
  const animatedStyles = useAnimatedStyle(() => {
    return {
      // translateX to the calculated offset with a smooth transition
      transform: [{translateX: withTiming(xOffset.value, {duration: 250})}],
    };
  });

  return (
    <View bottom={bottom}>
      <CustomSvg
        width={110}
        height={60}
        viewBox="0 0 110 60"
        style={[animatedStyles]}>
        <Path
          fill="#604AE6"
          d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
        />
      </CustomSvg>

      <TabBarContainer>
        {routes.map((route, index) => {
          const active = index === activeIndex;
          const {options}  = descriptors[route.key];
          return (
            <TabBarComponent
              key={route.key}
              onLayout={e => handleLayout(e, index)}
              active={active}
              options={options as ITabBarNavigationOptions}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      </TabBarContainer>
    </View>
  );
};

export default AnimatedTabBar;

const View = styled.View<{bottom?: number}>`
  /* padding-bottom: ${props => props.bottom}px; */
  background-color: #fff;
`;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const CustomSvg = styled(AnimatedSvg)`
  position: absolute;
`;

const TabBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;
