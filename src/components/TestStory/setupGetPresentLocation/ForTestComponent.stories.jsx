import React from "react";
import ForTestComponent from '../ForTestComponent';
// import userEvent from "@testing-library/user-event";
import { userEvent, within, waitFor, getByTestId, screen } from "@storybook/testing-library";
import { setupGetPresentLocation } from "../../../util/util"
import { expect } from "@storybook/jest"

export default {
    title: 'UnitTest/setupGetPresentLocation',
    component: ForTestComponent,
}

const BaseTemplate = (args) => <ForTestComponent {...args} />

export const setupGetPresentLocation_TEST = BaseTemplate.bind({});
setupGetPresentLocation_TEST.args = {
    onClick: () => setupGetPresentLocation(),
    onClick2: () => console.log("mock")
}
setupGetPresentLocation_TEST.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // console.log(canvas.getByTestId("test"));
    // //実行
    // await userEvent.click(canvas.getByTestId("test"));
    const currentLocation = await setupGetPresentLocation();
    console.log(currentLocation);

    await waitFor(() => {
        setTimeout(() => {
            expect(currentLocation).toBeTruthy();
        }, 5000);
    })
}