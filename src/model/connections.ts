import z from "zod"

export interface ConnectionsRequest {
    imei?: string,
    tenantGroupId?: string,
    from?: number,
    to?: number,
    page?: number,
    limit?: number
}

export interface ConnectionsData {
    imei: string,
    tenant_group_id: string,
    tenant_id: string,
    connected_at_ms: number,
    disconnected_at_ms: number,
    duration: number,
    addr: number,
    listener_name: boolean,
    reason: string,
    sent: string,
    recv: string,
    action: string
}

