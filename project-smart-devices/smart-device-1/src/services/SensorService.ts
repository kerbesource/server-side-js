interface Thermostat {
    temperatureThreshold: number,
    isHeating: boolean
}

export interface SensorMeasurement {
    currentValue: number,
    previousValue: number,
    events: string[],
    timestamp: number
}

export interface SensorStatus {
    temperature: number,
    threshold: number,
    isHeating: boolean
}

class SensorService {
    private thermostat: Thermostat;
    private measurement: SensorMeasurement;

    public init(): Promise<void> {
        this.thermostat = {
            temperatureThreshold: 20,
            isHeating: false
        };
        this.measurement = {
            currentValue: this.thermostat.temperatureThreshold,
            previousValue: this.thermostat.temperatureThreshold,
            events: [],
            timestamp: new Date().getTime()
        };
        return Promise.resolve();
    }

    public activate(): Promise<SensorMeasurement> {
        this.measure();
        this.evaluate();
        return Promise.resolve(this.measurement);
    }

    public getStatus(): SensorStatus {
        return {
            temperature: this.measurement.currentValue,
            threshold: this.thermostat.temperatureThreshold,
            isHeating: this.thermostat.isHeating
        };
    }

    public adjustThreshold(newThreshold: number): void {
        if (typeof newThreshold === 'number') {
            this.thermostat.temperatureThreshold = newThreshold;
        }
    }

    private measure(): void {
        this.measurement.previousValue = this.measurement.currentValue;
        let min, max;
        if (this.thermostat.isHeating) {
            min = this.thermostat.temperatureThreshold - 2;
            max = this.measurement.previousValue + 1;
        } else {
            min = this.measurement.previousValue - 1;
            max = this.thermostat.temperatureThreshold + 2;
        }
        this.measurement.currentValue = this.random(min, max);
        this.measurement.timestamp = new Date().getTime();
    }

    private evaluate(): void {
        this.measurement.events = [];
        if (this.measurement.currentValue < this.thermostat.temperatureThreshold) {
            this.measurement.events.push('temperature_under_threshold');
            if (!this.thermostat.isHeating) {
                this.measurement.events.push('turning_on_heating');
                this.thermostat.isHeating = true;
            }
        } else {
            if (this.thermostat.isHeating) {
                this.measurement.events.push('temperature_reached_threshold');
                this.measurement.events.push('turning_off_heating');
                this.thermostat.isHeating = false;
            }
        }
    }

    private random(min: number, max: number): number {
        return Math.floor(
            Math.random() * (max - min + 1) + min
        );
    }
}

const Service = new SensorService();

export { Service };