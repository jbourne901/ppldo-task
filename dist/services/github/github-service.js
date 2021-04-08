"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubService = void 0;
const github_1 = require("../../interfaces/github");
const log_1 = require("../../utils/log");
const parse_event_1 = require("./parse-event");
class GithubService {
    constructor(notification) {
        this.notification = notification;
        log_1.debug("GithubService: started");
    }
    async handleEvent(payload) {
        const message = parse_event_1.parseEvent(payload);
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