export interface BulbColor {
    red: number,
    green: number,
    blue: number
}

export interface BulbState {
    on: boolean,
    dim: number,
    color: BulbColor
}

class StateService {
    private state: BulbState;

    public init(): Promise<void> {
        this.state = {
            on: false,
            dim: 100,
            color: {
                red: 240,
                green: 240,
                blue: 240
            }
        };
        return Promise.resolve();
    }

    public getState(): BulbState {
        return this.state;
    }

    public setState(newState: BulbState): void {
        this.state = newState;
    }
}

const Service = new StateService();

export { Service };