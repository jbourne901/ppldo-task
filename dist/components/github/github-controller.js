"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubController = void 0;
const express_1 = __importDefault(require("express"));
const api_resource_1 = require("../shared/interfaces/api-resource");
const github_1 = require("./github");
const log_1 = require("../shared/utils/log");
/**
 * Отвечает за прием REST запросов (webhooks) на endpoint GITHUB и передачу их в GithubEventService для дальнейшей обработки
 * На запросы не отсылает никакого ответа поскольку это webhook и ответа не ожидается
 */
class GithubController {
    constructor(app, service) {
        this.service = service;
        const router = express_1.default.Router();
        router.post(github_1.GithubResource.EVENT, async (req, _res, _next) => {
            log_1.debug(`router.post ${github_1.GithubResource.EVENT} req.body=`, req.body);
            try {
                await this.service.handleEvent(req.body);
            }
            catch (err) {
                log_1.error(err);
            }
        });
        app.use(api_resource_1.ApiResource.GITHUB, router);
        log_1.debug("GithubController: started");
    }
}
exports.GithubController = GithubController;
//# sourceMappingURL=github-controller.js.map