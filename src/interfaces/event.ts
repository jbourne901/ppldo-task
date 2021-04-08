export type IEvent=string;
export const ALL_EVENTS: IEvent = "*";

//TODO - add more event types
export type IOtherEventPayload = any;

/**
 * Данные, полученные от контроллера, мы заранее не знаем их тип
 */
export type IEventPayload = any;

/**
 * Интерфейс абстрактного обработчика событий
 */
export type IEventHandler = (event: IEvent, payload: IEventPayload) => Promise<void>;

/**
 * ID присвоенный обработчику при его регистрации
 */
export type IEventHandlerId = string;

/**
 * Список обработчиков для одного события
 */
export type IEventHandlers = Map<IEventHandlerId, IEventHandler>;

/**
 * Интерфейс брокера событий
 */

export interface INotificationService {
    /**
     * Регистрация обработчика
     * @param event имя события
     * @param handler callback функция обработчика
     * @return уникальный идентификатор, присвоенный обработчику при регистрации. Используется для последующего удаления обработчика в unsubscribe
     */
    subscribe(event: IEvent, handler: IEventHandler): IEventHandlerId;

    /**
     * Удаление обработчика
     * @param event имя события
     * @param handlerId уникальный идентификатор, присвоенный обработчику при регистрации
     */
    unsubscribe(event: IEvent, handlerId: IEventHandlerId): void;

    /**
     * Вызов обработчиков при наступлении события
     * @param event имя события
     * @param eventData, данные , связанные с событием
     */
    notify(event: IEvent, eventData: IEventPayload): Promise<void>;
}