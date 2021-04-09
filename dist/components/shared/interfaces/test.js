"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestStorage = void 0;
class TestStorage {
    constructor() {
    }
    static instance() {
        return TestStorage._instance;
    }
    //can be called multiple times
    reset() {
        this._testResult = undefined;
    }
    setTestResult(testResult) {
        this._testResult = testResult;
    }
    getTestResult() {
        return this._testResult;
    }
}
exports.TestStorage = TestStorage;
TestStorage._instance = new TestStorage();
//# sourceMappingURL=test.js.map