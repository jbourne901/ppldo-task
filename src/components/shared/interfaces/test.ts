export interface ITestable<T> {
    test(testData: T): void;
}

export interface ITestCase<TInput, TOutput> {
    input: TInput;
    output: TOutput;
}

export class TestStorage<TOutput> {
    private static readonly _instance = new TestStorage();
    public static instance() {
        return TestStorage._instance;
    }
    private constructor() {
    }

    private _testResult: TOutput|undefined;

    //can be called multiple times
    public reset() {
        this._testResult=undefined;
    }

    public setTestResult(testResult: TOutput) {
        this._testResult=testResult;
    }

    public getTestResult() {
        return this._testResult;
    }
}