import type { ToyModel } from "./toy.model"

export interface CartItemModel {
    cartItemId: number
    toyId: number
    count: number
    price: number
    createdAt: string
    toy: ToyModel
}