import InputPrefectures from "./InputPrefectures";

export default {
    title: 'Molecules/InputPrefectures',
    component: InputPrefectures,
}

const Template = (args) => <InputPrefectures defaultValue={args.defaultValue} />


export const beforeSearch = Template.bind({});
export const afterSearch = Template.bind({});
afterSearch.args = {
    defaultValue: "埼玉・北海道・沖縄"
}
