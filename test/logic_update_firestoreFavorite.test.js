import {
    update_firestoreFavorite
} from "../src/firebase/logic"
import {
    getDocs,
    query,
    where,
    collection,
    updateDoc,
} from "firebase/firestore";
import { db, deleteApp, app } from '../src/firebase/firebase'
import { getSessionStorage } from "../src/util/util";
jest.mock("../src/util/util");

describe("update_firestoreFavorite", () => {
    let uid;
    let addFavoriteData;
    let removeFavoriteData;

    let ref_collection;
    let q;
    beforeAll(() => {
        uid = "testUser";
        addFavoriteData = ["0dDIM6FeuzJaR7jW6kGS"];
        removeFavoriteData = ["kjmVpGMeSPcThILW8xtA", "zGeGF4VMuOaCKo8UDErZ"];
        ref_collection = collection(db, "favoriteList");
        q = query(ref_collection, where("user_id", "==", uid));
    });
    afterAll(() => {
        deleteApp(app);
    });

    it("お気に入りデータ登録 0件→1件", async () => {
        //お気に入り情報を初期化
        const oldDocs = await getDocs(q);
        await updateDoc(oldDocs.docs[0].ref, {
            favorites: []
        });
        //firestoreにお気に入り情報追加
        getSessionStorage.mockImplementation(() => addFavoriteData);
        await update_firestoreFavorite(uid);
        //更新後の情報を取得
        const newDocs = await getDocs(q);
        const favoriteList = newDocs.docs[0].data();
        expect(favoriteList.favorites[0].id).toBe("0dDIM6FeuzJaR7jW6kGS");
    }, 20000);


    it("お気に入りデータ削除 3件→2件", async () => {
        //お気に入り情報を初期化
        const oldDocs = await getDocs(q);
        await updateDoc(oldDocs.docs[0].ref, {
            favorites: ["0dDIM6FeuzJaR7jW6kGS", "kjmVpGMeSPcThILW8xtA", "zGeGF4VMuOaCKo8UDErZ"]
        });
        //firestoreお気に入り情報を更新(削除)
        getSessionStorage.mockImplementation(() => removeFavoriteData);
        await update_firestoreFavorite(uid);
        //更新後の情報を取得
        const newDocs = await getDocs(q);
        const favoriteList = newDocs.docs[0].data();
        const removedIds = favoriteList.favorites.map((favorite) => favorite.id);
        expect(removedIds).toEqual(["kjmVpGMeSPcThILW8xtA", "zGeGF4VMuOaCKo8UDErZ"]);
    }, 20000);


    it("お気に入りデータ変化なし 中断", async () => {
        //お気に入り情報を初期化
        const oldDocs = await getDocs(q);
        await updateDoc(oldDocs.docs[0].ref, {
            favorites: ["0dDIM6FeuzJaR7jW6kGS"]
        });
        //firestoreお気に入り情報を更新(削除)
        getSessionStorage.mockImplementation(() => addFavoriteData);
        await update_firestoreFavorite(uid);
        //更新後の情報を取得
        const newDocs = await getDocs(q);
        const favoriteList = newDocs.docs[0].data();
        expect(favoriteList.favorites[0].id).toBe("0dDIM6FeuzJaR7jW6kGS");
    }, 20000);
});