export interface RegisteredDevice {
    imei: string,
    tenant_id: number,
    status: number,
    parser_id: number,
}

export interface RegisteredDevicesRequest {
    imei?: string,
    tenant_id?: number,
    from?: number,
    to?: number,
    page?: number,
    limit?: number
}
