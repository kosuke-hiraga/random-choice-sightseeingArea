import axios, { AxiosInstance } from "axios"
import { MUNI_ARRAY } from "./muni"

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



/**
 * @desc emailが正しい書式か判定する
 * @param email バーリデーション対象のemal
 * @returns 正しい書式かどうか
 */
export function validateEmail(email: string) {
    const RegExp = /^[a-zA-Z0-9][a-zA-Z0-9.-_]*[a-zA-Z0-9]?@[a-zA-Z]+\.[a-zA-Z]+/;
    const isCorrectFormat = RegExp.test(email);

    let showMessage = isCorrectFormat === true ?
        "使用可能"
        : checkErrorContentEmail(email);

    const returnValue = {
        isCorrectFormat: isCorrectFormat,
        showMessage: showMessage
    }

    return returnValue;
}


/**
 * @desc バリデーションチェックに引っかかったemailを詳しく調査する
 * @param email 対象のemail
 * @returns エラーメッセージを返す
 */
export function checkErrorContentEmail(email: string): string {
    const blankError = "1文字以上入力してください";
    const firstStringError = "Emailの最初の文字は英数字(A-Z,a-z,0-9)のみ使用可能です";
    const notExistsAtsignError = "@が存在しません";
    const continueDotsError = "( . )が2個以上連続で使用されています";
    const existsDotAroundAtSignError = "@の前後に( . )が使用されています";
    const domainFormatError = "ドメイン部分の書式に不備があります";
    const undefinedError = "未設定のエラーです";


    //ブランクチェック
    const RegExp_blankError = /^$/;
    if (RegExp_blankError.test(email)) {
        return blankError;
    }
    //1文字目チェック
    const RegExp_firstString = /^[^a-zA-Z0-9]/;
    if (RegExp_firstString.test(email)) {
        return firstStringError;
    }
    //@存在チェック
    const RegExp_notExistsAtsign = /^(?!.*@)/;
    if (RegExp_notExistsAtsign.test(email)) {
        return notExistsAtsignError;
    }
    //ドット連続チェック
    const RegExp_continueDots = /[.]{2,}/;
    if (RegExp_continueDots.test(email)) {
        return continueDotsError;
    }
    //@前後.ドット存在チェック
    const RegExp_existsDotAroundAtSign = /[.@][@.]/;
    if (RegExp_existsDotAroundAtSign.test(email)) {
        return existsDotAroundAtSignError;
    }
    //ドメイン書式チェック(ドット存在チェック)
    const RegExp_domainFormat = /@[a-zA-Z0-9]+[.]?$/;
    if (RegExp_domainFormat.test(email)) {
        return domainFormatError;
    }

    return undefinedError;
}

/**
 * @desc passwordが正しい書式か判定する
 * @param password バーリデーション対象のpassword
 * @returns 正しい書式かどうか
 */
export function validatePassword(password: string) {
    const RegExp = /.{6,}/;
    const isCorrectFormat = RegExp.test(password);

    let showMessage = isCorrectFormat === true ?
        "使用可能"
        : checkErrorContentPassword(password);

    const returnValue = {
        isCorrectFormat: isCorrectFormat,
        showMessage: showMessage
    }

    return returnValue;
}

/**
 * @desc バリデーションチェックに引っかかったpasswordを詳しく調査する
 * @param password 対象のpassword
 * @returns エラーメッセージを返す
 */
export function checkErrorContentPassword(password: string): string {
    const blankError = "1文字以上入力してください";
    const lessCharactersError = "パスワードは6文字以上必要です";
    const undefinedError = "未設定のエラーです"

    //ブランクチェック
    // const RegExp_blankError = /^$/;
    // if (RegExp_blankError.test(password)) {
    //     return blankError;
    // }

    //6文字未満の場合
    const RegExp_lessCharactersError = /^.{0,5}$/;
    if (RegExp_lessCharactersError.test(password)) {
        return lessCharactersError;
    }

    return undefinedError;
}


/**
 * @desc ユーザー名が正しい書式か判定する
 * @param userName バーリデーション対象のuserName
 * @returns 正しい書式かどうか
 */
export function validateUserName(userName: string) {
    const RegExp = /[a-zA-Z0-9a-んァ-ヶ亜-黑]+/;
    const isCorrectFormat = RegExp.test(userName);

    let showMessage = isCorrectFormat === true ?
        "使用可能"
        : checkErrorContentUserName(userName);

    const returnValue = {
        isCorrectFormat: isCorrectFormat,
        showMessage: showMessage
    }

    return returnValue;
}

/**
 * @desc バリデーションチェックに引っかかったuserNameを詳しく調査する
 * @param userName 対象のuserName
 * @returns エラーメッセージを返す
 */
export function checkErrorContentUserName(userName: string): string {
    const blankError = "1文字以上入力してください";
    const undefinedError = "未設定のエラーです"

    //ブランクチェック
    const RegExp_blankError = /^$/;
    if (RegExp_blankError.test(userName)) {
        return blankError;
    }

    return undefinedError;
}


/**
 * @desc ブラウザで位置情報取得の許可が出た時のみ、現在位置の経緯・緯度を取得し「都道府県」「市」「区(ある場合)」を返す
 * @return Prefectures: 都道府県    
 *  City: 市    
 *  Ward: 区
 */
export async function setupGetPresentLocation() {
    let lat: number | undefined;
    let lng: number | undefined;
    let axiosTest: AxiosInstance | undefined;
    let presentLocation: {
        Prefectures: string;
        City: string;
        Ward: string | undefined;
    } | undefined;

    presentLocation = await new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition((position) => {
            let coords = position.coords;
            lat = coords.latitude;
            lng = coords.longitude;
            resolve("");
        }, () => {
            console.log("位置情報取得キャンセル");
            return undefined
        })
    }).then((result) => {
        axiosTest = axios.create({
            baseURL: `https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress?lat=${lat}&lon=${lng}`,
            headers: {
                'Content-Type': 'application/json',
                // 'X-Requested-With': 'XMLHttpRequest',
                // "Access-Control-Allow-Origin": "*"
            },
            responseType: 'json'
        });
        return axiosTest.get("").then((result) => {
            const muniCd = Number(result.data.results.muniCd);
            return getPresentLocation(muniCd);
            // presentLocation = getPresentLocation(muniCd);
        }).catch((err) => {
            console.log(err);
            return undefined
        });
    });
    return presentLocation;
}

/**
 * @desc muniCdに該当する「都道府県」「市町村」「区」を返す(但し区はある場合のみ)
 * @param muniCd muniCd(場所を一意に判定するコード)
 * @returns 該当する都道府県、市町村、区をまとめたオブジェクトを返す。該当しない場合、アラートを表示
 */
export function getPresentLocation(muniCd: number) {
    if (muniCd in MUNI_ARRAY) {
        //@ts-ignore
        const parseArray: Array<string> = MUNI_ARRAY[muniCd].split(",");
        let ward: string | undefined;
        //"札幌市　北区" の様な文字列があるので、その場合は分割する
        if (parseArray[3].includes("　")) {
            const parseCity = parseArray[3].split("　");
            //市を格納
            parseArray[3] = parseCity[0];
            //区を格納
            ward = parseCity[1];
        }
        return {
            Prefectures: parseArray[1], //都道府県
            City: parseArray[3], //市町村
            Ward: ward //区
        }
    } else {
        alert("該当する地域なし");
        return
    }
}