export type Command = {
    id: number;                  // int64 → number (safe unless you exceed 2^53)
    imei: string;
    data: string;

    is_response_required: boolean;
    response: string;

    max_retries: number;         // int32
    retries_count: number;       // int32

    expires_at_ms: number;       // epoch millis

    tenant_group_id: string;
    tenant_id: string;

    sent_to_device: boolean;
    sent_at_ms: number;          // 0 if not sent
    response_at_ms: number;      // 0 if not responded
};

export interface GetCommandsRequest {
    imei?: string,
    tenant_group_id?: string,
    tenant_id?: string,
    from?: number,
    to?: number,
    page?: number,
    limit?: number
}
