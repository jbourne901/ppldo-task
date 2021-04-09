import express from "express";
import http from "http";
import {debug, error, log} from "./components/shared/utils/log";
import morgan from "morgan";
import {GithubService} from "./components/github/service/github-service";
import {PpldoController} from "./components/chat-service/ppldo-controller";
import {GithubController} from "./components/github/github-controller";
import {AppConfig} from "./config";
import {PpldoService} from "./components/chat-service/ppldo-service";
import {NotificationService} from "./components/shared/services/notification";
import {IPppldoService} from "./components/chat-service/ppldo";
import {IGithubController} from "./components/github/github";
import {EventParser} from "./components/github/service/event-parser";


/**
 * Основной класс приложения
 * Создает Express инстанс, контроллеры, сервисы, связывает все между собой, запускает сервер
 *
 */
export class App {

    private config: AppConfig;
    private app: express.Application;
    private pplDoService: IPppldoService;
    private githubController: IGithubController;

    /**
     * Инициализация приложения, создает инстанс Express, добавляет middlewares, создает сервисы и контроллеры
     * связывает все между собой
     * @param config - конфиг приложения
     */
    public constructor(config: AppConfig) {
        this.config = config;
        this.app = express();

        this.app.set("port", this.config.port());

        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));

        const notification = new NotificationService();

        const pplDoController = new PpldoController(config);
        this.pplDoService = new PpldoService(notification, pplDoController);

        const eventParser = new EventParser(config)
        const githubService = new GithubService(config, eventParser, notification);
        this.githubController = new GithubController(this.app, githubService);

        debug("App: initialized");
    }


    /**
     * Запуск сервера
     */
    public start() {
        try {
            const httpServer = http.createServer(this.app);

            httpServer.listen(this.config.port(), this.config.host(), () => {
                debug(`listening ${this.config.host()}:${this.config.port()}`);
            });

            debug("App: started");
        } catch(err) {
            error(err);
            process.exit(-1);
        }
    }
}

const config = new AppConfig();
const app = new App(config);
app.start();

