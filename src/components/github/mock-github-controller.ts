import {IGithubController, IGithubEventPayload, IGithubEventService} from "./github";
import {debug, error} from "../shared/utils/log";
import express from "express";
import {ITestable} from "../shared/interfaces/test";

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
