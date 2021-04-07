"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoState = exports.SearchMessageWhere = exports.RegistrationStep = exports.Locale = exports.GroupState = exports.Gender = exports.FileType = exports.ErrorType = exports.ChatUsersStateFilter = exports.ChatState = exports.ChatNotificationState = void 0;
/** уровень назойливости событий чата */
var ChatNotificationState;
(function (ChatNotificationState) {
    /** не создают звуков в клиенте, не создают звуков в пуш уведомлении */
    ChatNotificationState["Mute"] = "MUTE";
    /** не создают звуков в клиенте, не создают пуш уведомлений */
    ChatNotificationState["Off"] = "OFF";
    /** звук в клиенту включен, приходят пуши со звуком */
    ChatNotificationState["On"] = "ON";
})(ChatNotificationState = exports.ChatNotificationState || (exports.ChatNotificationState = {}));
/** статус вашего участия в чате */
var ChatState;
(function (ChatState) {
    /** активен */
    ChatState["Active"] = "ACTIVE";
    /** создатель завершил чат */
    ChatState["Closed"] = "CLOSED";
    /** вы покинули чат */
    ChatState["Leaved"] = "LEAVED";
    /** вы удалены из чата */
    ChatState["Deleted"] = "DELETED";
})(ChatState = exports.ChatState || (exports.ChatState = {}));
/** фильтр по статусу участника чата */
var ChatUsersStateFilter;
(function (ChatUsersStateFilter) {
    /** только активные участники */
    ChatUsersStateFilter["Active"] = "ACTIVE";
    /** все участники */
    ChatUsersStateFilter["All"] = "ALL";
})(ChatUsersStateFilter = exports.ChatUsersStateFilter || (exports.ChatUsersStateFilter = {}));
/** возможные варианты ошибок */
var ErrorType;
(function (ErrorType) {
    ErrorType["ValidationError"] = "ValidationError";
    ErrorType["LimitRequiredError"] = "LimitRequiredError";
    ErrorType["BadRequestError"] = "BadRequestError";
    ErrorType["UnauthorizedError"] = "UnauthorizedError";
    ErrorType["ForbiddenError"] = "ForbiddenError";
    ErrorType["NotFoundError"] = "NotFoundError";
    ErrorType["UnprocessableEntityError"] = "UnprocessableEntityError";
    ErrorType["TooManyRequestsError"] = "TooManyRequestsError";
    ErrorType["ClientClosedRequestError"] = "ClientClosedRequestError";
    ErrorType["TooManyInvitesError"] = "TooManyInvitesError";
    ErrorType["TooManyInvitesPerContactError"] = "TooManyInvitesPerContactError";
    ErrorType["UserWithSameEmailExists"] = "UserWithSameEmailExists";
    ErrorType["UserWithSamePhoneExists"] = "UserWithSamePhoneExists";
    ErrorType["MembersLimitExceded"] = "MembersLimitExceded";
    ErrorType["BadCredentials"] = "BAD_CREDENTIALS";
    ErrorType["UserInactive"] = "USER_INACTIVE";
    ErrorType["TooManyAttempts"] = "TOO_MANY_ATTEMPTS";
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));
/** тип файла */
var FileType;
(function (FileType) {
    /** документ */
    FileType["Document"] = "DOCUMENT";
    /** изображение */
    FileType["Image"] = "IMAGE";
})(FileType = exports.FileType || (exports.FileType = {}));
/** пол пользователя */
var Gender;
(function (Gender) {
    /** мужчина */
    Gender["Male"] = "MALE";
    /** женщина */
    Gender["Female"] = "FEMALE";
    /** не определен */
    Gender["Androgynous"] = "ANDROGYNOUS";
})(Gender = exports.Gender || (exports.Gender = {}));
/** статус колонки */
var GroupState;
(function (GroupState) {
    GroupState["Regular"] = "REGULAR";
    GroupState["Default"] = "DEFAULT";
    GroupState["DefaultHidden"] = "DEFAULT_HIDDEN";
})(GroupState = exports.GroupState || (exports.GroupState = {}));
/** локаль */
var Locale;
(function (Locale) {
    /** английская */
    Locale["En"] = "EN";
    /** русская */
    Locale["Ru"] = "RU";
})(Locale = exports.Locale || (exports.Locale = {}));
/** текущий шаг регистрации */
var RegistrationStep;
(function (RegistrationStep) {
    /** ожидается ввод регистрационнаго кода */
    RegistrationStep["VoucherFilling"] = "VOUCHER_FILLING";
    /** ожидает заполнения профиля */
    RegistrationStep["ProfileFilling"] = "PROFILE_FILLING";
})(RegistrationStep = exports.RegistrationStep || (exports.RegistrationStep = {}));
var SearchMessageWhere;
(function (SearchMessageWhere) {
    SearchMessageWhere["Issue"] = "ISSUE";
    SearchMessageWhere["Chat"] = "CHAT";
    SearchMessageWhere["PmChat"] = "PM_CHAT";
})(SearchMessageWhere = exports.SearchMessageWhere || (exports.SearchMessageWhere = {}));
/** статус подзадачи */
var TodoState;
(function (TodoState) {
    /** подзадача активна */
    TodoState["Active"] = "ACTIVE";
    /** подзадача закрыта */
    TodoState["Closed"] = "CLOSED";
})(TodoState = exports.TodoState || (exports.TodoState = {}));
//# sourceMappingURL=graphql.js.map