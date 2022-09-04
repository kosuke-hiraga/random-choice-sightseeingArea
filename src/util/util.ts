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