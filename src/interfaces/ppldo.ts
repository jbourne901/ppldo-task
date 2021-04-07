import {IGithubEventPayload} from "./github";

export interface IPppldoService {
}

export interface IpplDoController {
    sendMessage(message: string): Promise<void>;
}

export type IChatId = string;
export type IMessageId = string;