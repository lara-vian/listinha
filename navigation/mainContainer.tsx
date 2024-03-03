import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "./style/colors";
//Screens
import Add from "./screens/add";
import Lista from "./screens/lista";
import Carrinho from "./screens/carrinho";

const names = {
  Add: "Add",
  Lista: "Lista",
  Carrinho: "Carrinho"
}

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "";
            let rn = route.name;

            if (rn === names.Add) {
              iconName = focused ? "add-circle" : "add-circle-outline";
            } else if (rn === names.Lista) {
              iconName = focused ? "list" : "list-outline";
            } else if (rn === names.Carrinho) {
              iconName = focused ? "cart" : "cart-outline";
            }

            return <Ionicons name={iconName} size={size + 10} color={color} />
          },
          tabBarActiveTintColor: colors.secundaria,
          tabBarInactiveTintColor: "white",
          tabBarShowLabel: false,
          tabBarStyle: { backgroundColor: colors.primaria, height: 80 },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Add" component={Add} />
        <Tab.Screen name="Lista" component={Lista} />
        <Tab.Screen name="Carrinho" component={Carrinho} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}