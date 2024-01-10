import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, TextInput } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from "react-native-vector-icons/Ionicons"
import colors from "../../colors";
import { supabase } from "../../service/supabase";
import { useState } from "react";
import React from "react";

interface ILista{
	id: number,
	nome: string,
	quantidade: number
	preco?: number
}
interface ConstroiListaProps {
	lista: ILista[], 
	reload: () => void
}
export default function Lista() {
	const [lista, setLista] = useState<ILista[]>([])
	const  GetLista = async() =>{
		const { data, error } = await supabase
		.from('lista')
		.select("*")
		
		if(data){
			return data
		}
	
		if(error){
			console.log(error)
		}
	}

	const Reload = () => {
		GetLista().then((data) => {
			if(data) {
				setLista(data)
			}})
	}
	return (
		<SafeAreaView 
		style={{
			display: 'flex', 
			alignItems: 'center',
			justifyContent: 'center',
		}}
		>
			<TouchableOpacity onPress={Reload}>
				<Text style={Style.button} >Atualizar Lista</Text>
			</TouchableOpacity>
			<View style={Style.container}>
				<ScrollView>
					{lista && <ConstroiLista lista={lista} reload={Reload}/>}
					
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}
function ConstroiLista({lista, reload}: ConstroiListaProps) {
	const DeleteLista = async (id:number) =>{
		const { error } = await supabase
		.from('lista')
		.delete()
		.eq("id", id)
	
		if(error){
			console.log(error)
		}
	}
	const InsertCarrinho = async (nome:string, quantidade:number, preco: number)=>{
		const { error } = await supabase
		.from('carrinho')
		.insert({ nome: nome, quantidade: quantidade, preco: preco })
	
		if(error){
			console.log(error)
		}
	}
	return (
		<View>{
			lista.map((item) => (
				<View key={item.id}>
					<View style={Style.containerItem}>
						<View style={Style.containerTextItem}>
							<Text style={Style.textItem}>{item.nome}</Text>
							<Text style={Style.textItem}>{item.quantidade}</Text>
							<TouchableOpacity
							onPress={() =>{
								if(item.preco){
									InsertCarrinho(item.nome,item.quantidade, item.preco)
								}
								DeleteLista(item.id)
								reload()
								}}>
								<Ionicons name="checkmark-circle-outline" size={30} color={colors.add} />
							</TouchableOpacity>
						</View>
						<View>
							<TextInput
									keyboardType="numeric"
									placeholder="Preço do Item"
									placeholderTextColor={colors.secundaria}
									value={item.preco?.toString()}
									onChange={(e) => {
										item.preco = Number(e.nativeEvent.text)}}
									style={Style.inputItem} />
							</View>
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