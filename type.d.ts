import type { NativeStackNavigationProps } from '@react-navigation/native-stack';

export type HomeStackNavigationParamList={
    Main:undefined;
    Login:undefined;
    Register:undefined;
    Home:undefined;
};

export type HomeScreenNavigationProp=NativeStackNavigationProps<
Main,
Login,
Register,
Home
>;



