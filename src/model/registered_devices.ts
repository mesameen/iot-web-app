export interface RegisteredDevice {
    imei: string,
    tenant_group_id: string,
    tenant_id: string,
    status: number,
    parser_id: number,
}

export interface RegisteredDevicesRequest {
    imei?: string,
    tenant_group_id?: string,
    tenant_id?: string,
    from?: number,
    to?: number,
    page?: number,
    limit?: number
}
