import React, { useEffect, useState } from "react"
import { db } from './../../firebase/firebase'
import { collection, documentId, getDocs, query, where } from 'firebase/firestore';
import { async } from "@firebase/util";


const SightseeingData = (data) => {

    const [querySnapshot_random, setquerySnapshot_random] = useState({});

    // console.log(data);

    async function excute() {
        console.log("excute");
        const refCollection = collection(db, "sightseeingData");
        const querySnapshot = await getDocs(refCollection);

        //配列で返ってくるので、それぞれ取り出してあげる
        const docIds = querySnapshot.docs.map(doc => (
            doc.id
        ));
        const randomNumber = Math.floor(Math.random() * querySnapshot.docs.length);
        //取得したいドキュメントの情報を記載
        console.log(docIds[randomNumber]);
        const q = query(refCollection, where(documentId(), "==", docIds[randomNumber]));
        //firestoreから情報を取得
        const doc = await getDocs(q);
        console.log(doc.docs[0].data());
        setquerySnapshot_random(doc.docs[0].data());
        console.log(doc.docs[0].data());
    }


    return (<>
        <button onClick={excute}>show firebase</button>
        <div className="pickup_spot__block">
            <h2 className="ttl">{querySnapshot_random.title}</h2>
            <h3 className="subttl">{querySnapshot_random.subTitle}</h3>

            <p>{querySnapshot_random.explanation}</p>


            <figure className="m-b-15 m-t-15">
                {/* <a href="/spot/photos/1000918/1/">
                    <img alt="白い恋人パーク" src="https://cdn-mapple.net/Normal/%E5%8C%97%E6%B5%B7%E9%81%93/1000918_00031.jpg" data-lazy-type="image" data-lazy-src="https://cdn-mapple.net/Normal/北海道/1000918_00031.jpg" className="lazy lazy-loaded"></img>
                </a> */}
            </figure>

            <figure className="m-b-15 m-t-15">
                {/* <a href="/spot/photos/1000918/2/"><img alt="白い恋人パーク" src="https://cdn-mapple.net/Normal/%E5%8C%97%E6%B5%B7%E9%81%93/1000918_20220118-5.jpg" data-lazy-type="image" data-lazy-src="https://cdn-mapple.net/Normal/北海道/1000918_20220118-5.jpg" className="lazy lazy-loaded"></img>
                </a> */}
            </figure>

            <div className="waku m-t-20 m-b-20">

                <h2 className="no_bottom_padding">
                    <a href="/spot/1000918/">白い恋人パーク <i className="ico_link_arrow m-l-10"></i></a>
                </h2>


                <dl className="info">
                    <dt className="type1">住所</dt>
                    <dd>{querySnapshot_random.address}</dd>
                    <dt className="type1">交通</dt>
                    <dd>{querySnapshot_random.access}</dd>
                    <dt className="type1">料金</dt>
                    <dd>{querySnapshot_random.price}</dd>
                </dl>

                <p className="detail_link_text"><a href="/spot/1000918/" className="link_txt">詳細情報を見る <i className="ico_link_arrow ico_link_arrow_black m-l-5"></i></a></p>
            </div>
        </div>
    </>
    );


}



export default SightseeingData;