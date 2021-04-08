import {IGithubController, IGithubEventPayload, IGithubEventService} from "../interfaces/github";
import {debug, error} from "../utils/log";
import express from "express";
import {ITestable} from "../interfaces/test";

export class MockGithubController implements IGithubController, ITestable<IGithubEventPayload> {
    private service: IGithubEventService;


    public constructor(app: express.Application, service: IGithubEventService) {
        this.service = service;
        debug("GithubController: started");
    }

    public async test(testObj: IGithubEventPayload) {
        try {
            await this.service.handleEvent(testObj);
        } catch(err) {
            error(err);
        }
    }

}
