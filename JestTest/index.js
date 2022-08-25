class TestService {

    multiplyNum(num, multiplyBy) {
        return num * multiplyBy;
    }

    saveNum(num, saveTo) {
        return new Promise((resolve) => {
            setTimeout(() => {
                saveTo.push(num);
                resolve('Saved');
            }, 100);
        })
    }

    multiplyAndSave(num, multiplyBy, saveTo) {
        const res = this.multiplyNum(num, multiplyBy);
        this.saveNum(res, saveTo);
        return res;
    }
}

module.exports = new TestService();