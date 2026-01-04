import z from "zod"

export interface TelematicsDataRequest {
    imei?: string,
    tenantGroupId?: string,
    from?: number,
    to?: number,
    page?: number,
    limit?: number
}

export interface TelematicsData {
    imei: string,
    device_datatime: number,
    insert_datetime: number,
    tenant_group_id: string,
    listener_datetime: number,
    latitude: number,
    longitude: number,
    speed: number,
    ignition: boolean
    gps_data?: GpsData | null,
    sensor_data?: SensorData | null,
    network_data?: NetworkData | null
}

export interface GpsData {
    speed: number,
    heading: number,
    altitude: number,
    latitude: number,
    longitude: number
}

export interface SensorData {
    rpm: number,
    speed: number,
    idling: number,
    ibutton: string,
    distance: number,
    eng_temp: number,
    ignition: boolean,
    battery_per: number,
    acc_pedal_per: number,
    fuel_level_per: number
}

export interface NetworkData {
    signal_per: number,
    network_type: string
}