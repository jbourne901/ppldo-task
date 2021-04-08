"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventParser = void 0;
const UNKNOWN_TS = "неизвестное дата/время";
const UNKNOWN_REPOSITORY = "неизвестный репозиторий";
const UNKNOWN_USER = "Неизвестный пользователь";
const UNKNOWN_ISSUE_ACTION = "изменил issue";
const UNKNOWN_EVENT = "Неизвестное событие";
const ACTION_ISSUE_CREATED = "создал issue";
const ACTION_ISSUE_CLOSED = "закрыл issue";
const PUSH_TEMPLATE = "${ts}: ${user} выполнил push в репозиторий ${repository} коммиты: [ ${commits} ]";
class EventParser {
    constructor(config) {
        this.config = config;
    }
    formatDate(d) {
        const locale = this.config.locale();
        return `${d.toLocaleDateString(locale)} ${d.toLocaleTimeString(locale)}`;
    }
    formatPushTs(githubPushTs) {
        if (githubPushTs) {
            const ts = githubPushTs;
            if (ts) {
                const d = new Date(ts * 1000); //github присылает pushed_at без миллисекунд
                return this.formatDate(d);
            }
        }
        return UNKNOWN_TS;
    }
    formatTs(githubTs) {
        if (githubTs) {
            const d = new Date(githubTs);
            if (d.toString() !== "Invalid Date") {
                return this.formatDate(d);
            }
        }
        return UNKNOWN_TS;
    }
    formatCommit(commit) {
        var _a;
        const user = ((_a = commit.committer) === null || _a === void 0 ? void 0 : _a.name) || UNKNOWN_USER;
        return `${user}: "${commit.message}"`;
    }
    formatCommits(commits) {
        if (!commits) {
            return [];
        }
        return commits.map(c => this.formatCommit(c));
    }
    formatIssueAction(action) {
        if (action === "opened") {
            return ACTION_ISSUE_CREATED;
        }
        if (action === "closed") {
            return ACTION_ISSUE_CLOSED;
        }
        return UNKNOWN_ISSUE_ACTION;
    }
    formatString(template, vars) {
        let str = template;
        for (let key in vars) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), vars[key]);
        }
        return str;
    }
    formatPushMessage(vars) {
        return this.formatString(PUSH_TEMPLATE, vars);
    }
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
            return `${ts}: ${user} ${action} "${title}" в репозитории ${repository}`;
        }
        return UNKNOWN_EVENT;
    }
}
exports.EventParser = EventParser;
//# sourceMappingURL=event-parser.js.map