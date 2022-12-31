import BaseButton from "./BaseButton";

export default {
    title: 'Atoms/LoginButton',
    component: BaseButton,
}

const Template = (args) => <BaseButton {...args}></BaseButton>


export const withParameters = Template.bind({});
withParameters.args = {
    width: 300,
    height: 200,
    children: "button",
    onClick: () => console.log("button clicked!")
};

export const noParameters = Template.bind({});
