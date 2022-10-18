/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";
// import { composeStories } from "@storybook/react";


import { composeStories } from "@storybook/testing-react";
import * as Stories from "../src/components/Atoms/TestButton.stories";


const { CountTest, Default } = composeStories(Stories);


test("クリックされたかテスト", async () => {
    const button = render(<CountTest />)
    console.log(button.getByTestId("test"));
    console.log(button.container);;
    await CountTest.play({ canvasElement: button.container });
})