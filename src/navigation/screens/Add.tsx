import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import React from "react";
import { style } from "../style/styles";

export default function Add() {
  const onSubmit = (test: IData) => {}
  const test: IData = {
    name: "beterraba",
    quantity: 1
  }

  return (
    <SafeAreaView style={style.background}>
      <ScrollView style={style.container} contentContainerStyle={style.background}>
        <TouchableOpacity
          style={style.buttonAdd}
          onPress={() => onSubmit(test)}
        >
          <Text style={style.textAdd}>Adicionar</Text>
        
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
