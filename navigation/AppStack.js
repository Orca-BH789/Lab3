import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { CustomerScreen, SettingScreen, TransactionScreen } from '../screen/index';
import { ServiceStack } from './RouterService';
import { House, UsersRound, Banknote, Settings } from 'lucide-react-native'; 

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#e91e63"
    inactiveColor="black"
    barStyle={{ backgroundColor: 'white' }}
    labeled={false}    
  >
    <Tab.Screen
      name="Home"
      component={ServiceStack}
      options={{
        tabBarIcon: ({ focused }) => (
          <House size={28} color={focused ? "#e91e63" : "black"} />
        ),
      }}
    />
    <Tab.Screen
      name="Customer"
      component={CustomerScreen}
      options={{       
        tabBarIcon: ({ focused }) => (
          <UsersRound size={28} color={focused ? "#e91e63" : "black"} />
        ),
      }}
    />
    <Tab.Screen
      name="Transaction"
      component={TransactionScreen}
      options={{       
        tabBarIcon: ({ focused }) => (
          <Banknote size={28} color={focused ? "#e91e63" : "black"} />
        ),
      }}
    />
    <Tab.Screen
      name="Setting"
      component={SettingScreen}
      options={{       
        tabBarIcon: ({ focused }) => (
          <Settings size={28} color={focused ? "#e91e63" : "black"} />
        ),
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