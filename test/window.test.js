/**
 * @jest-environment jsdom
 */

// import { toBoolean } from "./util/util"
import './__mocks__/matchMedia.mock.js'
import React from "react";
import ReactDOM from 'react-dom/client';
import {
    render,
    unmountComponentAtNode,
    unmount
} from "react-dom";
import { act } from "react-dom/test-utils";

// import { getViewportState } from "../src/mediaQuary/config"


let container = null;
let root = null;

beforeAll(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    // root = ReactDOM.createRoot(container);
});

afterEach(() => {
    // cleanup on exiting
    document.body.removeChild(container);
    container = null;
});





describe("window.match", () => {

    test("first", () => {
        act(() => {
            const width = getViewportState();
            console.log(width);
            console.log(window.matchMedia("(min-width: 1024px)"));
        });
    });
});