import TestButton from "./TestButton";
import { waitFor, screen } from "@testing-library/react"
import { within } from "@storybook/testing-library"

import userEvent from "@testing-library/user-event"
import { expect } from "@storybook/jest"
import { Story } from "@storybook/react"

export default {
    title: 'Atoms/TestButton',
    component: TestButton,
}

const Template: Story = (args: any) => <TestButton {...args}></TestButton>


export const CountTest = Template.bind({});

CountTest.play = async ({ canvasElement }: any) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId("test"));
    await userEvent.click(canvas.getByTestId("test"));
    await waitFor(() => {
        const item = canvas.getByTestId("test");
        expect(Number(item.textContent)).toBe(2);
    })
}