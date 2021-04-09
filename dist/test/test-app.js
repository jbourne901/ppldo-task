"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestApp = void 0;
const config_1 = require("../config");
const log_1 = require("../components/shared/utils/log");
const github_service_1 = require("../components/github/service/github-service");
const event_parser_1 = require("../components/github/service/event-parser");
const ppldo_service_1 = require("../components/chat-service/ppldo-service");
const notification_1 = require("../components/shared/services/notification");
const express_1 = __importDefault(require("express"));
const mock_github_controller_1 = require("../components/github/mock-github-controller");
const mock_ppldo_controller_1 = require("../components/chat-service/mock-ppldo-controller");
const test_1 = require("../components/shared/interfaces/test");
const test_fixtures_1 = require("./test-fixtures");
class TestApp {
    constructor(config) {
        this.config = config;
        const notification = new notification_1.NotificationService();
        this.app = express_1.default();
        const pplDoController = new mock_ppldo_controller_1.MockPpldoController(config);
        this.pplDoService = new ppldo_service_1.PpldoService(notification, pplDoController);
        const eventParser = new event_parser_1.EventParser(config);
        const githubService = new github_service_1.GithubService(config, eventParser, notification);
        this.githubController = new mock_github_controller_1.MockGithubController(this.app, githubService);
        log_1.debug("App: initialized");
    }
    checkTestResult(expected) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const result = test_1.TestStorage.instance().getTestResult();
        if (!result) {
            throw Error("It should produce result: FAILED");
        }
        else {
            log_1.debug("It should produce result: PASSED");
        }
        if (expected.query.toString().replace(/ /g, "") !== (result === null || result === void 0 ? void 0 : result.query.toString().replace(/ /g, ""))) {
            log_1.log(result === null || result === void 0 ? void 0 : result.query.toString());
            throw Error("Query should match expected: FAILED");
        }
        else {
            log_1.debug("Query should match expected: PASSED");
        }
        if (expected.vars.chat_id !== ((_a = result === null || result === void 0 ? void 0 : result.vars) === null || _a === void 0 ? void 0 : _a.chat_id)) {
            throw Error("ChatID should match expected: FAILED");
        }
        else {
            log_1.debug("ChatID should match expected: PASSED");
        }
        if (expected.vars.input.length !== ((_c = (_b = result === null || result === void 0 ? void 0 : result.vars) === null || _b === void 0 ? void 0 : _b.input) === null || _c === void 0 ? void 0 : _c.length)) {
            log_1.log(expected.vars.input.length, (_e = (_d = result === null || result === void 0 ? void 0 : result.vars) === null || _d === void 0 ? void 0 : _d.input) === null || _e === void 0 ? void 0 : _e.length);
            throw Error("Input length must match expected: FAILED");
        }
        else {
            log_1.debug("Input length must match expected: PASSED");
        }
        if (((_g = (_f = expected.vars.input[0]) === null || _f === void 0 ? void 0 : _f.text_message) === null || _g === void 0 ? void 0 : _g.message) !== ((_k = (_j = (_h = result === null || result === void 0 ? void 0 : result.vars) === null || _h === void 0 ? void 0 : _h.input[0]) === null || _j === void 0 ? void 0 : _j.text_message) === null || _k === void 0 ? void 0 : _k.message)) {
            log_1.log(expected.vars.input[0], (_l = result === null || result === void 0 ? void 0 : result.vars) === null || _l === void 0 ? void 0 : _l.input[0]);
            throw Error("Input message must match expected: FAILED");
        }
        else {
            log_1.debug("Input message must match expected: PASSED");
        }
        if (expected.headers.Authorization !== ((_m = result.headers) === null || _m === void 0 ? void 0 : _m.Authorization)) {
            throw Error("Header must expected: FAILED");
        }
        else {
            log_1.debug("Header must expected: PASSED");
        }
    }
    async test(fixture) {
        log_1.debug("App: started");
        try {
            await this.githubController.test(fixture.githubData);
            this.checkTestResult(fixture.result);
        }
        catch (err) {
            log_1.error(err);
        }
    }
    runSuite() {
        const fixtures = test_fixtures_1.testFixtures(this.config);
        for (let fixture of fixtures) {
            this.test(fixture);
        }
    }
}
exports.TestApp = TestApp;
const config = new config_1.AppConfig();
const app = new TestApp(config);
app.runSuite();
//# sourceMappingURL=test-app.js.map