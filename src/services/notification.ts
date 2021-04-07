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

export class NotificationService implements INotificationService{
    private eventHandlers = new Map<string, IEventHandlers>();

    public subscribe(event: IEvent, handler: IEventHandler) {
        const handlerId = uuid();
        const handlers = this.eventHandlers.get(event) || new Map<IEventHandlerId, IEventHandler>();
        handlers.set(handlerId, handler);
        this.eventHandlers.set(event, handlers);
        return handlerId;
    }

    public unsubscribe(event: IEvent, handlerId: IEventHandlerId) {
        const handlers = this.eventHandlers.get(event);
        if(handlers) {
            handlers.delete(handlerId)
            if(handlers.size===0) {
                this.eventHandlers.delete(event);
            }
        }
    }

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