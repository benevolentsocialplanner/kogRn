/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { Dimensions, Image, ViewStyle } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen";
import { NAVIGATIONROUTES } from "../constants/navigationRoutes";
import FavoritesScreen from "../screens/FavoritesScreen";

const Tab = createBottomTabNavigator();
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    marginBottom: 20,
    backgroundColor: "#923e5a",
    borderRadius: 50,
    left: '20%',
    width: '60%',
    paddingHorizontal: 30,
    paddingTop: 25,
    paddingBottom: 25,
    position: 'absolute',
    zIndex: 100,
    height: SCREEN_HEIGHT * 0.08,
  } as ViewStyle,
};

const BottomTabNavigation = ({ navigation }): React.JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      initialRouteName={NAVIGATIONROUTES.homeScreen}
    >
      <Tab.Screen
        name={NAVIGATIONROUTES.homeScreen}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../assets/images/rickNavBar.png")}
              />
            );
          }
        }}
      />

      <Tab.Screen
        name={NAVIGATIONROUTES.favoritesScreen}
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../assets/images/favoriteNavBar.png")}
              />
            );
          }
        }}
      />

    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
