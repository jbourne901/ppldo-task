"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventParser = void 0;
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
 * Отвечает за обработку сырого события от service,  выделение из него полезных полей,
 * распознавание какое именно событие произошло и в зависимости от события, подготовку
 * строки сообщения с необходимыми полями
 * Шаблоны строк вынесены в виде констант и могут быть изменены
 */
class EventParser {
    constructor(config) {
        this.config = config;
    }
    /**
     * Преобразует из даты в локализованную строку в указанной локали
     * @param d - входная дата (тип Date)
     * @return локализованная строка дата/время
     * @protected
     */
    formatDate(d) {
        const locale = this.config.locale();
        return `${d.toLocaleDateString(locale)} ${d.toLocaleTimeString(locale)}`;
    }
    /**
     * Преобразует из IGithubPushDate (время в виде числа без милисекунд) в локализованную строку даты/времени
     * @param githubPushTs
     * @return локализованная строка дата/время
     * @protected
     */
    formatPushTs(githubPushTs) {
        if (githubPushTs) {
            const ts = githubPushTs;
            if (ts) {
                const d = new Date(ts * 1000); //service присылает pushed_at без миллисекунд
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
    formatTs(githubTs) {
        if (githubTs) {
            const d = new Date(githubTs);
            if (d.toString() !== "Invalid Date") {
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
    formatCommit(commit) {
        var _a;
        const user = ((_a = commit.committer) === null || _a === void 0 ? void 0 : _a.name) || UNKNOWN_USER;
        const vars = { user, message: commit.message };
        return this.formatString(COMMIT_TEMPLATE, vars);
    }
    /**
     * Форматирует группу коммитов
     * @param commits список коммитов
     * @return строка , содержащая список коммитов
     * @protected
     */
    formatCommits(commits) {
        if (!commits) {
            return [];
        }
        return commits.map(c => this.formatCommit(c));
    }
    /**
     * Форматирование и локализация типа действия над issue
     * @param action - действие (opened, closed)
     * @return локализованная строка о действии
     * @protected
     */
    formatIssueAction(action) {
        if (action === "opened") {
            return ACTION_ISSUE_CREATED;
        }
        if (action === "closed") {
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
    formatString(template, vars) {
        let str = template;
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
    formatPushMessage(vars) {
        return this.formatString(PUSH_TEMPLATE, vars);
    }
    /**
     * Форматирует строку о issue событии
     * @param vars список переменных для строки о issue событии
     * @return полная собранная строка о issue событии
     * @protected
     */
    formatIssueMessage(vars) {
        return this.formatString(ISSUE_TEMPLATE, vars);
    }
    /**
     * Основная точка входа в функцию разбора объекта, полученного в запросе и подготовки форматированной строки с информацией о событии
     * @param payload - объект , полученный в запросе от Github hook
     * @return отформатированная строка для публикации в чате
     */
    parseEvent(payload) {
        var _a, _b, _c;
        const repository = ((_a = payload.repository) === null || _a === void 0 ? void 0 : _a.name) || UNKNOWN_REPOSITORY;
        if (payload.pusher) {
            const user = payload.pusher.name || UNKNOWN_USER;
            const ts = this.formatPushTs((_b = payload.repository) === null || _b === void 0 ? void 0 : _b.pushed_at);
            const commits = this.formatCommits(payload.commits).join("\n");
            const vars = { ts, user, repository, commits };
            return this.formatPushMessage(vars);
        }
        else if (payload.issue) {
            const action = this.formatIssueAction(payload.action);
            const ts = this.formatTs(payload.issue.closed_at || payload.issue.created_at || payload.issue.updated_at);
            const title = payload.issue.title;
            const user = ((_c = payload.issue.user) === null || _c === void 0 ? void 0 : _c.login) || UNKNOWN_USER;
            const vars = { ts, action, title, user };
            return this.formatIssueMessage(vars);
        }
        return UNKNOWN_EVENT;
    }
}
exports.EventParser = EventParser;
//# sourceMappingURL=event-parser.js.map