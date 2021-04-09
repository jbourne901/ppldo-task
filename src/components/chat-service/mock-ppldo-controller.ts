import {IpplDoController} from "./ppldo";
import {AppConfig} from "../../config";
import {debug, error} from "../shared/utils/log";
import {gql} from "graphql-request";
import {NewMessageInput, NewTextMessageInput} from "./schema/generated/graphql";
import {ISendMessagePayload} from "./ppldo-controller";
import {TestStorage} from "../shared/interfaces/test";

export type IPPlDoHeaders = {Authorization: string} ;
export type IPpplDoTestResult = {query: string, vars: ISendMessagePayload, headers: IPPlDoHeaders};

export class MockPpldoController implements IpplDoController {

    private config: AppConfig;
    public constructor(config: AppConfig) {
        this.config = config;
        debug("PpldoController: started");
    }

    public async sendMessage(message: string) {
        const query = gql`
            mutation NEW_MESSAGE($chat_id: ID!, $input: [NewMessageInput!]!) {
                newMessages2( chat_id: $chat_id, input: $input) {
                    edges {
                        node {
                            id
                        }
                    }
                }
            }
        `;
        debug(`Sending ${message} to ppldo service`);
        try {
            const newTextMessageInput: NewTextMessageInput = {message};
            const newMessageInput: NewMessageInput = {text_message: newTextMessageInput};
            const vars: ISendMessagePayload = {chat_id: this.config.pplDoChatId(), input: [newMessageInput]}
            const headers: IPPlDoHeaders = {Authorization: `Bearer ${this.config.pplDoApiToken()}`} ;
            const res: IPpplDoTestResult = {query, vars, headers};
            TestStorage.instance().setTestResult(res);

        } catch (err) {
            error(err);
        }
    }
}

/*
{text_message: {message}};
 */

