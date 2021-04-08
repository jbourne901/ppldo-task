"use strict";
/**
 * Обертки над стандартными функциями консольного логирования, чтобы впоследствие можно было заменить на что-то более удобное
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.warn = exports.debug = exports.error = exports.log = void 0;
exports.log = console.log;
exports.error = console.error;
exports.debug = console.debug;
exports.warn = console.warn;
//# sourceMappingURL=log.js.map