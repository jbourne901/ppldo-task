"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PpldoService = void 0;
const event_1 = require("../interfaces/event");
const log_1 = require("../utils/log");
class PpldoService {
    constructor(notification, controller) {
        this.controller = controller;
        this.notification = notification;
        this.handlerId = this.notification.subscribe(event_1.ALL_EVENTS, (event, payload) => this.handleEvent(event, payload));
        log_1.debug("PpldoService: started");
    }
    getEventNotificationMessage(event, payload) {
        return payload;
    }
    async handleEvent(event, payload) {
        const message = this.getEventNotificationMessage(event, payload);
        try {
            this.controller.sendMessage(message);
        }
        catch (err) {
            log_1.error(err);
        }
    }
}
exports.PpldoService = PpldoService;
//# sourceMappingURL=ppldo-service.js.map