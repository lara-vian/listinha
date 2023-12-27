import { StyleSheet, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { InsertLista } from "../../service/supabase";
import colors from "../../colors";
import { useForm, Controller } from "react-hook-form";
import React from "react";

type data = {
	nome: string,
	quantidade: number
}
export default function Add() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			nome: "",
			quantidade: "",
		},
	})
	const onSubmit = (data: any) => {
		InsertLista(data.nome, data.quantidade)
	}
	return (
		<SafeAreaView style={{
			display: 'flex', 
			alignItems: 'center',
			justifyContent: 'center',
		}}>
			<ScrollView 
			contentContainerStyle={{
				display: 'flex',
				flexDirection: 'column',
				flex: 1,
				alignItems: 'center',
				justifyContent: 'space-around',
			}}
			style={Style.container}>
				<Text style={Style.title}>Adicionar a Lista</Text>
				<Text style={Style.label}>Nome do Item</Text>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							placeholder="Nome do Item"
							placeholderTextColor={colors.secundaria}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							style={Style.input} />
					)}
					name="nome"
				/>
				<Text style={Style.label}>Quantidade do Item</Text>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							keyboardType="numeric"
							placeholder="Quantidade do Item"
							placeholderTextColor={colors.secundaria}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							style={Style.input} />
					)}
					name="quantidade"
				/>
				<TouchableOpacity
				onPress={handleSubmit(onSubmit)}
				>
					<Text style={Style.button}>Adicionar</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	)
}

const Style = StyleSheet.create({
	container: {
		height: hp('85%'),
		width: wp('95%'),
		marginTop: 20,
		borderRadius: 20,
		borderColor: colors.primaria,
		borderWidth: 3,
		backgroundColor: "white",
	},
	title: {
		height: "auto",
		width: wp('90%'),
		borderRadius: 20,
		borderColor: colors.add,
		borderWidth: 3,
		padding: 18,
		backgroundColor: "white",
		color: colors.add,
		fontSize: 40,
	},
	label: {
		height: "auto",
		width: wp('90%'),
		borderRadius: 20,
		borderColor: colors.primaria,
		borderWidth: 3,
		padding: 18,
		backgroundColor: "white",
		color: colors.primaria,
		fontSize: 35,
	},
	input: {
		height: "auto",
		width: wp('90%'),
		borderBottomColor: colors.primaria,
		borderRightColor: "transparent",
		borderLeftColor: "transparent",
		borderTopColor: "transparent",
		borderWidth: 3,
		color: colors.primaria,
		fontSize: 35,
		padding: 18,
		backgroundColor: "white",
	},
	button: {
		height: "auto",
		width: wp('90%'),
		borderRadius: 20,
		borderColor: colors.add,
		borderWidth: 3,
		padding: 18,
		backgroundColor: "white",
		color: colors.add,
		fontSize: 35,
		textAlign: 'center',
	}
})