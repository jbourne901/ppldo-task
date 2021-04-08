import {GITHUB_EVENT, IGithubEventPayload, IGithubEventService} from "../../interfaces/github";
import {debug, error} from "../../utils/log";
import {INotificationService} from "../../interfaces/event";
import {parseEvent} from "./parse-event";


export class GithubService implements IGithubEventService {
    private notification: INotificationService;

    public constructor(notification: INotificationService) {
        this.notification = notification;
        debug("GithubService: started");
    }

    public async handleEvent(payload: IGithubEventPayload) {
        const message = parseEvent(payload);
        try {
            this.notification.notify(GITHUB_EVENT, message);
        } catch(err) {
            error(err);
        }
    }
}