/**
 * Обертки над стандартными функциями консольного логирования, чтобы впоследствие можно было заменить на что-то более удобное
 */

export const log = console.log;
export const error = console.error;
export const debug = console.debug;
export const warn = console.warn;