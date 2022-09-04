// import { toBoolean } from "./util/util"
import { toBoolean } from "../src/util/util"
// import { toBoolean } from "../src/util/util2"

describe("util テスト", () => {
    test("toBoolean true → true", () => {
        const testStr = "true"
        const returnStr = toBoolean(testStr);
        expect(returnStr).toBe(true);
    });

    test("toBoolean false → false", () => {
        const testStr = "false"
        const returnStr = toBoolean(testStr);
        expect(returnStr).toBe(false);
    });

    test("toBoolean null → false", () => {
        const testStr = null;
        const returnStr = toBoolean(testStr);
        expect(returnStr).toBe(false);
    });

    test("toBoolean 適当な文字列 → false", () => {
        const testStr = "あああ";
        const returnStr = toBoolean(testStr);
        expect(returnStr).toBe(false);
    });

    test(`toBoolean "" → false`, () => {
        const testStr = "";
        const returnStr = toBoolean(testStr);
        expect(returnStr).toBe(false);
    });

    test(`toBoolean undefined → false`, () => {
        const testStr = undefined;
        const returnStr = toBoolean(testStr);
        expect(returnStr).toBe(false);
    });
})