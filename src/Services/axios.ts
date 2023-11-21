import axios from "axios";

export const getProductDetails = () => {
    return axios.get('https://dummyjson.com/products')
}

export const getProductDetail = (id: number) => {
    return axios.get(`https://dummyjson.com/products/${id}`)
}