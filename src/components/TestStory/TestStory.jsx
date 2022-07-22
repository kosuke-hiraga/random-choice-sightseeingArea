import { Typography } from "@mui/material";
import React from "react";
import styled from 'styled-components'

const TitleWrapper = styled.div`
background-color: yellow;
`

const TestStory = () => {
    // console.log(props);
    // const props = useLocation().state;

    return (
        <>
            <TitleWrapper>
                <Typography>inti</Typography>
            </TitleWrapper>

        </>
    )
}

export default TestStory;