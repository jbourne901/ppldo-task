import {AppConfig} from "./config";
import {IPppldoService} from "./interfaces/ppldo";
import {debug, error} from "./utils/log";
import {GithubService} from "./services/github/github-service";
import {EventParser} from "./services/github/event-parser";
import {PpldoService} from "./services/ppldo-service";
import {NotificationService} from "./services/notification";
import express from "express";
import {MockGithubController} from "./controllers/mock-github-controller";
import {IPpplDoTestResult, MockPpldoController} from "./controllers/mock-ppldo-controller";
import {TestStorage} from "./interfaces/test";
import {testFixtures} from "./test-fixtures";
import {IGithubEventPayload} from "./interfaces/github";

type ITestFixture = {
    githubData: IGithubEventPayload;
    result: IPpplDoTestResult;
}

export class TestApp {

    private config: AppConfig;
    private pplDoService: IPppldoService;
    private githubController: MockGithubController;
    private app: express.Application;

    public constructor(config: AppConfig) {
        this.config = config;
        const notification = new NotificationService();
        this.app = express();

        const pplDoController = new MockPpldoController(config);
        this.pplDoService = new PpldoService(notification, pplDoController);

        const eventParser = new EventParser(config)
        const githubService = new GithubService(config, eventParser, notification);
        this.githubController = new MockGithubController(this.app, githubService);

        debug("App: initialized");
    }

    protected checkTestResult(expected: IPpplDoTestResult) {
        const result = TestStorage.instance().getTestResult() as IPpplDoTestResult;
        if(!result) {
            throw Error("It should produce result: FAILED")
        } else {
            debug("It should produce result: PASSED");
        }
        if(expected.query !== result?.query.toString()) {
            console.log(result?.query.toString())
            throw Error("Query should match expected: FAILED")
        } else {
            debug("Query should match expected: PASSED");
        }
        if(expected.vars.chat_id !== result?.vars?.chat_id) {
            throw Error("ChatID should match expected: FAILED")
        } else {
            debug("ChatID should match expected: PASSED");
        }
        if(expected.vars.input.length !== result?.vars?.input?.length) {
            throw Error("Input length must match expected: FAILED")
        } else {
            debug("Input length must match expected: PASSED");
        }
        if(expected.vars.input[0] !== result?.vars?.input[0]) {
            throw Error("Input message must match expected: FAILED")
        } else {
            debug("Input message must match expected: PASSED");
        }
        if(expected.headers.Authorization !== result.headers?.Authorization) {
            throw Error("Header must expected: FAILED")
        } else {
            debug("Header must expected: PASSED");
        }
    }

    public async test(fixture: ITestFixture) {
        debug("App: started");

        try {
            await this.githubController.test(fixture.githubData);
            this.checkTestResult(fixture.result);
        } catch(err) {
            error(err);
        }

    }

    public runSuite() {
        const fixtures = testFixtures(this.config)
        for(let fixture of fixtures) {
            this.test(fixture);
        }
    }
}



const config = new AppConfig();
const app = new TestApp(config);
app.runSuite();


