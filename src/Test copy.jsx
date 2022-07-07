import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from 'styled-components'


const TitleWrapper = styled.div`
    background-color: yellow;
`

const Title = styled.p`
    text-align: center;
`

const SubTitle = styled.p`
    text-align: center;
`

const Explanation = styled.p`
    text-align: center;
`

const ImgWrapper = styled.div`
    display: flex;
`

const Img = styled.img`
    
`

const SightseeingInfoWrapper = styled.div`
    
`

const SightseeingInfo_address = styled.p`
    
`





const Test = () => {
    // console.log(props);
    const [isShow, setIsShow] = useState(true);
    const props = useLocation().state;

    props.imgs.forEach(e => {
        console.log(e);
    })

    return (<>
        <h1>Test!</h1>
        <div className="pickup_spot__block">
            <h2 className="ttl">{props.title}</h2>
            <h3 className="subttl">{props.subTitle}</h3>

            <p>{props.explanation}</p>

            <button onClick={() => setIsShow(!isShow)}>change show Butotn</button>
            {isShow && <div>isShow!!</div>}
            {props.imgs.map((img, index) => {
                return (
                    <figure className="m-b-15 m-t-15" key={index}>
                        <img alt="白い恋人パーク" src={img}  ></img>
                    </figure>
                )
            })}

            <div className="waku m-t-20 m-b-20">

                <h2 className="no_bottom_padding">
                    {/* <a href="/spot/1000918/">白い恋人パーク <i className="ico_link_arrow m-l-10"></i></a> */}
                </h2>


                <dl className="info">
                    <dt className="type1">住所</dt>
                    <dd>{props.address}</dd>
                    <dt className="type1">交通</dt>
                    <dd>{props.access}</dd>
                    <dt className="type1">料金</dt>
                    <dd>{props.price}</dd>
                </dl>

                <p className="detail_link_text"><a href="/spot/1000918/" className="link_txt">詳細情報を見る <i className="ico_link_arrow ico_link_arrow_black m-l-5"></i></a></p>
            </div>
        </div>
    </>
    )
}

export default Test;