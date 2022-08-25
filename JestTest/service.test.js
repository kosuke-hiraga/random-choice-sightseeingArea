// テスト対象の TestService クラスのインスタンスを index.js から読み込む
const service = require('./index');

// ここから下にテストを記述
describe('TestService', () => {
    // ここにテストを追加
    test('2 times 2 should be 4', () => {
        const result = service.multiplyNum(2, 2);
        expect(result).toBe(4);
    });

    test('2 times negative 2 should be negatice 4', () => {
        const result = service.multiplyNum(2, -2);
        expect(result).toBe(-4);
    });

    test('number should be saved', async () => {
        const saveTo = [];
        await service.saveNum(100, saveTo);

        const expected = [100];
        expect(expected).toEqual(expect.arrayContaining(saveTo));
    });
});