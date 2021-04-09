import {GraphQLClient, gql} from 'graphql-request'
import {AppConfig} from "../../config";
import {IChatId, IMessageId, IpplDoController} from "./ppldo";
import {debug, error} from "../shared/utils/log";
import {NewMessageInput, NewTextMessageInput} from "./schema/generated/graphql";

export type ISendMessagePayload = {
    chat_id: IChatId,
    input: [NewMessageInput];
}

/**
 * Отвечает за отправку сообщений в чат PPLDO через GraphQL API PPLDO
 * Сообщения для отправки приходят из PpldoService
 * Параметры API конфигурируются в .env: строка url, токен
 * При успешной отправке получает на выходе node id, с которым ничего не делает, просто выводит в лог
 * При ошибке отправки выводит в лог сообщение об ошибке.
 * TODO: реализовать надежную доставку сообщений (с конфигурированием количества попыток и интервала между ними)
 */
export class PpldoController implements IpplDoController {

    private client: GraphQLClient;
    private config: AppConfig;

    public constructor(config: AppConfig) {
        this.config = config;
        const headers = {Bearer: this.config.pplDoApiToken()};
        this.client = new GraphQLClient(config.pplDoApiUrl(), {headers});
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
            const headers = {Authorization: `Bearer ${this.config.pplDoApiToken()}`} ;
            const res = await this.client.request<IMessageId, ISendMessagePayload>(query, vars, headers);
            debug(`res=`, res)
        } catch (err) {
            error(err);
        }
    }
}


