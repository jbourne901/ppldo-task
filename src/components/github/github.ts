import {IEvent} from "../shared/interfaces/event";

/**
 * REST API endpoints ресурсы для коннекций от Github
 */
export enum GithubResource {
    EVENT="/event",   //события
}

/**
 * Структура одного конкретного коммита
 * Пока ограничиваемся  коммит-сообщением и именем коммитера
 * В дальнейшем можно дополнить этот тип другими полезными полями
 */
export type IGithubCommit = {
    message: string;
    committer: {
        name: string;
    };
}

/**
 * дата/время публикации (в виде number, без миллисекунд)
 */
export type  IGithubPushDate = number;


/**
 * Общий тип для данных от событий Github.
 * Описаны только подмножество полезных полей для сообщения, остальные опущены
 * В дальнейшем можно добавить другие если понадобится
 */
export type IGithubEventPayload = {
    repository?: {
        name: string;                       //имя репо
        pushed_at?: IGithubPushDate;        //дата-время публикации
    },
    action?: string;                        //действие (для issue - opened или closed)
    issue?: {
        title: string;                      //заголовок issue
        body: string;                       //текст  issue
        created_at?: string;                //дата/время создания
        updated_at?: string;                //дата/время изменения
        closed_at?: string;                 //дата/время закрытия
        user?: {
            login: string;                  //логин пользователя, который выполнил действие
        }
    };
    pusher?: {
        name: string;                       //имя публикатора
    };
    commits?: IGithubCommit[];              //список опубликованных коммитов
}

/**
 * Интерфейс сервиса service
 */
export interface IGithubEventService {
    /**
     * функция, которая занимается разбором и категоризацией события от Github
     * @param payload объект , полученный в запросе
     */
    handleEvent(payload: IGithubEventPayload): Promise<void>;
}


/**
 * Интерфейс контроллера Github
 */
export interface IGithubController {

}

/**
 * Интерфейс парсера события service
 */

export interface IEventParser {
    /**
     * функция разбора события и возврата форматированной строки
     * @param payload объект , полученный в запросе
     * @return строка , сформированная по событию
     */
    parseEvent (payload: IGithubEventPayload): string;
}

/**
 * константа, обозначающая события Github event (для подписки на него)
 */
export const GITHUB_EVENT: IEvent = "service-event";