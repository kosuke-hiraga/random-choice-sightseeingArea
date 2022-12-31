import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser } from "firebase/auth"
import {
    getDocs,
    addDoc,
    query,
    where,
    documentId,
    collection,
    serverTimestamp,
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
//@ts-ignore
import { db, auth } from './firebase'
import { User } from "../types/User";
import { favoriteList } from "../types/FavoriteList";
import { ShightseeingData } from "../types/SightseeingData";
import { getSessionStorage, addPrefectureString } from "../util/util"
import { STORAGE_KEY } from "../util/const";
import { ScreenType, ViewportState } from "../mediaQuary/config";

/**
 * @desc 新規登録時のアクション。firestoreにユーザーとお気に入りリストの初期設定を行う
 * @param id 認証されたユーザーのId
 * @param name 登録したユーザー名
 * @param email 登録したEmailアドレス
 */
async function addUser(id: string, name: string, email: string) {
    const ref_users = collection(db, "users");
    const UserInitializationData: User = {
        id: id,
        name: name,
        email: email,
        admin: false,
        latestSignIn: serverTimestamp(),
        latestSignOut: serverTimestamp(),
        createdAt: serverTimestamp(),
        updateAt: serverTimestamp()
    }
    addDoc(ref_users, UserInitializationData)
        .then(() => {
            console.log("addUser success");
        })
        .catch((err) => {
            console.log(err);
        });

    //ユーザー初期登録時、空のお気に入りリストを設定しないと情報取得時エラーになる為
    //ここで初期設定を行う
    const ref_favoriteList = collection(db, "favoriteList");
    const favoriteInitializationData: favoriteList = {
        user_id: id,
        favorites: [],
        createAt: serverTimestamp(),
        updateAt: serverTimestamp()
    }
    addDoc(ref_favoriteList, favoriteInitializationData)
        .then(() => {
            console.log("addfavoriteList success");
        })
        .catch((err) => {
            console.log(err);
        });
}


/**
 * @desc firebaseにサインアップする。
 * @param email サインアップに使用するemail
 * @param password サインアップに使用するpassword
 * @return isSignin サインアップ成功=true 失敗=false
 */
export function signUp(email: string, name: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            console.log("signUp success!!");
            const user = userCredential.user;
            //何かの間違いでユーザーコレクションに保存できなかった場合、整合性を保つ為に認証情報を削除する
            await addUser(user.uid, name, email).catch(() => {
                if (auth.currentUser !== null) {
                    console.log("削除");
                    deleteUser(auth.currentUser);
                }
                alert("ユーザー登録に不具合が発生しました。お手数ですがお問合せください");
            });
        })
        .catch((error) => {
            switch (error.code) {
                case "auth/operation-not-allowed":
                    alert("利用中止になっているメールドレスです"); break;
                case "auth/weak-password":
                    alert("パスワードは6文字以上"); break;
                case "auth/email-already-in-use":
                    alert("既に使用されているEmailアドレス"); break;
                case "auth/invalid-email":
                    alert("Emailアドレスの書式に不備があります"); break;
                default:
                    alert("原因不明のエラーです"); break;
            }
        });
}


/**
 * @desc firebaseにサインインする。サインインに失敗した場合、画面にアラートを出力する。
 * @param email サインインに使用するemail
 * @param password ログインに使用するpassword
 * @return isSignin サインイン成功=true 失敗=false
 */
export async function signIn(email: string, password: string): Promise<boolean> {
    let uid = "";
    let isSignIn = false;
    await signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            console.log("signIn success!!");
            uid = userCredential.user.uid;
            const favoriteData = await getFavoriteData(uid);

            const favoriteIds: Array<string> = favoriteData.map((favorite: ShightseeingData) => {
                return favorite.id
            });
            //ログイン時にお気に入りに登録している観光地IDをセッションストレージに保持する
            sessionStorage.setItem(STORAGE_KEY.FAVORITES, JSON.stringify(favoriteIds));
            isSignIn = true;
        })
        .catch((error) => {
            console.log(error);
            switch (error.code) {
                case "auth/invalid-email":
                    alert("Emailアドレスの書式に不備があります"); break;
                case "auth/user-not-found":
                    alert("存在しないユーザーです"); break;
                case "auth/user-disabled":
                    alert("利用停止中のユーザーです"); break;
                case "auth/wrong-password":
                    alert("パスワードが間違っています"); break;
                default:
                    alert("原因不明のエラーです"); break;
            }
        });
    return isSignIn;
}

/**
 * @name logOut firebaseからログアウトする
 */
export function logOut() {
    signOut(auth)
        .then((userCredential) => {
            console.log("signOut success!!");
            sessionStorage.clear();
        })
        .catch((error) => {
            console.log(error);
        })
}


/**
 * @name getSightseeingData_sample firestoreからレコードをランダムに最大10件取得する
 * @param numberOfRecordsYouWant 欲しいレコード数を指定(最大10件)
 * @return sightseeingData  取得したレコードを配列にして返す
 */
export async function getSightseeingData_sample() {
    console.log("sample get");

    //サンプルデータ取得
    const refCollection = collection(db, "sightseeingData_sample");
    const q = query(refCollection);
    const docs = await getDocs(q);

    const sightseeingData = docs.docs.map((doc) => {
        return {
            ...doc.data()
        } as ShightseeingData;
    });
    return sightseeingData;
}


/**
 * @name GetSightseeingData_developing firestoreからレコードをランダムに取得する(スマホ:8件, それ以外10件)
 * @param targetLocations 検索する都道府県達
 * @return sightseeingData  取得したレコードを配列にして返す
 * @caution firebaseのwhere句の仕様により、inには10個までしか条件を入れられない
 */
export async function GetSightseeingData_developing(targetLocations: Array<string>) {

    //各都道府県に「〇〇県」の様に「都」「府」「県」の文字を結合する
    targetLocations = targetLocations.map((location) => {
        return addPrefectureString(location);
    });

    const sightseeingIndexes = await (async () => {
        let indexs: Array<string> = [];
        for (let i = 0; i < targetLocations.length; i++) {
            console.log("うん");
            const docRef = doc(db, "sightseeingIndexs", targetLocations[i]);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                alert(`${targetLocations[i]}に対象データが存在しませんでした`)
                continue;
            }
            //取得した観光地IDを 8 or 10件にランダム抽出
            const extractIds = extractID(docSnap.data().ids);
            indexs = indexs.concat(extractIds);
        }

        //万一1件も観光地IDが取得できなかった場合、全件検索を行う
        if (indexs.length === 0) {
            console.log("全件検索");
            const refCol = collection(db, "sightseeingIndexs");
            const docs = await getDocs(refCol);
            const sightseeingALLIndexs = docs.docs.map((data) => {
                return data.data();
            });
            let ALLIndexs: any = [];
            for (let i = 0; i < sightseeingALLIndexs.length; i++) {
                const extractIds = extractID(sightseeingALLIndexs[i].ids);
                ALLIndexs = ALLIndexs.concat(extractIds);
            }
            indexs = ALLIndexs;
        }

        //各都道府県の観光地IDが同じ量になった状態で、もう一度ランダムに抽出したものをリターンする
        return extractID(indexs);
    })();


    //全件検索の場合、たまにidを取得し切る前に観光情報の検索が始まってしまうので、ディレイをかける
    // const delay = sightseeingIndexes.length === 0 ? 1 : 0;

    console.log(sightseeingIndexes);



    //firestoreから情報を取得
    const refCollection = collection(db, "sightseeingData");
    // console.log("検索する直前");
    const q = query(refCollection, where(documentId(), "in", sightseeingIndexes));
    const data = await getDocs(q);

    //取得した情報はそのままでは扱いずらいのでオブジェクト形式として配列に格納
    const sightseeingData = data.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data()
        } as ShightseeingData;
    });
    return sightseeingData;

    /**
     * @desc スマホなら8件。 それ以外の端末は10件レコードを取得する
     * @return 8件 or 10件のレコード
     */
    function extractID(Ids: Array<string>): Array<string> {
        const numberOfExecutions = ViewportState === ScreenType.Mobile ? 8 : 10;
        const extractIds = [];
        for (let i = 0; i < numberOfExecutions; i++) {
            let randomNum = Math.floor(Math.random() * Ids.length);
            let targetId = Ids.splice(randomNum, 1).toString();
            extractIds.push(targetId);
        };
        return extractIds;
    }
}



/**
 * @desc  ユーザーIDからユーザー情報を取得する
 * @param uid ログインしているユーザーID
 * @return userData  検索にヒットした１番目のユーザー情報(重複しない前提)
 * @caution レコードが0件の可能性があるので、留意する事
 */
export async function getUserData(uid: string) {
    const ref_users = collection(db, "users");
    const doc_users = await getDocs(query(ref_users, where(documentId(), "==", uid)));
    //取得した情報はそのままでは扱いずらいのでオブジェクト形式として配列に格納
    const userData = doc_users.docs.map((doc) => {
        return doc.data();
    });
    return userData[0];
}


/**
 * @desc  ユーザーがお気に入り登録しているレコードのみを取得する
 * @param user_id ログインしているユーザーID
 * @return sightseeingData  取得したレコードを配列にして返す
 * @caution レコードが0件の可能性があるので、留意する事
 */
export async function getFavoriteData(user_id: string) {
    const ref_favoriteList = collection(db, "favoriteList");
    const doc_favoriteList = await getDocs(query(ref_favoriteList, where("user_id", "==", user_id)));
    //取得した情報はそのままでは扱いずらいのでオブジェクト形式として配列に格納
    const favoriteList = doc_favoriteList.docs.map((doc) => {
        return doc.data();
    });
    //firestoreから情報を取得できなかった場合、エラー阻止の為に空の情報を追加する
    if (favoriteList.length === 0) {
        favoriteList[0] = {
            favorites: []
        }
    }
    return favoriteList[0].favorites as Array<ShightseeingData>;
}



/**
 * セッションストレージに観光地IDを保存/削除する
 * 重複したIDは保存されない
 * @param targetFavroriteId セッションストレージに追加/削除したい観光地ID
 * @param becomeFavorite:  true = お気に入り状態になった false = 外された を意味する
 * @returns 
 */
export function update_SessionStorage_favrorite(targetFavroriteId: string, becomeFavorite: boolean) {
    const sessionfavoriteIds: Array<string> = getSessionStorage(STORAGE_KEY.FAVORITES);
    let newFavorites: Array<string> = [];

    //お気に入り状態になった時、対象のIDを追加した配列を作成する
    if (becomeFavorite === true) {
        console.log("お気に入り登録");
        //重複があった場合、保存処理を中断する
        if (sessionfavoriteIds.includes(targetFavroriteId)) {
            console.log("同一favoriteIDが存在するので処理を中断");
            return
        }
        newFavorites = sessionfavoriteIds.concat(targetFavroriteId);
    }

    //お気に入り状態が解除された時、対象のIDを取り除いた配列を作成する
    if (becomeFavorite === false) {
        console.log("お気に入り削除");
        newFavorites = sessionfavoriteIds.filter((favoriteId: string) => {
            return targetFavroriteId !== favoriteId;
        });
    }

    sessionStorage.setItem(STORAGE_KEY.FAVORITES, JSON.stringify(newFavorites));
}




/**
 * firebaseの観光地IDを更新によって追加、削除する  
 * @caution【注意!】現状、登録されていないユーザーが引数に渡るとエラーになります!
 * @param currentUser_id 現在ログインしているユーザーのid
 * @returns 
 */
export async function update_firestoreFavorite(currentUser_id: string) {
    const ref_favoriteList = collection(db, "favoriteList");
    const q = query(ref_favoriteList, where("user_id", "==", currentUser_id));
    const doc_favoriteList = await getDocs(q);
    //観光地IDだけ抽出しておく
    const favoriteData = doc_favoriteList.docs[0].data();
    const firestoreFavoriteIds = favoriteData.favorites.map((favorite: ShightseeingData) => {
        return favorite.id
    });
    const ref_favoriteData = doc_favoriteList.docs[0].ref;


    //firestoreとセッションストレージのお気に入り情報の差分だけ更新の処理を行う
    const sessionFavoriteIds: Array<string> = getSessionStorage(STORAGE_KEY.FAVORITES);
    const newFavoriteIds: Array<string> = sessionFavoriteIds.filter((favoriteId: string) =>
        firestoreFavoriteIds.indexOf(favoriteId) == -1
    );
    const removeFavoriteIds: Array<string> = firestoreFavoriteIds.filter((favoriteId: string) =>
        sessionFavoriteIds.indexOf(favoriteId) == -1
    );

    //新規登録ID, 削除対象IDが存在しなければ処理を中断する
    if (newFavoriteIds.length === 0 && removeFavoriteIds.length === 0) {
        console.log("差分0");
        return
    }

    //削除される観光地データを取り除き、更新処理を行う
    if (removeFavoriteIds.length > 0) {
        removeFavoriteIds.forEach((removeFavoriteId) => {
            favoriteData.favorites = favoriteData.favorites.filter((favorite: ShightseeingData) => {
                return (favorite.id !== removeFavoriteId)
            });
        });
        console.log(favoriteData.favorites);
        await updateDoc(ref_favoriteData, {
            favorites: favoriteData.favorites,
        });
        console.log("remove finish");
    }


    //追加される観光地データをfirestoreから取得
    if (newFavoriteIds.length > 0) {
        let newFavoriteData: Array<ShightseeingData> = [];
        await Promise.all(
            newFavoriteIds.map(async (addFavroriteId) => {
                const refDoc = doc(db, "sightseeingData", addFavroriteId)
                const addFavroriteData = await getDoc(refDoc);
                newFavoriteData = newFavoriteData.concat({
                    id: addFavroriteId,
                    ...addFavroriteData.data()
                } as ShightseeingData);
            })
        );

        await updateDoc(ref_favoriteData, {
            favorites: favoriteData.favorites.concat(newFavoriteData),
        });
        console.log("add finish");
    }
}