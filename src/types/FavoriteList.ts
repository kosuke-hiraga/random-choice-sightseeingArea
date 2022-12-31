import { ShightseeingData } from "./SightseeingData"

export type favoriteList = {
    user_id: string,
    favorites: Array<ShightseeingData>,
    createAt?: object,
    updateAt?: object,
}