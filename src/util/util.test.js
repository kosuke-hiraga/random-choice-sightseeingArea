/**
 * @jest-environment jsdom
 */
import {
    toBoolean,
    isFavorite,
    getSessionStorage,
    validateEmail,
    checkErrorContentEmail,
    validatePassword,
    checkErrorContentPassword,
    validateUserName,
    checkErrorContentUserName,
    getPresentLocation,
    addPrefectureString,
    update_SessionStorage_pushedPrefectureButton
} from "./util";
import { STORAGE_KEY } from "../util/const"

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
        sessionStorage.setItem(STORAGE_KEY.FAVORITES, JSON.stringify(["id1", "id2", "id3"]));
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




describe("validateEmail テスト", () => {
    let correctEmail;
    let inCorrectEmail;
    beforeEach(() => {
        correctEmail = "test@gmail.com";
        inCorrectEmail = "inCorrect";
        // validateEmail.mockImplementation(() => "mock error message");
    });
    test("正常パターン", () => {
        const result = validateEmail(correctEmail);
        expect(result.isCorrectFormat).toBe(true);
        expect(result.showMessage).toBeTruthy();
    });
    test("不正パターン", () => {
        const result = validateEmail(inCorrectEmail);
        expect(result.isCorrectFormat).toBe(false);
        expect(result.showMessage).toBeTruthy();
    });
});

describe("checkErrorContentEmail テスト", () => {
    let correctEmail;
    beforeAll(() => {
        correctEmail = "test@gmail.com";
    });
    describe("blankError", () => {
        test("正常フォーマット　No Error", () => {
            const errorMessage = checkErrorContentEmail(correctEmail);
            expect(errorMessage).not.toBe("1文字以上入力してください");
        });
        test("空白", () => {
            const inCorrectEmail = "";
            const errorMessage = checkErrorContentEmail(inCorrectEmail);
            expect(errorMessage).toBe("1文字以上入力してください");
        });
    });
    describe("firstStringError", () => {
        test("正常フォーマット　No Error", () => {
            const errorMessage = checkErrorContentEmail(correctEmail);
            expect(errorMessage).not.toBe("Emailの最初の文字は英数字(A-Z,a-z,0-9)のみ使用可能です");
        });
        test("初手ドット", () => {
            const inCorrectEmail = ".test@gmail.com";
            const errorMessage = checkErrorContentEmail(inCorrectEmail);
            expect(errorMessage).toBe("Emailの最初の文字は英数字(A-Z,a-z,0-9)のみ使用可能です");
        });
    });
    describe("notExistsAtsignError", () => {
        test("正常フォーマット　No Error", () => {
            const errorMessage = checkErrorContentEmail(correctEmail);
            expect(errorMessage).not.toBe("@が存在しません");
        });
        test("@なし", () => {
            const inCorrectEmail = "testgmail.com";
            const errorMessage = checkErrorContentEmail(inCorrectEmail);
            expect(errorMessage).toBe("@が存在しません");
        });
    });
    describe("continueDotsError", () => {
        test("正常フォーマット　No Error", () => {
            const errorMessage = checkErrorContentEmail(correctEmail);
            expect(errorMessage).not.toBe("( . )が2個以上連続で使用されています");
        });
        test("ドット連続", () => {
            const inCorrectEmail = "t..est@gmail.com";
            const errorMessage = checkErrorContentEmail(inCorrectEmail);
            expect(errorMessage).toBe("( . )が2個以上連続で使用されています");
        });
    });
    describe("existsDotAroundAtSignError", () => {
        test("正常フォーマット　No Error", () => {
            const errorMessage = checkErrorContentEmail(correctEmail);
            expect(errorMessage).not.toBe("@の前後に( . )が使用されています");
        });
        test("@前ドット", () => {
            const inCorrectEmail = "test.@gmail.com";
            const errorMessage = checkErrorContentEmail(inCorrectEmail);
            expect(errorMessage).toBe("@の前後に( . )が使用されています");
        });
        test("@後ドット", () => {
            const inCorrectEmail = "test@.gmail.com";
            const errorMessage = checkErrorContentEmail(inCorrectEmail);
            expect(errorMessage).toBe("@の前後に( . )が使用されています");
        });
    });
    describe("domainFormatError", () => {
        test("正常フォーマット　No Error", () => {
            const errorMessage = checkErrorContentEmail(correctEmail);
            expect(errorMessage).not.toBe("ドメイン部分の書式に不備があります");
        });
        test("ドメイン ドットなし", () => {
            const inCorrectEmail = "test@gmail";
            const errorMessage = checkErrorContentEmail(inCorrectEmail);
            expect(errorMessage).toBe("ドメイン部分の書式に不備があります");
        });
        test("ドメイン ドット止まり", () => {
            const inCorrectEmail = "test@gmail.";
            const errorMessage = checkErrorContentEmail(inCorrectEmail);
            expect(errorMessage).toBe("ドメイン部分の書式に不備があります");
        });
    });
    describe("undefinedError", () => {
        test("未定義エラー", () => {
            const errorMessage = checkErrorContentEmail(correctEmail);
            expect(errorMessage).toBe("未設定のエラーです");
        });
    });
});




describe("validatePassword テスト", () => {
    let correctPassword;
    let inCorrectPassword;
    beforeEach(() => {
        correctPassword = "012345";
        inCorrectPassword = "";
    });
    test("正常パターン", () => {
        const result = validatePassword(correctPassword);
        expect(result.isCorrectFormat).toBe(true);
        expect(result.showMessage).toBeTruthy();
    });
    test("不正パターン", () => {
        const result = validatePassword(inCorrectPassword);
        expect(result.isCorrectFormat).toBe(false);
        expect(result.showMessage).toBeTruthy();
    });
});


describe("checkErrorContentPassword テスト", () => {
    let correctPassword;
    beforeAll(() => {
        correctPassword = "012345";
    });
    describe("lessCharactersError", () => {
        test("正常フォーマット　No Error", () => {
            const errorMessage = checkErrorContentPassword(correctPassword);
            expect(errorMessage).not.toBe("パスワードは6文字以上必要です");
        });
        test("空白", () => {
            const inCorrectPassword = "";
            const errorMessage = checkErrorContentPassword(inCorrectPassword);
            expect(errorMessage).toBe("パスワードは6文字以上必要です");
        });
        test("5文字", () => {
            const inCorrectPassword = "12345";
            const errorMessage = checkErrorContentPassword(inCorrectPassword);
            expect(errorMessage).toBe("パスワードは6文字以上必要です");
        });
    });
    describe("undefinedError", () => {
        test("未定義エラー", () => {
            const errorMessage = checkErrorContentPassword(correctPassword);
            expect(errorMessage).toBe("未設定のエラーです");
        });
    });
});


describe("validateUserName テスト", () => {
    let correctUserName;
    let inCorrectUserName;
    beforeEach(() => {
        correctUserName = "test_user";
        inCorrectUserName = "";
    });
    test("正常パターン", () => {
        const result = validateUserName(correctUserName);
        expect(result.isCorrectFormat).toBe(true);
        expect(result.showMessage).toBeTruthy();
    });
    test("不正パターン", () => {
        const result = validateUserName(inCorrectUserName);
        expect(result.isCorrectFormat).toBe(false);
        expect(result.showMessage).toBeTruthy();
    });
});


describe("checkErrorContentUserName テスト", () => {
    let correctUserName;
    beforeAll(() => {
        correctUserName = "test_user";
    });
    describe("blankError", () => {
        test("正常フォーマット　No Error", () => {
            const errorMessage = checkErrorContentUserName(correctUserName);
            expect(errorMessage).not.toBe("1文字以上入力してください");
        });
        test("空白", () => {
            const inCorrectUserName = "";
            const errorMessage = checkErrorContentUserName(inCorrectUserName);
            expect(errorMessage).toBe("1文字以上入力してください");
        });
    });
    describe("undefinedError", () => {
        test("未定義エラー", () => {
            const errorMessage = checkErrorContentUserName(correctUserName);
            expect(errorMessage).toBe("未設定のエラーです");
        });
    });
});








describe("getPresentLocation テスト", () => {
    test("muniCd=1100 対象データあり(区なし)", () => {
        // MUNI_ARRAY["1100"] = '1,北海道,1100,札幌市';
        const currentLocation = getPresentLocation(1100);
        expect(currentLocation.Prefectures).toBe("北海道");
        expect(currentLocation.City).toBe("札幌市");
        expect(currentLocation.Ward).toBeUndefined();
    });
    test("muniCd=4101 対象データあり(区あり)", () => {
        //MUNI_ARRAY["4101"] = '4,宮城県,4101,仙台市　青葉区';
        const currentLocation = getPresentLocation(4101);
        expect(currentLocation.Prefectures).toBe("宮城県");
        expect(currentLocation.City).toBe("仙台市");
        expect(currentLocation.Ward).toBe("青葉区");
    });
    test("muniCd=99999 対象データなし", () => {
        //MUNI_ARRAY["99999"] = '対象データなし';
        const currentLocation = getPresentLocation(99999);
        expect(currentLocation).toBeUndefined();
    });
});


describe("addPrefectureString テスト", () => {
    test("東京 → 東京都", () => {
        const Prefecture = "東京";
        const newPrefecture = addPrefectureString(Prefecture);
        expect(newPrefecture).toBe(Prefecture + "都");
    });
    test("京都 → 京都府", () => {
        const Prefecture = "京都";
        const newPrefecture = addPrefectureString(Prefecture);
        expect(newPrefecture).toBe(Prefecture + "府");
    });
    test("大阪  →大阪府", () => {
        const Prefecture = "大阪";
        const newPrefecture = addPrefectureString(Prefecture);
        expect(newPrefecture).toBe(Prefecture + "府");
    });
    test("北海道→ 北海道", () => {
        const Prefecture = "北海道";
        const newPrefecture = addPrefectureString(Prefecture);
        expect(newPrefecture).toBe(Prefecture);
    });
    test("埼玉  → 埼玉県", () => {
        const Prefecture = "埼玉";
        const newPrefecture = addPrefectureString(Prefecture);
        expect(newPrefecture).toBe(Prefecture + "県");
    });
});


describe("update_SessionStorage_pushedPrefectureButton テスト", () => {
    //テスト開始前に一応初期化
    beforeAll(() => {
        sessionStorage.clear();
    });
    afterEach(() => {
        sessionStorage.clear();
    });
    test("北海道 沖縄 追加", () => {
        update_SessionStorage_pushedPrefectureButton("北海道", true);
        update_SessionStorage_pushedPrefectureButton("沖縄", true);
        const PUSHED_PREFECTURE_BUTTON = getSessionStorage(STORAGE_KEY.PUSHED_PREFECTURE_BUTTON);
        expect(PUSHED_PREFECTURE_BUTTON[0]).toBe("北海道");
        expect(PUSHED_PREFECTURE_BUTTON[1]).toBe("沖縄");
    });
    test("重複時 処理中断", () => {
        update_SessionStorage_pushedPrefectureButton("北海道", true);
        update_SessionStorage_pushedPrefectureButton("北海道", true);
        const PUSHED_PREFECTURE_BUTTON = getSessionStorage(STORAGE_KEY.PUSHED_PREFECTURE_BUTTON);
        expect(PUSHED_PREFECTURE_BUTTON.length).toBe(1);
    });
    test("北海道 追加後 削除", () => {
        update_SessionStorage_pushedPrefectureButton("北海道", true);
        update_SessionStorage_pushedPrefectureButton("沖縄", true);
        update_SessionStorage_pushedPrefectureButton("東京", true);
        update_SessionStorage_pushedPrefectureButton("北海道", false);
        const PUSHED_PREFECTURE_BUTTON = getSessionStorage(STORAGE_KEY.PUSHED_PREFECTURE_BUTTON);
        expect(PUSHED_PREFECTURE_BUTTON[0]).not.toBe("北海道");
        expect(PUSHED_PREFECTURE_BUTTON[0]).toBe("沖縄");
        expect(PUSHED_PREFECTURE_BUTTON[1]).toBe("東京");
    });
})