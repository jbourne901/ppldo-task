import {IGithubCommit, IGithubEventPayload, IGithubPushDate} from "../github";
import {AppConfig} from "../../../config";


/**
 * Константы, используемые при подготовке строки сообщения
 */

/**
 * если в запросе отсутствует дата, показываем это значение
 */
const UNKNOWN_TS = "неизвестное дата/время";

/**
 * если в запросе отсутствует имя репо, показываем это значение
 */
const UNKNOWN_REPOSITORY = "неизвестный репозиторий";

/**
 * если в запросе отсутствует юзер, показываем это значение
 */
const UNKNOWN_USER = "Неизвестный пользователь";

/**
 * если в запросе отсутствует или неизвестное значение action, показываем это значение
 */
const UNKNOWN_ISSUE_ACTION = "изменил issue";

/**
 * показываем это значение в случае если событие не определено как одно из поддерживаемых (на данный момент
 * поддерживаются только push и issue open/close
 */
const UNKNOWN_EVENT = "Неизвестное событие";

/**
 * локализованные имена для действий над issue
 */
const ACTION_ISSUE_CREATED = "создал issue";
const ACTION_ISSUE_CLOSED = "закрыл issue";

/**
 * Шаблоны формата строк для разных видом cобытий
 */
const PUSH_TEMPLATE = "{ts}: {user} выполнил push в репозиторий {repository} коммиты: [ {commits} ]";
const ISSUE_TEMPLATE = "{ts}: {user} {action} \"{title}\" в репозитории {repository}";
const COMMIT_TEMPLATE = "{user}: \"{message}\"";
/**
 * Список переменных для передачи в formatString
 */
type IMessageVars = {[key: string]: string};

/**
 * Отвечает за обработку сырого события от service,  выделение из него полезных полей,
 * распознавание какое именно событие произошло и в зависимости от события, подготовку
 * строки сообщения с необходимыми полями
 * Шаблоны строк вынесены в виде констант и могут быть изменены
 */
export class EventParser {
    private config: AppConfig;
    constructor(config: AppConfig) {
        this.config=config;
    }

    /**
     * Преобразует из даты в локализованную строку в указанной локали
     * @param d - входная дата (тип Date)
     * @return локализованная строка дата/время
     * @protected
     */
    protected formatDate(d: Date) {
        const locale: string = this.config.locale();
        return `${d.toLocaleDateString(locale)} ${d.toLocaleTimeString(locale)}`;
    }

    /**
     * Преобразует из IGithubPushDate (время в виде числа без милисекунд) в локализованную строку даты/времени
     * @param githubPushTs
     * @return локализованная строка дата/время
     * @protected
     */
    protected formatPushTs (githubPushTs: IGithubPushDate|undefined) {
        if(githubPushTs) {
            const ts = githubPushTs;
            if(ts) {
                const d = new Date(ts * 1000);  //service присылает pushed_at без миллисекунд
                return this.formatDate(d);
            }
        }
        return UNKNOWN_TS;
    }


    /**
     * Преобразует дату из строки в локализованное представление
     * @param githubPushTs дата/время в виде строки, как они получены в запросе
     * @return локализованная строка дата/время
     * @protected
     */
    protected formatTs (githubTs: string|undefined) {
        if(githubTs) {
            const d = new Date(githubTs);
            if(d.toString()!=="Invalid Date") {
                return this.formatDate(d);
            }
        }
        return UNKNOWN_TS;
    }


    /**
     * Создает строку информации об одном коммите по шаблону COMMIT_TEMPLATE
     * @param commit данные о коммите
     * @return строка информации о коммите
     * @protected
     */
    protected formatCommit (commit: IGithubCommit) {
        const user = commit.committer?.name || UNKNOWN_USER;
        const vars: IMessageVars = {user, message: commit.message};
        return this.formatString(COMMIT_TEMPLATE, vars);
    }

    /**
     * Форматирует группу коммитов
     * @param commits список коммитов
     * @return строка , содержащая список коммитов
     * @protected
     */
    protected formatCommits (commits: IGithubCommit[]|undefined) {
        if(!commits) {
            return [];
        }
        return commits.map( c => this.formatCommit(c));
    }

    /**
     * Форматирование и локализация типа действия над issue
     * @param action - действие (opened, closed)
     * @return локализованная строка о действии
     * @protected
     */
    protected formatIssueAction (action: string|undefined) {
        if(action==="opened") {
            return ACTION_ISSUE_CREATED;
        }
        if(action==="closed") {
            return ACTION_ISSUE_CLOSED;
        }
        return UNKNOWN_ISSUE_ACTION;
    }

    /**
     * Строит строку по шаблону с подстановкой переменных
     * @param template шаблон
     * @param vars список переменных {ключ: значение, ...}
     * @return отформатированная строка по шаблону
     * @protected
     */
        protected formatString(template: string, vars: {[key: string]: string}) {
        let str=template;
        for (let key in vars) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), vars[key]);
        }
        return str;
    }

    /**
     * Форматирует строку о push сообщение
     * @param vars список переменных для строки о push событии
     * @return полная собранная строка о push событии
     * @protected
     */
    protected formatPushMessage(vars: IMessageVars) {
        return this.formatString(PUSH_TEMPLATE, vars);
    }

    /**
     * Форматирует строку о issue событии
     * @param vars список переменных для строки о issue событии
     * @return полная собранная строка о issue событии
     * @protected
     */
    protected formatIssueMessage(vars: IMessageVars) {
        return this.formatString(ISSUE_TEMPLATE, vars)
    }

    /**
     * Основная точка входа в функцию разбора объекта, полученного в запросе и подготовки форматированной строки с информацией о событии
     * @param payload - объект , полученный в запросе от Github hook
     * @return отформатированная строка для публикации в чате
     */
    public parseEvent (payload: IGithubEventPayload) {
        const repository = payload.repository?.name || UNKNOWN_REPOSITORY;
        if(payload.pusher) {
            const user = payload.pusher.name||UNKNOWN_USER;
            const ts = this.formatPushTs(payload.repository?.pushed_at);
            const commits = this.formatCommits(payload.commits).join("\n");
            const vars: IMessageVars = {ts, user, repository, commits};
            return this.formatPushMessage(vars);
        } else if(payload.issue) {
            const action = this.formatIssueAction(payload.action);
            const ts = this.formatTs(payload.issue.closed_at || payload.issue.created_at || payload.issue.updated_at);

            const title = payload.issue.title;
            const user = payload.issue.user?.login || UNKNOWN_USER;
            const vars: IMessageVars = {ts, action, title, user};
            return this.formatIssueMessage(vars);
        }
        return UNKNOWN_EVENT;
    }
}

