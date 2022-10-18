import React from "react";
import ForTestComponent from './ForTestComponent';
import { signIn, logOut } from "../../firebase/logic";
import { auth } from "../../firebase/firebase";
// import userEvent from "@testing-library/user-event";
import { userEvent, waitFor, within, findByRole } from "@storybook/testing-library";
import { getSessionStorage } from "../../util/util";
import { expect } from "@storybook/jest"

export default {
    title: 'UnitTest/ForTestComponent',
    component: ForTestComponent,
}

const BaseTemplate = (args) => <ForTestComponent {...args} />


export const signIn_test = BaseTemplate.bind({});
const testUser = "test@gmail.com";
const testPassword = "ramram";
signIn_test.args = {
    onClick: async () => await signIn(testUser, testPassword),
    onClick2: () => logOut()
}
signIn_test.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    //サインイン前にストレージに値が無い事を確認
    const beforeSignIn_storage = getSessionStorage("favorites");
    expect(beforeSignIn_storage.length).toBe(0);
    //サインイン前に認証情報を保持していない事を確認
    expect(auth.currentUser).not.toBe("H1UCHFKqD3WuBnMlYeka302pNYw2");

    //サインイン
    await userEvent.click(canvas.getByTestId("test"));
    await waitFor(() => {
        setTimeout(() => {
            const AfterSignIn_storage = getSessionStorage("favorites");
            expect(AfterSignIn_storage.length).toBe(2);
        }, 5000);
    })
}


export const signIn_Err_test = BaseTemplate.bind({});
const testUser2 = "test@gmail.com";
const testPassword2 = "fakePassword";
signIn_Err_test.args = {
    onClick: async () => await signIn(testUser2, testPassword2),
    onClick2: () => logOut()
}

signIn_Err_test.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    //サインイン前にストレージに値が無い事を確認
    const beforeSignIn_storage = getSessionStorage("favorites");
    expect(beforeSignIn_storage.length).toBe(0);
    //サインイン前に認証情報を保持していない事を確認
    expect(auth.currentUser).not.toBe("H1UCHFKqD3WuBnMlYeka302pNYw2");
    //サインイン
    await userEvent.click(canvas.getByTestId("test"));
    // const alert = await findByRole(canvas, "alert");

    window.alert = jest.fn();

    await waitFor(() => {
        setTimeout(() => {
            // const AfterSignIn_storage = getSessionStorage("favorites");
            console.log(findByRole("alert"));

            expect(alert).toHaveTextContent("パスワードが間違っています");
        }, 5000);
    })

}