"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
class SubscriptionService {
    init() {
        this.subscriptions = [];
        return Promise.resolve();
    }
    subscribe(subscription) {
        if (!this.subscriptions.includes(subscription.consumerEndpoint)) {
            this.subscriptions.push(subscription.consumerEndpoint);
        }
    }
    unsubscribe(subscription) {
        if (this.subscriptions.includes(subscription.consumerEndpoint)) {
            this.subscriptions = this.subscriptions.filter((consumerEndpoint) => consumerEndpoint !== subscription.consumerEndpoint);
        }
    }
    forEach(callbackFn) {
        this.subscriptions.forEach((consumerEndpoint) => {
            callbackFn({ consumerEndpoint });
        });
    }
}
const Service = new SubscriptionService();
exports.Service = Service;
