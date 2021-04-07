"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubController = void 0;
const express_1 = __importDefault(require("express"));
const api_resource_1 = require("../interfaces/api-resource");
const github_1 = require("../interfaces/github");
const log_1 = require("../utils/log");
class GithubController {
    constructor(app, service) {
        this.service = service;
        const router = express_1.default.Router();
        router.get(github_1.GithubResource.EVENT, async (req, _res, _next) => {
            log_1.debug(`router.get ${github_1.GithubResource.EVENT} req.body=`, req.body);
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