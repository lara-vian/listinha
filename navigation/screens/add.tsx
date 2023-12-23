import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity } from "react-native";
import { InsertLista } from "../../service/supabase";
import { colors } from "../../colors";
import { useForm, Controller } from "react-hook-form";

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
			display: 'flex', alignItems: 'center',
			justifyContent: 'center',
		}}>
			<View style={Style.container}>
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
			</View>
		</SafeAreaView>
	)
}

const Style = StyleSheet.create({
	container: {
		height: '95%',
		width: '95%',
		borderRadius: 20,
		borderColor: "white",
		borderWidth: 3,
		backgroundColor: colors.fundoVermelho,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	title: {
		height: "auto",
		width: "95%",
		borderRadius: 20,
		borderColor: "white",
		borderWidth: 3,
		padding: 18,
		backgroundColor: colors.add,
		color: "white",
		fontSize: 40,
	},
	label: {
		height: "auto",
		width: "95%",
		borderRadius: 20,
		borderColor: "white",
		borderWidth: 3,
		padding: 18,
		backgroundColor: colors.vermelho,
		color: "white",
		fontSize: 35,
	},
	input: {
		height: "auto",
		width: "95%",
		borderRadius: 20,
		borderColor: "white",
		borderWidth: 3,
		color: "white",
		fontSize: 35,
		padding: 18,
		backgroundColor: colors.fundoAmarelo,
	},
	button: {
		height: "auto",
		width: "95%",
		borderRadius: 20,
		borderColor: "white",
		borderWidth: 3,
		padding: 18,
		backgroundColor: colors.add,
		color: "white",
		fontSize: 35,
	}
})