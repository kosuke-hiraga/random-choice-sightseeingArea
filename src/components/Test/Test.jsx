import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from 'styled-components'
import { styled as st } from "@mui/system";

// import Typography from '@mui/material/Typography';
// import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const TitleWrapper = styled.div`
background-color: yellow;
`

// const TitleWrapper = st.div`
//     /* background-color: yellow; */
// `

const Title = styled.p`
    text-align: center;
`
const Title2 = st(Typography)`
    text-align: center;
`


const SubTitle = styled.p`
    text-align: center;
`

const Explanation = styled.p`
    text-align: center;
`

const ImgWrapper = styled.div`
width: 1000px;
    display: flex;
`

const Img = styled.img`
    
`

const SightseeingInfoWrapper = styled.div`
    
`

const SightseeingInfo_address = styled.p``
const SightseeingInfo_access = styled.p`   `
const SightseeingInfo_price = styled.p``

const StyledButton = st(Button)`
    color: red;
    background-color: #1e1e2e;
`




const Test = () => {
    // console.log(props);
    const props = useLocation().state;

    return (
        <>
            <TitleWrapper>
                <Title>{props.title}</Title>
                <Title2 variant="body2">{props.title}</Title2>
                <Title2 variant="caption">{props.title}</Title2>
                <Title2 variant="inherit">{props.title}</Title2>
                <Title2 variant="overline">{props.title}</Title2>
                <Title2 variant="subtitle1">{props.title}</Title2>
                <Title2 variant="subtitle2">{props.title}</Title2>
                <Title2 variant="string">{props.title}</Title2>

                <SubTitle>{props.subTitle}</SubTitle>
                <Typography

                >
                    unti

                </Typography>
            </TitleWrapper>
            <ImgWrapper >
                {props.imgs.map((img, index) => (
                    <Img alt={props.title} src={img} key={index}></Img>
                ))}
            </ImgWrapper>
            <Explanation>{props.explanation}</Explanation>
            <SightseeingInfoWrapper>
                <SightseeingInfo_address>{props.address}</SightseeingInfo_address>
                <SightseeingInfo_access>{props.access}</SightseeingInfo_access>
                <SightseeingInfo_price>{props.price}</SightseeingInfo_price>
            </SightseeingInfoWrapper>

        </>
    )
}

export default Test;