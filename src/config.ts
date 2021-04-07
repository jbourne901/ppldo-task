import dotenv from "dotenv";
import {error} from "./utils/log";

export class AppConfig {
    private _port: number;
    private _host: string;
    private _pplDoApiUrl: string;
    private _pplDoChatId: string;

    constructor() {
        dotenv.config( { debug: true } );
        this._port=Number.parseInt(process.env.PORT || "3001");
        this._host=process.env.HOST||"0.0.0.0";
        this._pplDoApiUrl=process.env.PPLDO_API_URL||"";
        this._pplDoChatId=process.env.PPLDO_CHAT_ID||"";
        if(!this._pplDoApiUrl) {
            error("Please specify PPLDO_API_URL in .env");
            process.exit(-1);
        }
        if(!this._pplDoChatId) {
            error("Please specify PPLDO_CHAT_ID in .env");
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

}