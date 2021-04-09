import {AppConfig} from "../config";
import {IPppldoService} from "../components/chat-service/ppldo";
import {debug, error, log} from "../components/shared/utils/log";
import {GithubService} from "../components/github/service/github-service";
import {EventParser} from "../components/github/service/event-parser";
import {PpldoService} from "../components/chat-service/ppldo-service";
import {NotificationService} from "../components/shared/services/notification";
import express from "express";
import {MockGithubController} from "../components/github/mock-github-controller";
import {IPpplDoTestResult, MockPpldoController} from "../components/chat-service/mock-ppldo-controller";
import {TestStorage} from "../components/shared/interfaces/test";
import {testFixtures} from "./test-fixtures";
import {IGithubEventPayload} from "../components/github/github";

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
        if(expected.query.toString().replace(/ /g, "") !== result?.query.toString().replace(/ /g, "")) {
            log(result?.query.toString())
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
            log(expected.vars.input.length, result?.vars?.input?.length)
            throw Error("Input length must match expected: FAILED")
        } else {
            debug("Input length must match expected: PASSED");
        }
        if(expected.vars.input[0]?.text_message?.message !== result?.vars?.input[0]?.text_message?.message) {
            log(expected.vars.input[0] , result?.vars?.input[0])
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

