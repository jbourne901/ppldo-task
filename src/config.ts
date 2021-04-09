import dotenv from "dotenv";
import {error} from "./components/shared/utils/log";

const DEFAULT_LOCALE = "ru";

/**
 * Извлекает из .env и хранит конфигурационные параметры
 * См описание списка параметров в Readme.md
 */
export class AppConfig {
    private _port: number;
    private _host: string;
    private _pplDoApiUrl: string;
    private _pplDoChatId: string;
    private _pplDoApiToken: string;
    private _locale: string;

    constructor() {
        dotenv.config( { debug: true } );
        this._port=Number.parseInt(process.env.PORT || "3001");
        this._host=process.env.HOST||"0.0.0.0";
        this._pplDoApiUrl=process.env.PPLDO_API_URL||"";
        this._pplDoChatId=process.env.PPLDO_CHAT_ID||"";
        this._pplDoApiToken = process.env.PPLDO_API_TOKEN||"";
        this._locale = process.env.LOCALE || DEFAULT_LOCALE;
        if(!this._pplDoApiUrl) {
            error("Please specify PPLDO_API_URL in .env");
            process.exit(-1);
        }
        if(!this._pplDoChatId) {
            error("Please specify PPLDO_CHAT_ID in .env");
            process.exit(-1);
        }
        if(!this._pplDoApiToken) {
            error("Please specify PPLDO_API_TOKEN in .env");
            process.exit(-1);
        }
    }

    public port() {
        return this._port;
    }
    public host() {
        return this._host;
    }
    public pplDoApiUrl() {
        return this._pplDoApiUrl;
    }
    public pplDoChatId() {
        return this._pplDoChatId;
    }
    public pplDoApiToken() {
        return this._pplDoApiToken;
    }
    public locale() {
        return this._locale;
    }

}