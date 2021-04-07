export type IEvent=string;
export const ALL_EVENTS: IEvent = "*";

export type IEventPayload = object|undefined;
export type IEventHandler = (event: IEvent, payload: IEventPayload) => Promise<void>;
export type IEventHandlerId = string;

export type IEventHandlers = Map<IEventHandlerId, IEventHandler>;

export interface INotificationService {
    subscribe(event: IEvent, handler: IEventHandler): IEventHandlerId;
    unsubscribe(event: IEvent, handlerId: IEventHandlerId): void;
    notify(event: IEvent, eventData: IEventPayload): Promise<void>;
}