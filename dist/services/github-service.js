"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubService = void 0;
const github_1 = require("../interfaces/github");
const log_1 = require("../utils/log");
class GithubService {
    constructor(notification) {
        this.notification = notification;
        log_1.debug("GithubService: started");
    }
    async handleEvent(payload) {
        let event = payload.event || github_1.UNKNOWN_EVENT;
        const eventData = payload;
        try {
            this.notification.notify(event, eventData);
        }
        catch (err) {
            log_1.error(err);
        }
    }
}
exports.GithubService = GithubService;
//# sourceMappingURL=github-service.js.map