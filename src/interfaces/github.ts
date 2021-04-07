export enum GithubResource {
    EVENT="/event",
}


//TODO
// we dont know what comes from github yet, change to a type later
export type IGithubEventPayload = any;

export interface IGithubEventService {
    handleEvent(payload: IGithubEventPayload): Promise<void>;
}

export interface IGithubController {

}

export const UNKNOWN_EVENT = "Unknown Event";