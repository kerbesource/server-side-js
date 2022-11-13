export interface Report {
    deviceId: string,
    value: any
}

export interface DeviceManifest {
    deviceId: string,
    deviceType: string,
    deviceName: string
}

export interface DeviceDescriptor {
    url: string,
    manifest: DeviceManifest,
    status: any | null
}

export interface ThermostatStatus {
    temperature: number,
    threshold: number,
    isHeating: boolean
}

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