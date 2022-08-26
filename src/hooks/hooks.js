import { useState } from "react";
// import { db } from './../firebase/firebase'
import { db } from './../firebase/firebase_TestENV'
import { collection, documentId, getDocs, query, where } from 'firebase/firestore';

// export const useGetSightseeingData = 

export async function useGetSightseeingData(numberOfRecordsYouWant) {
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

    const extractDocIds = [];
    for (let i = 0; i < numberOfRecordsYouWant; i++) {
        let randomNum = Math.floor(Math.random() * docIds.length);
        let docId = docIds.splice(randomNum, 1).toString();
        extractDocIds.push(docId);
    }


    //取得したいドキュメントの情報を記載
    const q = query(refCollection, where(documentId(), "in", extractDocIds));

    //firestoreから情報を取得
    const doc = await getDocs(q);

    //取得した情報はそのままでは扱いずらいのでオブジェクト形式として配列に格納
    const sightseeingData = doc.docs.map((doc) => {
        return doc.data();
    });

    console.log(sightseeingData);

    return sightseeingData;
}