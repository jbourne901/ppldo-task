"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubService = void 0;
const github_1 = require("../../interfaces/github");
const log_1 = require("../../utils/log");
class GithubService {
    constructor(config, parser, notification) {
        this.config = config;
        this.parser = parser;
        this.notification = notification;
        log_1.debug("GithubService: started");
    }
    async handleEvent(payload) {
        const message = this.parser.parseEvent(payload);
        try {
            this.notification.notify(github_1.GITHUB_EVENT, message);
        }
        catch (err) {
            log_1.error(err);
        }
    }
}
exports.GithubService = GithubService;
//# sourceMappingURL=github-service.js.map