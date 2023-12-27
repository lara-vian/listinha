import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import colors from "../../colors";
import { DeleteCarrinho, GetCarrinho } from "../../service/supabase";
import { useState } from "react";
import React from "react";


interface ConstroiCarrinhoProps {
	carrinho: ICarrinho[], 
	reload: () => void
}
export default function Lista() {
	const [carrinho, setCarrinho] = useState<ICarrinho[]>([])
	const [preco, setPreco] = useState(0)
	const AtualizaPreco = () =>{
		let precoAtual = 0
		carrinho.map((item) => {
			precoAtual = precoAtual + (item.preco * item.quantidade)
		})
		return precoAtual
	}
	const Reload = () => {
		GetCarrinho().then((data) => {
			if(data) {
				setCarrinho(data)
			}})
			setPreco(AtualizaPreco())
			console.log(preco)
	}
	return (
		<SafeAreaView style={{
			display: 'flex', alignItems: 'center',
			justifyContent: "space-around",
		}}>
			{preco != 0 &&
				<View >
					<Text style={Style.label}>Preço da Compra: {preco}</Text>
				</View>
			}
			
			<TouchableOpacity onPress={Reload}>
				<Text style={Style.button} >Atualizar Carrinho</Text>
			</TouchableOpacity>
			<View style={Style.container}>
				<ScrollView>
					{carrinho && <ConstroiCarrinho carrinho={carrinho} reload={Reload}/>}
					
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}
function ConstroiCarrinho({carrinho, reload}: ConstroiCarrinhoProps) {
	const Delete = (id: number) => {
		DeleteCarrinho(id)
	}
	return (
		<View>{
			carrinho.map((item) => (
				<View key={item.id}>
					<View style={Style.containerItem} >
						<Text style={Style.textItem}>{item.nome}</Text>
						<Text style={Style.textItem}>{item.quantidade}</Text>
						<TouchableOpacity onPress={() =>{
							Delete(item.id)
							reload()
							}}>
							<Ionicons name="trash-outline" size={30} color={colors.delete} />
						</TouchableOpacity>
					</View>
					<View>
						<Text>{item.preco}</Text>
					</View>
				</View>
			))}
		</View>
	)
}
const Style = StyleSheet.create({
	container: {
		height: '85%',
		width: '95%',
		borderRadius: 20,
		borderColor: "white",
		borderWidth: 3,
		backgroundColor: colors.fundoVermelho,
		alignItems: 'center',
		justifyContent: 'space-evenly',
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
		width: "auto",
		borderRadius: 20,
		borderColor: "white",
		borderWidth: 3,
		padding: 18,
		backgroundColor: colors.add,
		color: "white",
		fontSize: 35,
	},
	containerItem:{
		height: "auto",
		width: 350,
		borderRadius: 20,
		borderColor: "white",
		borderWidth: 3,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		gap: 15,
		padding: 10,
		margin: 10,
		backgroundColor: colors.amarelo,

	},
	textItem:{
		fontSize: 30,
		color: "white",
	}
})