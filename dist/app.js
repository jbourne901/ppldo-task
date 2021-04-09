"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const log_1 = require("./components/shared/utils/log");
const morgan_1 = __importDefault(require("morgan"));
const github_service_1 = require("./components/github/service/github-service");
const ppldo_controller_1 = require("./components/chat-service/ppldo-controller");
const github_controller_1 = require("./components/github/github-controller");
const config_1 = require("./config");
const ppldo_service_1 = require("./components/chat-service/ppldo-service");
const notification_1 = require("./components/shared/services/notification");
const event_parser_1 = require("./components/github/service/event-parser");
/**
 * Основной класс приложения
 * Создает Express инстанс, контроллеры, сервисы, связывает все между собой, запускает сервер
 *
 */
class App {
    /**
     * Инициализация приложения, создает инстанс Express, добавляет middlewares, создает сервисы и контроллеры
     * связывает все между собой
     * @param config - конфиг приложения
     */
    constructor(config) {
        this.config = config;
        this.app = express_1.default();
        this.app.set("port", this.config.port());
        this.app.use(morgan_1.default("dev"));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        const notification = new notification_1.NotificationService();
        const pplDoController = new ppldo_controller_1.PpldoController(config);
        this.pplDoService = new ppldo_service_1.PpldoService(notification, pplDoController);
        const eventParser = new event_parser_1.EventParser(config);
        const githubService = new github_service_1.GithubService(config, eventParser, notification);
        this.githubController = new github_controller_1.GithubController(this.app, githubService);
        log_1.debug("App: initialized");
    }
    /**
     * Запуск сервера
     */
    start() {
        try {
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