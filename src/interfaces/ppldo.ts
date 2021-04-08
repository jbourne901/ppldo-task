/**
 * интерфейс сервиса Ppldo
 */
export interface IPppldoService {
}

/**
 * Интерфейс контроллера Ppldo
 */
export interface IpplDoController {
    /**
     * функция отправки указанного сообщения в чат через API
     * @param message полная строка сообщения
     */
    sendMessage(message: string): Promise<void>;
}

/**
 * ID чата
 */
export type IChatId = string;

/**
 * возвращаемое ID сообщения
 */
export type IMessageId = string;