"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PpldoService = void 0;
const event_1 = require("../shared/interfaces/event");
const log_1 = require("../shared/utils/log");
/**
 * Получает события через NotificationService и вызывает PplDoCOntroller для отправки сообщений в чат
 */
class PpldoService {
    constructor(notification, controller) {
        this.controller = controller;
        this.notification = notification;
        this.handlerId = this.notification.subscribe(event_1.ALL_EVENTS, (event, payload) => this.handleEvent(event, payload));
        log_1.debug("PpldoService: started");
    }
    /**
     * Дополнительная обработка сообщения перед отправкой (пока не реализована, возращаем строку как есть)
     * @param event имя события (пока события только от Github, но данный сервис может принимать любые события)
     * @param payload данные связанные с событием (для Github это строка сообщения о событии)
     * @protected
     */
    getEventNotificationMessage(event, payload) {
        return payload;
    }
    /**
     * Вызывается при наступлении
     * @param event
     * @param payload
     * @protected
     */
    async handleEvent(event, payload) {
        const message = this.getEventNotificationMessage(event, payload);
        try {
            this.controller.sendMessage(message);
        }
        catch (err) {
            log_1.error(err);
        }
    }
}
exports.PpldoService = PpldoService;
//# sourceMappingURL=ppldo-service.js.map