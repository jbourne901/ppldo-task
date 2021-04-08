import {GITHUB_EVENT, IEventParser, IGithubEventPayload, IGithubEventService} from "../../interfaces/github";
import {debug, error} from "../../utils/log";
import {INotificationService} from "../../interfaces/event";
import {AppConfig} from "../../config";


export class GithubService implements IGithubEventService {
    private config: AppConfig;
    private notification: INotificationService;
    private parser: IEventParser;

    public constructor(config: AppConfig, parser: IEventParser, notification: INotificationService) {
        this.config=config;
        this.parser=parser;
        this.notification = notification;
        debug("GithubService: started");
    }

    public async handleEvent(payload: IGithubEventPayload) {
        const message = this.parser.parseEvent(payload);
        try {
            this.notification.notify(GITHUB_EVENT, message);
        } catch(err) {
            error(err);
        }
    }
}