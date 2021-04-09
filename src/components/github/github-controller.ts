import express, {NextFunction, Request, Response} from "express";
import {ApiResource} from "../shared/interfaces/api-resource";
import {GithubResource, IGithubController, IGithubEventService} from "./github";
import {debug, error} from "../shared/utils/log";

/**
 * Отвечает за прием REST запросов (webhooks) на endpoint GITHUB и передачу их в GithubEventService для дальнейшей обработки
 * На запросы не отсылает никакого ответа поскольку это webhook и ответа не ожидается
 */
export class GithubController implements IGithubController {
    private service: IGithubEventService;


    public constructor(app: express.Application, service: IGithubEventService) {
        this.service = service;
        const router = express.Router();
        router.post(GithubResource.EVENT, async (req: Request, _res: Response, _next: NextFunction) => {
            debug(`router.post ${GithubResource.EVENT} req.body=`, req.body)
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


