import { ADD_TO_CART, ADD_TO_FAV, REMOVE_FROM_CART, REMOVE_FROM_FAV } from "./ActionTypes"


export const addItemToCart = (data: any) =>({
    type: ADD_TO_CART,
    payload: data
})

export const removeItemFromCart = (index:number)=>({
    type: REMOVE_FROM_CART,
    payload: index
})

export const addItemToFav = (data: any)=>({
    type: ADD_TO_FAV,
    payload: data
})

export const removeItemFromFav = (index: number)=>({
    type: REMOVE_FROM_FAV,
    payload: index
})