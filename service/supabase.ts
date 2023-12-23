import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import { Database } from '../database.types'
import dotenv from 'dotenv'
dotenv.config()
// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(process.env.URL, process.env.KEY)

export async function GetLista(){
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

export async function InsertLista(nome:string, quantidade:number){
	const { error } = await supabase
	.from('lista')
	.insert({ nome: nome, quantidade: quantidade })

	if(error){
		console.log(error)
	}
}
export async function DeleteLista(id:number){
	const { error } = await supabase
	.from('lista')
	.delete()
	.eq("id", id)

	if(error){
		console.log(error)
	}
}

export async function GetCarrinho(){
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

export async function InsertCarrinho(nome:string, quantidade:number, preco: number){
	const { error } = await supabase
	.from('carrinho')
	.insert({ nome: nome, quantidade: quantidade, preco: preco })

	if(error){
		console.log(error)
	}
}
export async function DeleteCarrinho(id:number){
	const { error } = await supabase
	.from('carrinho')
	.delete()
	.eq("id", id)

	if(error){
		console.log(error)
	}
}
