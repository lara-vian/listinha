import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import { colors } from "../../colors";
import { DeleteLista ,GetLista, InsertCarrinho } from "../../service/supabase";
import { useState } from "react";

interface ILista{
	nome: string,
	quantidade: number,
	id: number,
	preco?: number
}
interface ConstroiListaProps {
	lista: ILista[], 
	reload: () => void
}
export default function Lista() {
	const [lista, setLista] = useState<ILista[]>([])
	const Reload = () => {
		GetLista().then((data) => {
			if(data) {
				setLista(data)
			}})
	}
	return (
		<SafeAreaView style={{
			display: 'flex', alignItems: 'center',
			justifyContent: "space-around",
		}}>
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

	return (
		<View>{
			lista.map((item) => (
				<View key={item.id}>
					<View style={Style.containerItem} >
						<Text style={Style.textItem}>{item.nome}</Text>
						<Text style={Style.textItem}>{item.quantidade}</Text>
						<TouchableOpacity onPress={() =>{
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
								value={item.preco?.toString()}
								onChange={(e) => {
									item.preco = Number(e.nativeEvent.text)}}
								style={Style.input} />
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