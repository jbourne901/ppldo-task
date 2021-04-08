import {IpplDoController, IPppldoService} from "../interfaces/ppldo";
import {ALL_EVENTS, IEvent, IEventHandlerId, IEventPayload, INotificationService} from "../interfaces/event";
import {debug, error} from "../utils/log";

export class PpldoService implements IPppldoService {
    private notification: INotificationService;
    private controller: IpplDoController;
    private handlerId: IEventHandlerId;

    public constructor(notification: INotificationService, controller: IpplDoController) {
        this.controller=controller;
        this.notification = notification;
        this.handlerId = this.notification.subscribe(ALL_EVENTS,
            (event: IEvent, payload: IEventPayload) => this.handleEvent(event, payload)
        );
        debug("PpldoService: started");
    }

    protected getEventNotificationMessage(event: IEvent, payload: IEventPayload) {
        return "test message";
    }

    protected async handleEvent(event: IEvent, payload: IEventPayload) {
        const message = this.getEventNotificationMessage(event, payload)
        try {
            this.controller.sendMessage(message);
        } catch(err) {
            error(err);
        }
    }

}