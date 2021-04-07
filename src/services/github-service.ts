import {IGithubEventPayload, IGithubEventService, UNKNOWN_EVENT} from "../interfaces/github";
import {debug, error} from "../utils/log";
import {INotificationService} from "../interfaces/event";

export class GithubService implements IGithubEventService {
    private notification: INotificationService;

    public constructor(notification: INotificationService) {
        this.notification = notification;
        debug("GithubService: started");
    }

    public async handleEvent(payload: IGithubEventPayload) {
        let event = payload.event || UNKNOWN_EVENT;
        const eventData = payload;
        try {
            this.notification.notify(event, eventData);
        } catch(err) {
            error(err);
        }
    }
}