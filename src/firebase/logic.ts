// import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser } from "firebase/auth"
import {
    getDocs,
    addDoc,
    query,
    where,
    documentId,
    // getFirestore,
    collection,
    serverTimestamp,
    doc,
    getDoc,
    updateDoc,
    Firestore,
    // deleteDoc
} from "firebase/firestore";
import { ShightseeingData } from "../types/SightseeingData";

//@ts-ignore
import { db, auth } from './firebase'
// import { db as db2, getTestEnv } from "./firebase_TestENV"
// import { db, auth, getTestEnv } from "./firebase_TestENV"
import { User } from "../types/User";

import { getSessionStorage } from "../util/util"
import { favoriteList } from "../types/FavoriteList";



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
            const user = await getUserData(uid);
            const favoriteData = await getFavoriteData(uid);

            const favoriteIds: Array<string> = favoriteData.map((favorite: ShightseeingData) => {
                return favorite.id
            });
            //ログイン時にお気に入りに登録している観光地IDをセッションストレージに保持する
            sessionStorage.setItem("favorites", JSON.stringify(favoriteIds));
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
 * @name GetSightseeingData firestoreからレコードをランダムに最大10件取得する
 * @param numberOfRecordsYouWant 欲しいレコード数を指定(最大10件)
 * @return sightseeingData  取得したレコードを配列にして返す
 */
export async function GetSightseeingData(numberOfRecordsYouWant: number) {
    // const [sightseeingData, setSightseeingData] = useState();
    console.log(numberOfRecordsYouWant);

    console.log("excute");
    const refCollection = collection(db, "sightseeingData");
    const querySnapshot = await getDocs(refCollection);

    //配列で返ってくるので、それぞれ取り出してあげる
    const docIds = querySnapshot.docs.map(doc => (
        doc.id
    ));

    //何かの間違いでレコード数より多く取得した場合エラーになるので、最大値までしか取得できない様にする
    if (docIds.length < numberOfRecordsYouWant) {
        numberOfRecordsYouWant = docIds.length;
    }

    // const randomNumber = Math.floor(Math.random() * querySnapshot.docs.length);
    const extractDocIds = [];
    for (let i = 0; i < numberOfRecordsYouWant; i++) {
        let randomNum = Math.floor(Math.random() * docIds.length);
        let docId = docIds.splice(randomNum, 1).toString();
        extractDocIds.push(docId);
    }


    //取得したいドキュメントの情報を記載
    // console.log(docIds[randomNumber]);
    // const q = query(refCollection, where(documentId(), "==", docIds[randomNumber]));
    const q = query(refCollection, where(documentId(), "in", extractDocIds));

    //firestoreから情報を取得
    const doc = await getDocs(q);

    //取得した情報はそのままでは扱いずらいのでオブジェクト形式として配列に格納
    const sightseeingData = doc.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data()
        } as ShightseeingData;
    });
    return sightseeingData;
}




/**
 * @desc  ユーザーIDからユーザー情報を取得する
 * @param uid ログインしているユーザーID
 * @return userData  検索にヒットした１番目のユーザー情報(重複しない前提)
 * @caution レコードが0件の可能性があるので、留意する事
 * 
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
 * 
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
    // return favoriteList[0];
}



/**
 * セッションストレージに観光地IDを保存/削除する
 * 重複したIDは保存されない
 * @param targetFavroriteId セッションストレージに追加/削除したい観光地ID
 * @param becomeFavorite:  true = お気に入り状態になった false = 外された を意味する
 * @returns 
 */
export function update_SessionStorage_favrorite(targetFavroriteId: string, becomeFavorite: boolean) {
    const sessionfavoriteIds: Array<string> = getSessionStorage("favorites");
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

    sessionStorage.setItem("favorites", JSON.stringify(newFavorites));
}




/**
 * firebaseの観光地IDを更新によって追加、削除する
 * 【注意!】現状、登録されていないユーザーが引数に渡るとエラーになります!
 * @param currentUser_id 現在ログインしているユーザーのid
 * @param sessionFavoriteIds セッションストレージから取得したお気に入り観光地のID達
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
    const sessionFavoriteIds: Array<string> = getSessionStorage("favorites");
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
        // console.log(newFavoriteData);

        await updateDoc(ref_favoriteData, {
            favorites: favoriteData.favorites.concat(newFavoriteData),
        });
        console.log("add finish");
    }
}


export function testSessionStorage() {
    sessionStorage.setItem("testItem", JSON.stringify("test"));
    let testItem = sessionStorage.getItem("testItem");

    //セッションストレージに何も登録されていない場合、JSON.parseの処理でコケるので殻の配列を初期化しておく
    if (testItem === null) {
        testItem = JSON.stringify("");
    }
    //空の配列が上記の処理によって確約されているので!を付ける
    const Item: string = JSON.parse(testItem!);

    return Item;

}




export async function te() {
    //     //@ts-ignore
    // const testEnv = await getTestEnv();
    // const alice = testEnv.authenticatedContext("H1UCHFKqD3WuBnMlYeka302pNYw2");
    // const test = collection(alice.firestore(), "test");
    // const test = collection(db2 as Firestore, "test");
    const test = collection(db, "test");
    //     console.log(test);

    // addDoc(test, {
    //     col1: "io"
    // });

    //     console.log("finish add");

    const docs = await getDocs(test);
    //     // console.log(docs);
    //     // console.log(docs.docs);
    const data = docs.docs.map((doc) => {
        return doc.data();
    });
    console.log(data);
}
