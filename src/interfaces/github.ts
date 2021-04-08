/**
 * REST API endpoints ресурсы для Git webhook
 */
import {IEvent} from "./event";

export enum GithubResource {
    EVENT="/event",   //события
}

export type IGithubCommit = {
    message: string;
    committer: {
        name: string;
    };
}


export type IGithubEventPayload = {
    repository?: {
        name: string;
        pushed_at?: number;
    },
    action?: string;
    issue?: {
        title: string;
        body: string;
        created_at?: string;
        updated_at?: string;
        closed_at?: string;
        user?: {
            login: string;
        }
    };
    pusher?: {
        name: string;
    };
    commits?: IGithubCommit[];
}


export interface IGithubEventService {
    handleEvent(payload: IGithubEventPayload): Promise<void>;
}

export interface IGithubController {

}

export interface IEventParser {
    parseEvent (payload: IGithubEventPayload): string;
}


export const GITHUB_EVENT: IEvent = "github-event";