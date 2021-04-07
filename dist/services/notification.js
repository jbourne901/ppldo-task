"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const event_1 = require("../interfaces/event");
const uuid_1 = require("../utils/uuid");
const log_1 = require("../utils/log");
class NotificationService {
    constructor() {
        this.eventHandlers = new Map();
    }
    subscribe(event, handler) {
        const handlerId = uuid_1.uuid();
        const handlers = this.eventHandlers.get(event) || new Map();
        handlers.set(handlerId, handler);
        this.eventHandlers.set(event, handlers);
        return handlerId;
    }
    unsubscribe(event, handlerId) {
        const handlers = this.eventHandlers.get(event);
        if (handlers) {
            handlers.delete(handlerId);
            if (handlers.size === 0) {
                this.eventHandlers.delete(event);
            }
        }
    }
    async notify(event, eventData) {
        try {
            Promise.all([
                this.notifyEvent(event, eventData),
                this.notifyEvent(event_1.ALL_EVENTS, eventData)
            ]);
        }
        catch (err) {
            log_1.error(err);
        }
    }
    async notifyEvent(event, eventData) {
        const handlers = this.eventHandlers.get(event);
        if (!handlers) {
            log_1.warn("No handlers found for event", event);
            return;
        }
        await handlers.forEach((handler) => {
            try {
                handler(event, eventData);
            }
            catch (err) {
                log_1.error(err);
            }
        });
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.js.map