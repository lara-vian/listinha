"https://lara-vian.github.io/data/list/data-market.json"
"https://lara-vian.github.io/data/list/data-car.json"

import axios from "axios"

export const addMarket = (data: IData) =>{
  axios.put("https://lara-vian.github.io/data/list/data-market.json", data)
}

export const getMarket = () =>{
  return axios.get("https://lara-vian.github.io/data/list/data-market.json")
} 