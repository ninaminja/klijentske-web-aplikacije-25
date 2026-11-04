import { DetaljiModel } from "./detalji.model"


export interface OrderModel{
    movieId:number
    originalTitle:string
    director:string
    location:DetaljiModel
    count: number
    pricePerItem: number
    status: 'ordered'|'paid'|'canceled',
    rating: null | boolean 

}