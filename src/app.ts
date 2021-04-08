import express from "express";
import http from "http";
import {debug, error, log} from "./utils/log";
import morgan from "morgan";
import {GithubService} from "./services/github/github-service";
import {PpldoController} from "./controllers/ppldo-controller";
import {GithubController} from "./controllers/github-controller";
import {AppConfig} from "./config";
import {PpldoService} from "./services/ppldo-service";
import {NotificationService} from "./services/notification";
import {IPppldoService} from "./interfaces/ppldo";
import {IGithubController} from "./interfaces/github";
import {EventParser} from "./services/github/event-parser";


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

