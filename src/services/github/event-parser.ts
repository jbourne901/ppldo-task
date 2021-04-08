import {IGithubCommit, IGithubEventPayload} from "../../interfaces/github";
import {AppConfig} from "../../config";

const UNKNOWN_TS = "неизвестное дата/время";
const UNKNOWN_REPOSITORY = "неизвестный репозиторий";
const UNKNOWN_USER = "Неизвестный пользователь";
const UNKNOWN_ISSUE_ACTION = "изменил issue";
const UNKNOWN_EVENT = "Неизвестное событие";
const ACTION_ISSUE_CREATED = "создал issue";
const ACTION_ISSUE_CLOSED = "закрыл issue";
const PUSH_TEMPLATE = "${ts}: ${user} выполнил push в репозиторий ${repository} коммиты: [ ${commits} ]";

type IMessageVars = {[key: string]: string};

export class EventParser {
    private config: AppConfig;
    constructor(config: AppConfig) {
        this.config=config;
    }

    protected formatDate(d: Date) {
        const locale: string = this.config.locale();
        return `${d.toLocaleDateString(locale)} ${d.toLocaleTimeString(locale)}`;
    }

    protected formatPushTs (githubPushTs: number|undefined) {
        if(githubPushTs) {
            const ts = githubPushTs;
            if(ts) {
                const d = new Date(ts * 1000);  //github присылает pushed_at без миллисекунд
                return this.formatDate(d);
            }
        }
        return UNKNOWN_TS;
    }

    protected formatTs (githubTs: string|undefined) {
        if(githubTs) {
            const d = new Date(githubTs);
            if(d.toString()!=="Invalid Date") {
                return this.formatDate(d);
            }
        }
        return UNKNOWN_TS;
    }

    protected formatCommit (commit: IGithubCommit) {
        const user = commit.committer?.name || UNKNOWN_USER;
        return `${user}: "${commit.message}"`;
    }

    protected formatCommits (commits: IGithubCommit[]|undefined) {
        if(!commits) {
            return [];
        }
        return commits.map( c => this.formatCommit(c));
    }

    protected formatIssueAction (action: string|undefined) {
        if(action==="opened") {
            return ACTION_ISSUE_CREATED;
        }
        if(action==="closed") {
            return ACTION_ISSUE_CLOSED;
        }
        return UNKNOWN_ISSUE_ACTION;
    }

    protected formatString(template: string, vars: {[key: string]: string}) {
        let str=template;
        for (let key in vars) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), vars[key]);
        }
        return str;
    }

    protected formatPushMessage(vars: IMessageVars) {
        return this.formatString(PUSH_TEMPLATE, vars);
    }

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
            return `${ts}: ${user} ${action} "${title}" в репозитории ${repository}`;
        }
        return UNKNOWN_EVENT;
    }
}

