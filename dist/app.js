"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const log_1 = require("./utils/log");
const morgan_1 = __importDefault(require("morgan"));
const github_service_1 = require("./services/github-service");
const ppldo_controller_1 = require("./controllers/ppldo-controller");
const github_controller_1 = require("./controllers/github-controller");
const config_1 = require("./config");
const ppldo_service_1 = require("./services/ppldo-service");
const notification_1 = require("./services/notification");
class App {
    constructor(config) {
        this.config = config;
        this.app = express_1.default();
        const notification = new notification_1.NotificationService();
        const pplDoController = new ppldo_controller_1.PpldoController(config);
        this.pplDoService = new ppldo_service_1.PpldoService(notification, pplDoController);
        const githubService = new github_service_1.GithubService(notification);
        this.githubController = new github_controller_1.GithubController(this.app, githubService);
        log_1.debug("App: initialized");
    }
    start() {
        try {
            this.app.set("port", this.config.port());
            this.app.use(morgan_1.default("dev"));
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: true }));
            const httpServer = http_1.default.createServer(this.app);
            httpServer.listen(this.config.port(), this.config.host(), () => {
                log_1.debug(`listening ${this.config.host()}:${this.config.port()}`);
            });
            log_1.debug("App: started");
        }
        catch (err) {
            log_1.error(err);
            process.exit(-1);
        }
    }
}
exports.App = App;
const config = new config_1.AppConfig();
const app = new App(config);
app.start();
//# sourceMappingURL=app.js.map