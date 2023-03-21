import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { LayoutChangeEvent } from 'react-native';

export interface ITabBarNavigationOptions extends BottomTabNavigationOptions {
    tabBarIcon?: (props: {
      focused?: boolean;
      color?: string;
      size?: number;
      ref?: React.MutableRefObject<any>;
    }) => React.ReactNode;
}

export interface ITabBarComponent {
    active?: boolean;
    options: ITabBarNavigationOptions;
    onLayout: (e: LayoutChangeEvent) => void;
    onPress: () => void;
}
