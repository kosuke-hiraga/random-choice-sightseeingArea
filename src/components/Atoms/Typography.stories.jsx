import React from "react";
import { styled as st } from "@mui/system";
import ButtonMUI from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default {
    title: 'Atoms/Typography',
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