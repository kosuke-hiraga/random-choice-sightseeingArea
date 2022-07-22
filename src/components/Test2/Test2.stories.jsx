import React from "react";
// import { useLocation } from "react-router-dom";
// import styled from 'styled-components'
import { styled as st } from "@mui/system";
import ButtonMUI from '@mui/material/Button';
// import Test from './Test';
// import Test from '../TestStory/TestStory';
import Typography from '@mui/material/Typography';


const BB = st(ButtonMUI)`
    background-color: blue;
`


export default {
    // title: "Test",
    title: 'MaterialUI/Typography/',
    // component: BB,
    // component: ButtonMUI,
    component: Typography,

}

const showString = "Test string";

export const severalVariants = () => (
    <>
        < Typography variant="body1" >{`body1: ${showString}`}</Typography>
        <Typography variant="body2">{`body2: ${showString}`}</Typography>
        <Typography variant="button">{`button: ${showString}`}</Typography>
        <Typography variant="caption" paragraph={true}>{`caption: ${showString}`}</Typography>
        <Typography variant="h1">{`h1: ${showString}`}</Typography>
        <Typography variant="h2">{`h2: ${showString}`}</Typography>
        <Typography variant="h3"> {`h3: ${showString}`}</Typography>
        <Typography variant="h4">{`h4: ${showString}`}</Typography>
        <Typography variant="h5">{`h5: ${showString}`}</Typography>
        <Typography variant="h6">{`h6: ${showString}`}</Typography>
        <Typography variant="inherit">{`inherit: ${showString}`}</Typography>
        <Typography variant="overline">{`overline: ${showString}`}</Typography>
        <Typography variant="subtitle1">{`subtitle1: ${showString}`}</Typography>
        <Typography variant="subtitle2">{`subtitle1: ${showString}`}</Typography>
         <Typography variant="string">{`string: ${showString}`}</Typography>
    </>
)


// export const unti = () => (
//     {{}}
 

// )