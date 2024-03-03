import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import React from "react";
import { addMarket } from "../../service/getData";
import { style } from "../style/styles";

export default function Add() {
  return (
    <SafeAreaView>
      <ScrollView style={style.container}>
        
      </ScrollView>
    </SafeAreaView>
  )
}

const UseAdd = () =>{
  const onSubmit = (data: IData) =>{
    addMarket(data)
  }

  return [onSubmit]
}