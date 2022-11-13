"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
class SensorService {
    init() {
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
    activate() {
        this.measure();
        this.evaluate();
        return Promise.resolve(this.measurement);
    }
    getStatus() {
        return {
            temperature: this.measurement.currentValue,
            threshold: this.thermostat.temperatureThreshold,
            isHeating: this.thermostat.isHeating
        };
    }
    adjustThreshold(newThreshold) {
        if (typeof newThreshold === 'number') {
            this.thermostat.temperatureThreshold = newThreshold;
        }
    }
    measure() {
        this.measurement.previousValue = this.measurement.currentValue;
        let min, max;
        if (this.thermostat.isHeating) {
            min = this.thermostat.temperatureThreshold - 2;
            max = this.measurement.previousValue + 1;
        }
        else {
            min = this.measurement.previousValue - 1;
            max = this.thermostat.temperatureThreshold + 2;
        }
        this.measurement.currentValue = this.random(min, max);
        this.measurement.timestamp = new Date().getTime();
    }
    evaluate() {
        this.measurement.events = [];
        if (this.measurement.currentValue < this.thermostat.temperatureThreshold) {
            this.measurement.events.push('temperature_under_threshold');
            if (!this.thermostat.isHeating) {
                this.measurement.events.push('turning_on_heating');
                this.thermostat.isHeating = true;
            }
        }
        else {
            if (this.thermostat.isHeating) {
                this.measurement.events.push('temperature_reached_threshold');
                this.measurement.events.push('turning_off_heating');
                this.thermostat.isHeating = false;
            }
        }
    }
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
const Service = new SensorService();
exports.Service = Service;
