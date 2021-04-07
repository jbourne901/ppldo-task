import {GraphQLClient, gql} from 'graphql-request'
import {AppConfig} from "../config";
import {IChatId, IMessageId, IpplDoController, IPppldoService} from "../interfaces/ppldo";
import {debug, error} from "../utils/log";
import {NewMessageInput, NewTextMessageInput} from "../generated/graphql";

export type ISendMessagePayload = {
    chat_id: IChatId,
    input: [NewMessageInput];
}

export class PpldoController implements IpplDoController {

    private client: GraphQLClient;
    private config: AppConfig;

    public constructor(config: AppConfig) {
        this.config = config;
        this.client = new GraphQLClient(config.pplDoApiUrl(), {headers: {}});
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
        try {
            const newTextMessageInput: NewTextMessageInput = {message};
            const newMessageInput: NewMessageInput = {text_message: newTextMessageInput};
            const vars: ISendMessagePayload = {chat_id: this.config.pplDoChatId(), input: [newMessageInput]}
            const res = await this.client.request<IMessageId, ISendMessagePayload>(query, vars);
            debug(`res=`, res)
        } catch (err) {
            error(err);
        }
    }
}


