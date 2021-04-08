"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEvent = void 0;
const UNKNOWN_TS = "неизвестное дата/время";
const UNKNOWN_REPOSITORY = "неизвестный репозиторий";
const UNKNOWN_USER = "Неизвестный пользователь";
const UNKNOWN_ISSUE_ACTION = "изменил issue";
const UNKNOWN_EVENT = "Неизвестное событие";
const formatPushTs = (githubPushTs) => {
    if (githubPushTs) {
        const ts = githubPushTs;
        if (ts) {
            const d = new Date(ts * 1000); //github присылает pushed_at без миллисекунд
            return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
        }
    }
    return UNKNOWN_TS;
};
const formatCommit = (commit) => {
    var _a;
    const user = ((_a = commit.committer) === null || _a === void 0 ? void 0 : _a.name) || UNKNOWN_USER;
    return `${user}: ${commit.message}`;
};
const formatCommits = (commits) => {
    if (!commits) {
        return [];
    }
    return commits.map(c => formatCommit(c));
};
const formatIssueAction = (action) => {
    if (action === "opened") {
        return "создал issue";
    }
    if (action === "closed") {
        return "закрыл issue";
    }
    return UNKNOWN_ISSUE_ACTION;
};
const parseEvent = (payload) => {
    var _a, _b, _c;
    const repository = ((_a = payload.repository) === null || _a === void 0 ? void 0 : _a.name) || UNKNOWN_REPOSITORY;
    if (payload.pusher) {
        const user = payload.pusher.name || UNKNOWN_USER;
        const ts = formatPushTs((_b = payload.repository) === null || _b === void 0 ? void 0 : _b.pushed_at);
        const commits = formatCommits(payload.commits).join("\n");
        return `${ts}: ${user} выполнил push в репозиторий ${repository} коммиты ${commits}`;
    }
    else if (payload.issue) {
        const action = formatIssueAction(payload.action);
        const ts = payload.issue.closed_at || payload.issue.created_at || payload.issue.updated_at || UNKNOWN_TS;
        const title = payload.issue.title;
        const user = ((_c = payload.issue.user) === null || _c === void 0 ? void 0 : _c.login) || UNKNOWN_USER;
        return `${ts}: ${user} ${action} ${title} в репозитории ${repository}`;
    }
    return UNKNOWN_EVENT;
};
exports.parseEvent = parseEvent;
//# sourceMappingURL=parse-event.js.map