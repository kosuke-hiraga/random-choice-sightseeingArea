import PasswordHiddenToggle from "./PasswordHiddenToggle";

export default {
    title: 'Atoms/PasswordHiddenToggle',
    component: PasswordHiddenToggle,
}

const Template = (args) => <PasswordHiddenToggle {...args} />


export const noParameter = Template.bind({});

export const withParameter = Template.bind({});
withParameter.args = {
    onClick: () => console.log("clicked!!")
}