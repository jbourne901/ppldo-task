"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockPpldoController = void 0;
const log_1 = require("../shared/utils/log");
const graphql_request_1 = require("graphql-request");
const test_1 = require("../shared/interfaces/test");
class MockPpldoController {
    constructor(config) {
        this.config = config;
        log_1.debug("PpldoController: started");
    }
    async sendMessage(message) {
        const query = graphql_request_1.gql `
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
        log_1.debug(`Sending ${message} to ppldo service`);
        try {
            const newTextMessageInput = { message };
            const newMessageInput = { text_message: newTextMessageInput };
            const vars = { chat_id: this.config.pplDoChatId(), input: [newMessageInput] };
            const headers = { Authorization: `Bearer ${this.config.pplDoApiToken()}` };
            const res = { query, vars, headers };
            test_1.TestStorage.instance().setTestResult(res);
        }
        catch (err) {
            log_1.error(err);
        }
    }
}
exports.MockPpldoController = MockPpldoController;
/*
{text_message: {message}};
 */
//# sourceMappingURL=mock-ppldo-controller.js.map