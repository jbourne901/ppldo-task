import express, {NextFunction, Request, Response} from "express";
import {ApiResource} from "../interfaces/api-resource";
import {GithubResource, IGithubController, IGithubEventService} from "../interfaces/github";
import {debug, error} from "../utils/log";

export class GithubController implements IGithubController {
    private service: IGithubEventService;


    public constructor(app: express.Application, service: IGithubEventService) {
        this.service = service;
        const router = express.Router();
        router.get(GithubResource.EVENT, async (req: Request, _res: Response, _next: NextFunction) => {
            debug(`router.get ${GithubResource.EVENT} req.body=`, req.body)
            try {
                await this.service.handleEvent(req.body);
            } catch(err) {
                error(err);
            }
        });
        app.use(ApiResource.GITHUB, router);
        debug("GithubController: started");
    }
}


