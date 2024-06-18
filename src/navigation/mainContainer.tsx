import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "./style/colors";

//Screens
import Add from "./screens/Add";
import List from "./screens/List";
import Car from "./screens/Car";
import IconTab from "../components/Icon";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => IconTab({focused, color, size, route}),
          tabBarActiveTintColor: colors.secundaria,
          tabBarInactiveTintColor: "white",
          tabBarShowLabel: false,
          tabBarStyle: { backgroundColor: colors.primaria, height: 80 },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Add" component={Add} />
        <Tab.Screen name="Lista" component={List} />
        <Tab.Screen name="Carrinho" component={Car} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}