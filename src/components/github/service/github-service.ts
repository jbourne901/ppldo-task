import {GITHUB_EVENT, IEventParser, IGithubEventPayload, IGithubEventService} from "../github";
import {debug, error} from "../../shared/utils/log";
import {INotificationService} from "../../shared/interfaces/event";
import {AppConfig} from "../../../config";

/**
 * Отвечает за прием запросов GithubController, и их обработку
 * Обработка заключается в формировании строки сообщения о событии и посылке события GITHUB_EVENT вместе
 * со сформированной строкой всем подписанным слушателям через NotificationService
 */
export class GithubService implements IGithubEventService {
    private config: AppConfig;
    private notification: INotificationService;
    private parser: IEventParser;

    public constructor(config: AppConfig, parser: IEventParser, notification: INotificationService) {
        this.config=config;
        this.parser=parser;
        this.notification = notification;
        debug("GithubService: started");
    }

    /**
     * Обработчик запроса, вызывается из express роутера при получении запроса /service/event
     * Разбирает объект, определяет тип события, подготавливает строку с информацией о событии и
     * передает ее подписчикам на событие GITHUB_EVENT через NotificationService.
     * @param payload объект , который приходит в запросе от service hook
     *
     */

    public async handleEvent(payload: IGithubEventPayload) {
        const message = this.parser.parseEvent(payload);
        try {
            this.notification.notify(GITHUB_EVENT, message);
        } catch(err) {
            error(err);
        }
    }
}