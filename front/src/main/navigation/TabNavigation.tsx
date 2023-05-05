import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@feature/home/screen/HomeScreen';
import DashBoardScreen from '@feature/dashboard/screen/DashBoardScreen';
import SettingScreen from '@feature/setting/SettingScreen';
import SvgIcon from '@common/components/svgIcon/SvgIcon';

// 탭 네비게이션
const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontStyle: 'normal',
          fontSize: 24,
          fontWeight: '400',
          lineHeight: 22,
          color: '#fff',
        },
        tabBarStyle: {
          paddingVertical: 1,
          paddingBottom: 20,
          paddingTop: 20,
          height: 80,
          backgroundColor: '#1D1D1F',
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: '#141515',
          borderBottomColor: 'transparent',
          borderBottomWidth: 0,
        },
      }}
    >
      {/* 대시보드 스크린 */}
      <Tab.Screen
        name="DashBoard"
        component={DashBoardScreen}
        options={{
          title: '대시보드',
          tabBarLabel: '',
          headerTitleAlign: 'center',
          // @ts-ignore
          tabBarIcon: ({focused}) => (
            <SvgIcon
              name="dashboard"
              fill={focused ? '#0066FF' : '#9693A6'}
              stroke={focused ? '#0066FF' : '#9693A6'}
              size={24}
            />
          ),
        }}
      />
      {/* 홈 스크린  */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '홈',
          headerTitleAlign: 'center',
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <SvgIcon
              name="home"
              fill={focused ? '#0066FF' : '#9693A6'}
              size={24}
            />
          ),
          headerStyle: {
            backgroundColor: '#141515',
          }
        }}
      />
      {/* 설정 스크린 */}
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          title: '설정',
          tabBarLabel: '',
          headerTitleAlign: 'center',
          tabBarIcon: ({focused}) => (
            <SvgIcon
              name="setting"
              fill={focused ? '#0066FF' : '#9693A6'}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
