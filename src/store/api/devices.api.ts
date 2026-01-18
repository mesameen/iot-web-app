import { RegisteredDevice, RegisteredDevicesRequest } from "@/model/registered_devices";
import { apiSlice } from "./apiSlice";

export const registeredDevicesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRegisteredDevices: builder.query<
            RegisteredDevice[], RegisteredDevicesRequest
        >({
            query: (body) => ({
                url: "/devices/getdevices",
                method: "POST",
                body
            })
        })
    })
})

export const {
    useGetRegisteredDevicesQuery,
    useLazyGetRegisteredDevicesQuery,
} = registeredDevicesApi;
