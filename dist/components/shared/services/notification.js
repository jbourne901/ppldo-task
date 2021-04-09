"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const event_1 = require("../interfaces/event");
const uuid_1 = require("../utils/uuid");
const log_1 = require("../utils/log");
/**
 * Служит посредником для развязки между различными модулями (в частности между service интерфейсом и ppldo интерфейсом)
 * Реализует подписку на события и вызов callback при наступлении события вызывает callback функцию зарегистрированного подписчика
 *
 */
class NotificationService {
    constructor() {
        this.eventHandlers = new Map();
    }
    /**
     * Функция подписки на событие. Для подписки необходимо передать имя события , на которое подписываемся и колбек функцию обработчика события
     * @param event имя события. Если передать в качестве имени ALL_EVENTS, то будет подписка на любые события
     * @param handler колбек функция которая вызывается при наступлении события
     * @return возвращает handlerId - уникальный ID подписчика. По этому ID можно потом удалить подписку , вызвав unsubscribe
     */
    subscribe(event, handler) {
        const handlerId = uuid_1.uuid();
        const handlers = this.eventHandlers.get(event) || new Map();
        handlers.set(handlerId, handler);
        this.eventHandlers.set(event, handlers);
        return handlerId;
    }
    /**
     * Функция отписки от события
     * @param event - событие, от которого отписываемся
     * @param handlerId  - ID обработчика, которое было присвоено при подписке
     */
    unsubscribe(event, handlerId) {
        const handlers = this.eventHandlers.get(event);
        if (handlers) {
            handlers.delete(handlerId);
            if (handlers.size === 0) {
                this.eventHandlers.delete(event);
            }
        }
    }
    /**
     * Функция уведомления о событии. Уведомляет подписчиков на это событие а также тех кто подписан на ALL_EVENTS
     * @param event - имя события
     * @param eventData - дополнительные данные к событию
     */
    async notify(event, eventData) {
        try {
            Promise.all([
                this.notifyEvent(event, eventData),
                this.notifyEvent(event_1.ALL_EVENTS, eventData)
            ]);
        }
        catch (err) {
            log_1.error(err);
        }
    }
    /**
     * Уведомление о событии всех кто на него подписан путем вызова их callback функций
     * @param event имя события
     * @param eventData дополнительные данные связанные с событием
     * @protected
     */
    async notifyEvent(event, eventData) {
        const handlers = this.eventHandlers.get(event);
        if (!handlers) {
            log_1.warn("No handlers found for event", event);
            return;
        }
        await handlers.forEach((handler) => {
            try {
                handler(event, eventData);
            }
            catch (err) {
                log_1.error(err);
            }
        });
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.js.map