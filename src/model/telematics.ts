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
    alt: number,
    lat: number,
    lon: number
}

export interface SensorData {
    rpm: number,
    speed: number,
    idling: number,
    Itag: string,
    dist: number,
    eng_temp: number,
    ign: boolean,
    btry: number,
    acc_pedal_per: number,
    fuelPercent: number
}

export interface NetworkData {
    signal_per: number,
    network_type: string
}