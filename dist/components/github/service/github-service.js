"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubService = void 0;
const github_1 = require("../github");
const log_1 = require("../../shared/utils/log");
/**
 * Отвечает за прием запросов GithubController, и их обработку
 * Обработка заключается в формировании строки сообщения о событии и посылке события GITHUB_EVENT вместе
 * со сформированной строкой всем подписанным слушателям через NotificationService
 */
class GithubService {
    constructor(config, parser, notification) {
        this.config = config;
        this.parser = parser;
        this.notification = notification;
        log_1.debug("GithubService: started");
    }
    /**
     * Обработчик запроса, вызывается из express роутера при получении запроса /service/event
     * Разбирает объект, определяет тип события, подготавливает строку с информацией о событии и
     * передает ее подписчикам на событие GITHUB_EVENT через NotificationService.
     * @param payload объект , который приходит в запросе от service hook
     *
     */
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