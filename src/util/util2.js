/**
 * 文字列をboolean型にして返却する。 nullだった場合false。
 * @param str @type {string | null}
 * @returns boolean
 */
export function toBoolean(str) {
    str = str === null ? "" : str
    return str.toLowerCase() === "true";
}