import Tab from "./Tab";

export default {
    title: 'Molecules/Tab',
    component: Tab,
}

const Template = (args) => <Tab {...args}></Tab>


export const withParameters = Template.bind({});
withParameters.args = {
    label: ["test1", "test2", "test3"],
    data: ["data1", "data2", "data3"]
};
