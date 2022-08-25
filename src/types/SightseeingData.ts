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
    createAt?: object,
    updateAt?: object,
    setState?: React.Dispatch<React.SetStateAction<number>>
    // setState?: [number, React.Dispatch<React.SetStateAction<number>>]
    // key?: number
}