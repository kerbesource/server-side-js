export interface Subscription {
    consumerEndpoint: string;
}

class SubscriptionService {
    private subscriptions: string[];

    public init(): Promise<void> {
        this.subscriptions = [];
        return Promise.resolve();
    }

    public subscribe(subscription: Subscription): void {
        if (!this.subscriptions.includes(subscription.consumerEndpoint)) {
            this.subscriptions.push(subscription.consumerEndpoint);
        }
    }

    public unsubscribe(subscription: Subscription): void {
        if (this.subscriptions.includes(subscription.consumerEndpoint)) {
            this.subscriptions = this.subscriptions.filter((consumerEndpoint: string) => consumerEndpoint !== subscription.consumerEndpoint);
        }
    }

    public forEach(callbackFn: (subscription: Subscription) => void): void {
        this.subscriptions.forEach((consumerEndpoint: string) => {
            callbackFn({ consumerEndpoint });
        });
    }
}

const Service = new SubscriptionService();

export { Service };