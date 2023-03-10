export type ShightseeingData = {
    id: string,
    title: string,
    subTitle: string,
    explanation: string,
    imgs: Array<string> | Array<undefined>,
    address: string,
    area: string,
    access: string,
    price: string,
    isFavorited?: boolean,
    createAt?: object,
    updateAt?: object,
}