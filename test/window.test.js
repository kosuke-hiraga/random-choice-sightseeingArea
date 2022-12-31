/**
 * @jest-environment jsdom
 */
import './__mocks__/matchMedia.mock.js'
import { act } from "react-dom/test-utils";

let container = null;

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