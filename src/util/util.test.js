/**
 * @jest-environment jsdom
 */
import {
    toBoolean,
    isFavorite,
    getSessionStorage
} from "./util"

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
});

describe("isFavorite テスト", () => {
    beforeAll(() => {
        sessionStorage.setItem("favorites", JSON.stringify(["id1", "id2", "id3"]));
    });
    afterAll(() => {
        sessionStorage.clear();
    });
    test("お気に入り扱いの場合", () => {
        expect(isFavorite("id1")).toBe(true);
        expect(isFavorite("id3")).toBe(true);
    });
    test("お気に入りじゃない場合", () => {
        expect(isFavorite("id4")).toBe(false);
        expect(isFavorite("id6")).toBe(false);
    });
});



describe("getSessionStorage テスト", () => {
    afterEach(() => {
        sessionStorage.clear();
    });
    test("データ取得", () => {
        sessionStorage.setItem("test", JSON.stringify(["testValue"]));
        const getSessionData = getSessionStorage("test");
        expect(getSessionData[0]).toBe("testValue");
    });
    test("複数データ取得", () => {
        sessionStorage.setItem("test", JSON.stringify(["testValue1", "testValue2", "testValue3"]));
        const getSessionData = getSessionStorage("test");
        expect(getSessionData[0]).toBe("testValue1");
        expect(getSessionData[1]).toBe("testValue2");
        expect(getSessionData[2]).toBe("testValue3");
    });
    test("対象なし 空の配列取得", () => {
        const getSessionData = getSessionStorage("test");
        console.log(getSessionData);
        expect(getSessionData).toEqual([]);
    });
});

