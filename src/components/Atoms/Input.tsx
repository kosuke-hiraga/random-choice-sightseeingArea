import styled from 'styled-components'
import StarIcon from '@mui/icons-material/Star';
import React, { useState } from 'react';
import { toBoolean } from '../../util/util';
import { style } from '@mui/system';
import { ProgressPlugin } from 'webpack';
import { styled as st } from "@mui/system";


const sxBody = (props: any) => (
    <Body2 {...props} />
);

const Body = styled.input`
    background-color: #e6e7ee;
    box-shadow: inset 2px 2px 1px #cfd0d6,
                inset -2px -2px 1px #fdfeff;
    border: none;
    border-radius: 40px;
`

// const Body2 = styled.input.attrs({type: props.type})`
//     background-color: #e6e7ee;
//     box-shadow: inset 2px 2px 1px #cfd0d6,
//                 inset -2px -2px 1px #fdfeff;
//     border: none;
//     border-radius: 40px;
// `
// const Body2 = styled(sxBody).attrs({ type: {props => props.type }})`
const Body2 = styled(sxBody).attrs((props) => ({ type: (props.type) }))`
    background-color: #e6e7ee;
    box-shadow: inset 2px 2px 1px #cfd0d6,
                inset -2px -2px 1px #fdfeff;
    border: none;
    border-radius: 40px;
`




const Input: React.FC = (props) => {

    return (
        // <Body  {...props} />
        <Body2  {...props} />
        // <Body type={} />
    )
}

export default Input;