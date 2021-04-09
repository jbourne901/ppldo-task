"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const log_1 = require("./components/shared/utils/log");
const DEFAULT_LOCALE = "ru";
/**
 * Извлекает из .env и хранит конфигурационные параметры
 * См описание списка параметров в Readme.md
 */
class AppConfig {
    constructor() {
        dotenv_1.default.config({ debug: true });
        this._port = Number.parseInt(process.env.PORT || "3001");
        this._host = process.env.HOST || "0.0.0.0";
        this._pplDoApiUrl = process.env.PPLDO_API_URL || "";
        this._pplDoChatId = process.env.PPLDO_CHAT_ID || "";
        this._pplDoApiToken = process.env.PPLDO_API_TOKEN || "";
        this._locale = process.env.LOCALE || DEFAULT_LOCALE;
        if (!this._pplDoApiUrl) {
            log_1.error("Please specify PPLDO_API_URL in .env");
            process.exit(-1);
        }
        if (!this._pplDoChatId) {
            log_1.error("Please specify PPLDO_CHAT_ID in .env");
            process.exit(-1);
        }
        if (!this._pplDoApiToken) {
            log_1.error("Please specify PPLDO_API_TOKEN in .env");
            process.exit(-1);
        }
    }
    port() {
        return this._port;
    }
    host() {
        return this._host;
    }
    pplDoApiUrl() {
        return this._pplDoApiUrl;
    }
    pplDoChatId() {
        return this._pplDoChatId;
    }
    pplDoApiToken() {
        return this._pplDoApiToken;
    }
    locale() {
        return this._locale;
    }
}
exports.AppConfig = AppConfig;
//# sourceMappingURL=config.js.map