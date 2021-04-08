import {IGithubCommit, IGithubEventPayload} from "../../interfaces/github";

const UNKNOWN_TS = "неизвестное дата/время";
const UNKNOWN_REPOSITORY = "неизвестный репозиторий";
const UNKNOWN_USER = "Неизвестный пользователь";
const UNKNOWN_ISSUE_ACTION = "изменил issue";
const UNKNOWN_EVENT = "Неизвестное событие";

const formatPushTs = (githubPushTs: number|undefined) => {
    if(githubPushTs) {
        const ts = githubPushTs;
        if(ts) {
            const d = new Date(ts * 1000);  //github присылает pushed_at без миллисекунд
            return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
        }
    }
    return UNKNOWN_TS;
};

const formatCommit = (commit: IGithubCommit) => {
    const user = commit.committer?.name || UNKNOWN_USER;
    return `${user}: "${commit.message}"`;
};

const formatCommits = (commits: IGithubCommit[]|undefined) => {
    if(!commits) {
        return [];
    }
    return commits.map( c => formatCommit(c));
}

const formatIssueAction = (action: string|undefined) => {
    if(action==="opened") {
        return "создал issue";
    }
    if(action==="closed") {
        return "закрыл issue";
    }
    return UNKNOWN_ISSUE_ACTION;
}


export const parseEvent = (payload: IGithubEventPayload) => {
    const repository = payload.repository?.name || UNKNOWN_REPOSITORY;
    if(payload.pusher) {
        const user = payload.pusher.name||UNKNOWN_USER;
        const ts = formatPushTs(payload.repository?.pushed_at);
        const commits = formatCommits(payload.commits).join("\n");
        return `${ts}: ${user} выполнил push в репозиторий ${repository} коммиты: [ ${commits} ]`;
    } else if(payload.issue) {
        const action = formatIssueAction(payload.action);
        const ts = payload.issue.closed_at || payload.issue.created_at || payload.issue.updated_at || UNKNOWN_TS;
        const title = payload.issue.title;
        const user = payload.issue.user?.login || UNKNOWN_USER;
        return `${ts}: ${user} ${action} ${title} в репозитории ${repository}`;
    }
    return UNKNOWN_EVENT;
}