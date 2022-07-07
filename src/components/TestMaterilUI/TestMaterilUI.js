import React from "react"
// import styled as s from 'styled-components'
import styled from 'styled-components'
import { Link, Navigate, useNavigate } from "react-router-dom"
import { testData } from "../../TestData/testData"

const Wrapper = styled.div`
    width: 500px;
    background-color: blue;
    display: flex;
    flex-direction: column;
    border-radius: 50px;
    overflow: hidden;
    /* border: solid 1px;; */
    box-shadow: 4px 5px 1px #f5f5f5;
    /* box-shadow: 1px 1px 1px 1px ; */
`
const Img = styled.img`
    /* width: 80%; */
    width: 100%;
    
`
const TitleWrapper = styled.div`
    text-align: center;
    background-color: white;
    /* background-color: #f5f5f5; */
   
`

const TitleText = styled.p`
    font-weight: bold;
`

const TestMaterialUI = () => {
    const navigate = useNavigate();
    console.log(testData);

    return (
        <>
            {/* <h1>TestMaterialUI</h1> */}

            <Wrapper onClick={() => navigate("./test", { state: testData })}>
                {/* <Link to={"/test"}> */}
                <Img src={"https://cdn-mapple.net/Normal/%E5%8C%97%E6%B5%B7%E9%81%93/1000918_00031.jpg"}></Img>
                <TitleWrapper>
                    <TitleText>
                        白い恋人パーク
                    </TitleText>
                </TitleWrapper>
                {/* </Link> */}
            </Wrapper>

        </>
    )
}


export default TestMaterialUI;