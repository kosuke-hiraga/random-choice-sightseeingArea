import React from "react";
import FavoriteIcon from "./FavoriteIcon";

export default {
    title: 'Atoms/FavoriteIcon',
    component: FavoriteIcon,
}

const Template = (args) => <FavoriteIcon {...args} />


export const On = Template.bind({});
On.args = {
    favorite: true,
};

export const Off = Template.bind({});
Off.args = {
    favorite: false,
    onClick: clickAlert
};



function clickAlert() {
    alert("clicked FavoriteIcon");
}