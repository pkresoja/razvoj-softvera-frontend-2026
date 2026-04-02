import type { ToyModel } from "./toy.model";

export interface FavouriteModel {
    favouriteId: number,
    toyId: number,
    toy: ToyModel,
    createdAt: string
}