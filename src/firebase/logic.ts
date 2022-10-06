// import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
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


import { getSessionStorage } from "../util/util"

function addUser(id: string, email: string) {
    const refCollection = collection(db, "users");
    addDoc(refCollection, {
        id: id,
        name: "test",
        email: email,
        latestLogin: serverTimestamp(),
        createdAt: serverTimestamp(),
        updateAt: serverTimestamp()
    })
        .then(() => {
            console.log("addUser success");
        })
        .catch((err) => {
            console.log(err);
        })
}

export function signUp(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("signUp success!!");

            const user = userCredential.user;
            addUser(user.uid, email);
        })
        .catch((error) => {
            console.log(error);
        })
}


export async function signIn(email: string, password: string) {
    let uid = "";
    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("signIn success!!");
            uid = userCredential.user.uid;

        })
        .catch((error) => {
            console.log(error);
        });

    const user = await getUserData(uid);
    const favoriteData = await getFavoriteData(uid);
    console.log(favoriteData);


    // const favoriteIds: Array<string> = favoriteData.favorites.map((favorite: ShightseeingData) => {
    const favoriteIds: Array<string> = favoriteData.map((favorite: ShightseeingData) => {
        return favorite.id
    });


    //ログイン時にお気に入りに登録している観光地IDをセッションストレージに保持する
    // sessionStorage.setItem("favorites", JSON.stringify(favorites.favorites));
    sessionStorage.setItem("favorites", JSON.stringify(favoriteIds));

}


export function logOut() {
    signOut(auth)
        .then((userCredential) => {
            console.log("signOut success!!");
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
// export async function addFirebase_favorite(user_id: string, addFavroriteId: string) {
// export async function update_firestoreFavorite(currentUser_id: string, sessionFavoriteIds: Array<string>) {
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
            unti: "remove"
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
            unti: "add"
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
