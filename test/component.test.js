/**
 * @jest-environment jsdom
 */

// import { toBoolean } from "./util/util"
import './__mocks__/matchMedia.mock.js'
import React from "react";
import ReactDOM from 'react-dom/client';
import JestTest from "../src/pages/Test/index"
import SightseeingData from "../src/pages/SightseeingData/index"
import {
    // render,
    unmountComponentAtNode,
    unmount
} from "react-dom";
import { Router } from 'react-router-dom';
import { act } from "react-dom/test-utils";
import { render } from '@testing-library/react';


// import { AuthContext, AuthProvider } from "./state/LoginProvider";
import { AuthContext, AuthProvider } from "../src/state/LoginProvider";
import { TestContext, AuthProvider } from "../src/state/TestProvider";


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

// describe("コンポーネント テスト sample", () => {
//     test("JestTest", () => {
//         act(() => {
//             ReactDOM.createRoot(container).render(<JestTest />);
//             // root.render(<JestTest />);
//         });
//         expect(container.textContent).toBe("JestTest");
//     });
// });

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        // pathName: "http://localhost:3000/SightseeingData/exDscxGhXhqS355lJmHr"
        pathName: "localhost:3000/SightseeingData/VAP1rZrUOnuZxWWTsBGG",
        state: {
            id: "VAP1rZrUOnuZxWWTsBGG",
            title: "白い恋人パーク",
            access: "地下鉄宮の沢駅から徒歩7分",
            address: "埼玉県札幌市西区宮の沢二条2丁目11-36",
            area: "埼玉県",
            explanation: "白い恋人の製造ライン見学ができるほか、約14cmのハート型の白い恋人を作ることができる「ドリームキッチン」や、イシヤオリジナルスイーツが味わえる「チョコレートラウンジ」が楽しめる。",
            imgs: ["https://cdn-mapple.net/Normal/%E5%8C%97%E6%B5%B7%E9%81%93/1000918_00031.jpg", "https://cdn-mapple.net/Normal/%E5%8C%97%E6%B5%B7%E9%81%93/1000918_20220118-5.jpg"],
            price: "入館料=大人(高校生以上)800円、小人(4歳～中学生)500円、3歳以下無料/(無料エリアもあり)",
            subTitle: "見て、味わって、体験できるお菓子としあわせのテーマパーク",
            createAt: {
                seconds: 1657010899,
                nanoseconds: 956000000
            },
            updateAt: {
                seconds: 1657010899,
                nanoseconds: 956000000
            },
        }
    })
}));


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        // pathName: "http://localhost:3000/SightseeingData/exDscxGhXhqS355lJmHr"
        pathName: "localhost:3000/SightseeingData/VAP1rZrUOnuZxWWTsBGG",
        state: {
            id: "VAP1rZrUOnuZxWWTsBGG",
            title: "白い恋人パーク",
            access: "地下鉄宮の沢駅から徒歩7分",
            address: "埼玉県札幌市西区宮の沢二条2丁目11-36",
            area: "埼玉県",
            explanation: "白い恋人の製造ライン見学ができるほか、約14cmのハート型の白い恋人を作ることができる「ドリームキッチン」や、イシヤオリジナルスイーツが味わえる「チョコレートラウンジ」が楽しめる。",
            imgs: ["https://cdn-mapple.net/Normal/%E5%8C%97%E6%B5%B7%E9%81%93/1000918_00031.jpg", "https://cdn-mapple.net/Normal/%E5%8C%97%E6%B5%B7%E9%81%93/1000918_20220118-5.jpg"],
            price: "入館料=大人(高校生以上)800円、小人(4歳～中学生)500円、3歳以下無料/(無料エリアもあり)",
            subTitle: "見て、味わって、体験できるお菓子としあわせのテーマパーク",
            createAt: {
                seconds: 1657010899,
                nanoseconds: 956000000
            },
            updateAt: {
                seconds: 1657010899,
                nanoseconds: 956000000
            },
        }
    })
}));

// describe("コンポーネント テスト SightseeingData", () => {
//     test("SightseeingData", () => {
//         act(() => {
//             render(
//                 // <AuthProvider>
//                 //     <Router history={history}>
//                 //         {ReactDOM.createRoot(container).render(<SightseeingData />)}
//                 //     </Router>
//                 // </AuthProvider>
//                 <AuthContext.Provider value={{ currentUser, setCurrentUser, isSighIn }}>
//                     <Router history={history}>
//                         {ReactDOM.createRoot(container).render(<SightseeingData />)}
//                     </Router>
//                 </AuthContext.Provider>
//             )
//         });
//         expect(container).toBeTruthy();
//     });
// });

describe("コンポーネント テスト SightseeingData", () => {
    test("SightseeingData", () => {
        act(() => {
            render(
                // <AuthContext.Provider value={{ currentUser, setCurrentUser, isSighIn }}>
                <Router history={history}>
                    {ReactDOM.createRoot(container).render(<SightseeingData />)}
                </Router>
                , { wrapper: AuthContext })
        });
        expect(container).toBeTruthy();
    });
});