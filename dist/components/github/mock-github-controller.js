"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockGithubController = void 0;
const log_1 = require("../shared/utils/log");
class MockGithubController {
    constructor(app, service) {
        this.service = service;
        log_1.debug("GithubController: started");
    }
    async test(testObj) {
        try {
            await this.service.handleEvent(testObj);
        }
        catch (err) {
            log_1.error(err);
        }
    }
}
exports.MockGithubController = MockGithubController;
//# sourceMappingURL=mock-github-controller.js.map