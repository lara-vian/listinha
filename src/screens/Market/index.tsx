import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../../style/colors";

//Screens
import Add from "../../components/Add";
import List from "../../components/List";
import Car from "../../components/Car";
import IconTab from "../../components/Icon";

const Tab = createBottomTabNavigator();

export default function Market() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => IconTab({ focused, color, size, route }),
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
  )
}