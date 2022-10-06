import styled from 'styled-components'
import { P } from '../../components/Atoms/Typography'

import { db } from '../../firebase/firebase'
import { collection, documentId, getDocs, query, where, collectionGroup, updateDoc, doc, getDoc, addDoc, serverTimestamp } from 'firebase/firestore';

import { useState, useContext, useEffect } from "react"
import { AuthContext } from '../../state/LoginProvider'
import { testData } from '../../TestData/testData';
import { ShightseeingData } from '../../types/SightseeingData';

import { getUserData, getFavoriteData } from '../../firebase/logic';



const Title = styled.div`
    width: 70%; 
    text-align: center;
    display: grid;
    place-items:  center left;
`

const InputArea = styled.div`
    background-color: red;
    width: 500px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`

const InputEmail = styled.input`
    width: 90%;
    height: 30%;
`

const InputPassword = styled.input`
    width: 90%;
    height: 30%;
`

async function getData2() {
    const ref_users = collection(db, "users");
    //firestoreから情報を取得
    // const doc_users = await getDocs(query(ref_users));
    const doc_users = await getDocs(query(ref_users, where(documentId(), "==", "GYyYDlQoK2eEMnqiO7FY")));

    //取得した情報はそのままでは扱いずらいのでオブジェクト形式として配列に格納
    const sightseeingData = await Promise.all(doc_users.docs.map(async (doc) => {

        //サブコレクション取得
        const ref_favoriteList = collection(doc.ref, "favoriteList");
        const doc_favoriteList = await getDocs(query(ref_favoriteList));

        const favoriteList = doc_favoriteList.docs.map((doc) => {
            return doc.data();
        });
        //サブコレクションの中身 + users情報のオブジェクトを返却
        return (
            {
                favoriteList: favoriteList,
                sightseeingData: doc.data()
            }
        )
    }));
    return sightseeingData;
}



async function perseFavoriteData() {
    const user = await getUserData("nJMhRN2XbPaWmqCHMoR9lRnrpy03");
    console.log(user.id);
    const userFavorite = await getFavoriteData(user.id);
    console.log(userFavorite);
    console.log(userFavorite);

    let ids = userFavorite.map((item: any) => {
        return item.id
    });
    console.log(ids);
    console.log(ids[2].data());

    let rr = userFavorite.find((item: any) => item.id == "3");
    console.log(rr);
    // return favoriteList;
}

//使い捨て　データ追加完了したのでいつでも削除可能
async function addData() {
    const ref_favoriteList = collection(db, "favoriteList");

    const favoriteList: Array<ShightseeingData> = [];
    favoriteList.push(testData[1]);
    favoriteList.push(testData[2]);
    favoriteList.push(testData[3]);

    addDoc(ref_favoriteList, {
        user_id: "testUser",
        favorites: favoriteList
    });
}


//使い捨て　
async function addData_sightseeing() {
    const ref_favoriteList = collection(db, "sightseeingData");

    const favoriteList: Array<ShightseeingData> = [];
    favoriteList.push(testData[1]);
    favoriteList.push(testData[2]);
    favoriteList.push(testData[3]);

    favoriteList.forEach((data) => {
        addDoc(ref_favoriteList, {
            title: data.title,
            subTitle: data.subTitle,
            access: data.access,
            address: data.access,
            area: data.area,
            explanation: data.explanation,
            imgs: data.imgs,
            price: data.price,
            createAt: serverTimestamp(),
            updateAt: serverTimestamp(),
        });
    })


}


const PR = () => {
    const Auth = useContext(AuthContext);
    console.log(Auth);

    return (
        <>
            <div>Auth user : {Auth.currentUser}</div>
            {/* <div>{`ログイン中ユーザーは${isLogin}`}</div> */}
            <Title>
                {/* <P onClick={() => getData()}>get data</P> */}
                <P onClick={() => getData2()}>get data2</P>
                <P onClick={() => perseFavoriteData()}>perseFavoriteData</P>
                <P onClick={() => addData()}>addData</P>

                <P onClick={() => getFavoriteData("nJMhRN2XbPaWmqCHMoR9lRnrpy03")}>get favorite</P>
                <P onClick={() => addData_sightseeing()}>addData_sightseeing</P>


                {/* <P onClick={() => test()}>test</P> */}

            </Title>


            {/* <InputArea>
                <InputEmail id='inputEmail' defaultValue={"test@gmail.com"}></InputEmail>
                <InputPassword id="inputPassword" defaultValue={"ramram"}></InputPassword>
            </InputArea> */}
        </>
    )


}

export default PR;