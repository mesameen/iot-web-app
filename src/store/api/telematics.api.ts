import { TelematicsData, TelematicsDataRequest } from "@/model/telematics";
import { apiSlice } from "./apiSlice";

export const telematicsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTelematicsData: builder.query<
            TelematicsData[], TelematicsDataRequest
        >({
            query: (body) => ({
                url: "/telematics/gettelematicsdata",
                method: "POST",
                body
            })
        })
    })
})

export const {
    useGetTelematicsDataQuery,
    useLazyGetTelematicsDataQuery,
} = telematicsApi;
