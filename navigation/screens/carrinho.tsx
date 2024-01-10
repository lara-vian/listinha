import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from "react-native-vector-icons/Ionicons"
import colors from "../../colors";
import { supabase } from "../../service/supabase";
import { useState } from "react";
import React from "react";

interface ICarrinho{
	id: number,
	nome: string,
	quantidade: number
	preco: number
}

interface ConstroiCarrinhoProps {
	carrinho: ICarrinho[], 
	reload: () => void
}
export default function Lista() {

	const GetCarrinho = async ()=>{
		const { data, error } = await supabase
		.from('carrinho')
		.select("*")
	
		if(error){
			console.log(error)
		}
		if(data){
			return data
		}
	}
	
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
	const DeleteCarrinho = async (id:number)=>{
		const { error } = await supabase
		.from('carrinho')
		.delete()
		.eq("id", id)
	
		if(error){
			console.log(error)
		}
	}
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
		height: hp('75%'),
		width: wp('95%'),
		marginTop: 20,
		borderRadius: 20,
		borderColor: colors.primaria,
		borderWidth: 3,
		backgroundColor: "white",
		alignItems: 'center',
		justifyContent: 'space-around',
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
		width: wp('95%'),
		marginTop: 20,
		borderRadius: 20,
		borderColor: colors.add,
		borderWidth: 3,
		padding: 18,
		backgroundColor: "white",
		color: colors.add,
		fontSize: 35,
		textAlign: 'center',
	},
	containerItem:{
		height: "auto",
		width: wp('90%'),
		borderRadius: 20,
		borderColor: colors.primaria,
		borderWidth: 3,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-around',
		gap: 15,
		padding: 10,
		margin: 10,
		backgroundColor: "white",

	},
	containerTextItem:{
		height: "auto",
		width: wp('85%'),
		borderBottomColor: colors.primaria,
		borderRightColor: "transparent",
		borderLeftColor: "transparent",
		borderTopColor: "transparent",
		borderWidth: 3,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		gap: 15,
		padding: 10,
		margin: 10,
		backgroundColor: "white",
	},
	inputItem:{
		height: "auto",
		width: wp('85%'),
		borderBottomColor: colors.primaria,
		borderRightColor: "transparent",
		borderLeftColor: "transparent",
		borderTopColor: "transparent",
		borderWidth: 3,
		color: colors.primaria,
		fontSize: 30,
		padding: 18,
		backgroundColor: "white",
	},
	textItem:{
		fontSize: 35,
		color: colors.primaria,
	}
})