// export type favoriteList = {
//     id: string,
//     title: string,
//     subTitle: string,
//     explanation: string,
//     imgs: Array<string> | Array<undefined>,
//     address: string,
//     area: string,
//     access: string,
//     price: string,
//     createAt?: object,
//     updateAt?: object,
// }

import { ShightseeingData } from "./SightseeingData"

export type favoriteList = {
    user_id: string,
    favorites: Array<ShightseeingData>,
    createAt?: object,
    updateAt?: object,
}