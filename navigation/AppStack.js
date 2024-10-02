import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { CustomerScreen, AdminScreen, SettingScreen, TransactionScreen } from '../screen/index';
import { ServiceStack } from './RouterService';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#e91e63"
    barStyle={{ backgroundColor: 'white' }}
    screenOptions={{
      tabBarIcon: ({ focused, color }) => {
        const iconName = focused ? color : 'gray';
        return color;
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={ServiceStack}
      options={{
        tabBarIcon: 'home'
      }}
    />
    <Tab.Screen
      name="Customer"
      component={CustomerScreen}
      options={{
        tabBarIcon: 'account'
      }}
    />
    <Tab.Screen
      name="Admin"
      component={AdminScreen}
      options={{
        tabBarIcon: 'shield-account'
      }}
    />
    <Tab.Screen
      name="Transaction"
      component={TransactionScreen}
      options={{
        tabBarIcon: 'bank-transfer'
      }}
    />
    <Tab.Screen
      name="Setting"
      component={SettingScreen}
      options={{
        tabBarIcon: 'cog'
      }}
    />
  </Tab.Navigator>
);

export const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
};