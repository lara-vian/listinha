const names = {
  Add: "Add",
  List: "Lista",
  Car: "Carrinho"
}
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function IconTab ({ focused, color, size, route }: any){
  let iconName = "";
  let rn = route.name;

  if (rn === names.Add) {
    iconName = focused ? "add-circle" : "add-circle-outline";
  } else if (rn === names.List) {
    iconName = focused ? "list" : "list-outline";
  } else if (rn === names.Car) {
    iconName = focused ? "cart" : "cart-outline";
  }

  return <Ionicons name={iconName} size={size + 10} color={color} />
}