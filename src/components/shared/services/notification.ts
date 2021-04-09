import {
    ALL_EVENTS,
    IEvent,
    IEventHandler,
    IEventHandlerId,
    IEventHandlers,
    IEventPayload,
    INotificationService
} from "../interfaces/event";
import {uuid} from "../utils/uuid";
import {error, warn} from "../utils/log";

/**
 * Служит посредником для развязки между различными модулями (в частности между service интерфейсом и ppldo интерфейсом)
 * Реализует подписку на события и вызов callback при наступлении события вызывает callback функцию зарегистрированного подписчика
 *
 */
export class NotificationService implements INotificationService{
    private eventHandlers = new Map<string, IEventHandlers>();

    /**
     * Функция подписки на событие. Для подписки необходимо передать имя события , на которое подписываемся и колбек функцию обработчика события
     * @param event имя события. Если передать в качестве имени ALL_EVENTS, то будет подписка на любые события
     * @param handler колбек функция которая вызывается при наступлении события
     * @return возвращает handlerId - уникальный ID подписчика. По этому ID можно потом удалить подписку , вызвав unsubscribe
     */
    public subscribe(event: IEvent, handler: IEventHandler) {
        const handlerId = uuid();
        const handlers = this.eventHandlers.get(event) || new Map<IEventHandlerId, IEventHandler>();
        handlers.set(handlerId, handler);
        this.eventHandlers.set(event, handlers);
        return handlerId;
    }

    /**
     * Функция отписки от события
     * @param event - событие, от которого отписываемся
     * @param handlerId  - ID обработчика, которое было присвоено при подписке
     */
    public unsubscribe(event: IEvent, handlerId: IEventHandlerId) {
        const handlers = this.eventHandlers.get(event);
        if(handlers) {
            handlers.delete(handlerId)
            if(handlers.size===0) {
                this.eventHandlers.delete(event);
            }
        }
    }

    /**
     * Функция уведомления о событии. Уведомляет подписчиков на это событие а также тех кто подписан на ALL_EVENTS
     * @param event - имя события
     * @param eventData - дополнительные данные к событию
     */

    public async notify(event: IEvent, eventData: IEventPayload) {
        try {
            Promise.all([
                this.notifyEvent(event, eventData),
                this.notifyEvent(ALL_EVENTS, eventData)
            ]);
        } catch (err) {
            error(err);
        }
    }

    /**
     * Уведомление о событии всех кто на него подписан путем вызова их callback функций
     * @param event имя события
     * @param eventData дополнительные данные связанные с событием
     * @protected
     */

    protected async notifyEvent(event: IEvent, eventData: IEventPayload) {
        const handlers = this.eventHandlers.get(event);
        if(!handlers) {
            warn("No handlers found for event", event);
            return;
        }
        await handlers.forEach((handler) => {
            try {
                handler(event, eventData);
            } catch(err) {
                error(err);
            }
        });
    }

}