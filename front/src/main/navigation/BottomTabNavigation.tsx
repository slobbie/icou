import React, {useMemo} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@feature/home/screen/HomeScreen';
import DashBoardScreen from '@feature/dashboard/screen/DashBoardScreen';
import SettingScreen from '@feature/setting/SettingScreen';
import AnimatedTabBar from '@navigation/components/AnimatedTabBar';
import Lottie from 'lottie-react-native';

const BottomTabNavigation = () => {
  const Tab = createBottomTabNavigator();

  const iconStyle = useMemo(() => ({width: 36, height: 36}), []);
  return (
    <Tab.Navigator tabBar={props => <AnimatedTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerTitleAlign: 'center',
          // @ts-ignore
          tabBarIcon: ({ref}) => (
            <Lottie
              ref={ref}
              loop={false}
              source={require('@assets/lottieIcon/setting.json')}
              style={iconStyle}
            />
          ),
        }}
      />
      <Tab.Screen
        name="DashBoard"
        component={DashBoardScreen}
        options={{
          title: 'DashBoard',
          headerTitleAlign: 'center',
          // @ts-ignore
          tabBarIcon: ({ref}) => (
            <Lottie
              ref={ref}
              loop={false}
              source={require('@assets/lottieIcon/setting.json')}
              style={iconStyle}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          title: 'Setting',
          headerTitleAlign: 'center',
          // @ts-ignore
          tabBarIcon: ({ref}) => (
            <Lottie
              ref={ref}
              loop={false}
              source={require('@assets/lottieIcon/setting.json')}
              style={iconStyle}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
