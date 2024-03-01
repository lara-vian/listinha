import React from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, TextInput } from "react-native";


interface ILista{
  id: number,
  nome: string,
  quantidade: number
  preco?: number
}
export default function Lista() {
  return(
    <SafeAreaView></SafeAreaView>
  )
}