"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PpldoController = void 0;
const graphql_request_1 = require("graphql-request");
const log_1 = require("../shared/utils/log");
/**
 * Отвечает за отправку сообщений в чат PPLDO через GraphQL API PPLDO
 * Сообщения для отправки приходят из PpldoService
 * Параметры API конфигурируются в .env: строка url, токен
 * При успешной отправке получает на выходе node id, с которым ничего не делает, просто выводит в лог
 * При ошибке отправки выводит в лог сообщение об ошибке.
 * TODO: реализовать надежную доставку сообщений (с конфигурированием количества попыток и интервала между ними)
 */
class PpldoController {
    constructor(config) {
        this.config = config;
        const headers = { Bearer: this.config.pplDoApiToken() };
        this.client = new graphql_request_1.GraphQLClient(config.pplDoApiUrl(), { headers });
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
            const res = await this.client.request(query, vars, headers);
            log_1.debug(`res=`, res);
        }
        catch (err) {
            log_1.error(err);
        }
    }
}
exports.PpldoController = PpldoController;
//# sourceMappingURL=ppldo-controller.js.map