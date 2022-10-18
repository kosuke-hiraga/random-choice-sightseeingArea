import React from "react";
import TestButton from "./TestButton";
// import { userEvent, within, waitFor } from "@storybook/testing-library"
// import { within, waitFor, screen } from "@testing-library/react"
import { waitFor, screen } from "@testing-library/react"
import { within } from "@storybook/testing-library"

import userEvent from "@testing-library/user-event"
import { expect } from "@storybook/jest"
import { Story } from "@storybook/react"

export default {
    title: 'Atoms/TestButton',
    component: TestButton,
}

// const Template = (args: any) => <TestButton {...args}></TestButton>

const Template: Story = (args: any) => <TestButton {...args}></TestButton>


export const CountTest = Template.bind({});

CountTest.play = async ({ canvasElement }: any) => {
    const canvas = within(canvasElement);

    // await userEvent.click(screen.getByTestId("test"));
    // await userEvent.click(screen.getByTestId("test"));
    await userEvent.click(canvas.getByTestId("test"));
    await userEvent.click(canvas.getByTestId("test"));
    await waitFor(() => {
        // const item = screen.getByTestId("test");
        const item = canvas.getByTestId("test");
        // console.log(item.textContent);
        expect(Number(item.textContent)).toBe(2);
    })
}


// export const countTest = Template.bind({});
// countTest.play = async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     // await userEvent.type(canvas.getByTestId("test"), "storeisTest");
//     await userEvent.click(canvas.getByTestId("test"));
//     await userEvent.click(canvas.getByTestId("test"));
//     await waitFor(() => {
//         const item = canvas.getByTestId("test");
//         console.log(item.innerText);
//         expect(Number(item.innerText)).toBe(2);
//     })
// }