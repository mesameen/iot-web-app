"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { TelematicsDataRequest } from "@/model/telematics";
import { DateTimePicker } from "./datetime-picker";

interface Props {
  defaultValues?: TelematicsDataRequest;
  onSubmit: (req: TelematicsDataRequest) => void;
  loading?: boolean;
}

export function TelematicsFilters({ defaultValues, onSubmit, loading }: Props) {
  const [imei, setImei] = useState(defaultValues?.imei ?? "");
  const [tenantGroupId, setTenantGroupId] = useState(defaultValues?.tenantGroupId ?? "");
  const [from, setFrom] = useState<Date | undefined>(
    defaultValues?.from ? new Date(defaultValues.from) : undefined
  );
  const [to, setTo] = useState<Date | undefined>(
    defaultValues?.to ? new Date(defaultValues.to) : undefined
  );

  const handleSubmit = () => {
    onSubmit({
      imei: imei || undefined,
      tenantGroupId: tenantGroupId || undefined,
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
      <div className="flex flex-col gap-1">
        <Label>Tenant Group</Label>
        <Input value={tenantGroupId} onChange={(e) => setTenantGroupId(e.target.value)} />
      </div>

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
