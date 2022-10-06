import { favoriteList } from "../types/FavoriteList";

/**
 * 文字列をboolean型にして返却する。 
 * "true"ならtrue(大文字小文字問わず), それ以外はfalse。
 * @param str @type {string | null}
 * @returns boolean
 */
export function toBoolean(str: string | null | undefined): boolean {
    str = (str === null) || (str === undefined) ? "" : str
    return str.toLowerCase() === "true";
}


/**
 * 引数に渡した観光地データのIDがお気に入り登録されているか確認する
 * @param sightseeingId 観光地データのID
 * @returns boolean 
 */
export function isFavorite(sightseeingId: string): boolean {
    const userFavorites = getSessionStorage("favorites");
    if (userFavorites.length === 0) {
        return false
    }
    return userFavorites.some((favorite) => favorite === sightseeingId);
}


/**
 * セッションストレージに保存されているデータをパースして取得する。
 * ※対応するデータがない場合、空の配列を返す
 * @param key 取得したいセッションストレージのkey
 * @returns パースされた配列
 */
export function getSessionStorage(key: string): Array<string> {
    let sessionStorage_favorites = sessionStorage.getItem(key);
    //セッションストレージに何も登録されていない場合、JSON.parseの処理でコケるので殻の配列を初期化しておく
    if (sessionStorage_favorites === null) {
        sessionStorage_favorites = JSON.stringify([]);
    }
    //空の配列が上記の処理によって確約されているので!を付ける
    return JSON.parse(sessionStorage_favorites!)
}
