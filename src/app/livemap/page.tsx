"use client";
import { Counter } from "@/components/counter/counter";
import { CustomMap } from "@/components/maps/custom-map";

export default function Telemetry() {
    return (
        <div>
            <h1>TelemetryData</h1>
            <Counter></Counter>
            <CustomMap></CustomMap>
        </div>
    )
}
// https://ui.shadcn.com/docs/components/data-table
