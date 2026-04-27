"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { DateTimePicker } from "./datetime-picker";
import { RegisteredDevicesRequest } from "@/model/registered_devices";

interface Props {
    defaultValues?: RegisteredDevicesRequest;
    onSubmit: (req: RegisteredDevicesRequest) => void;
    loading?: boolean;
}

export function RegisteredDevicesFilters({ defaultValues, onSubmit, loading }: Props) {
    const [imei, setImei] = useState(defaultValues?.imei ?? "");
    const [from, setFrom] = useState<Date | undefined>(
        defaultValues?.from ? new Date(defaultValues.from) : new Date()
    );
    const [to, setTo] = useState<Date | undefined>(
        defaultValues?.to ? new Date(defaultValues.to) : new Date(new Date().getTime() - 10 * 60 * 1000)
    );

    const handleSubmit = () => {
        onSubmit({
            imei: imei || undefined,
            from: from?.getTime(),
            to: to?.getTime(),
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            {/* IMEI */}
            <div className="flex flex-col gap-1">
                <Label>IMEI</Label>
                <Input value={imei} onChange={(e) => setImei(e.target.value)} />
            </div>

            {/* Tenant Group */}
            {/* <div className="flex flex-col gap-1">
                <Label>Tenant Group</Label>
                <Input value={tenantGroupId} onChange={(e) => setTenantGroupId(e.target.value)} />
            </div> */}

            {/* From DateTime */}
            <DateTimePicker label="From" defaultValue={from} onChange={setFrom} />

            {/* To DateTime */}
            <DateTimePicker label="To" defaultValue={to} onChange={setTo} />

            {/* Submit Button */}
            <div className="flex items-end">
                <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Loading…" : "Fetch"}
                </Button>
            </div>
        </div>
    );
}
