import { TelematicsData, TelematicsDataRequest } from "@/model/telematics";
import { apiSlice } from "./apiSlice";

export const recentTelematicsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRecentTelematicsData: builder.query<
            TelematicsData[], TelematicsDataRequest
        >({
            query: (body) => ({
                url: "/telematics/recent",
                method: "POST",
                body
            })
        })
    })
})

export const {
    useGetRecentTelematicsDataQuery,
    useLazyGetRecentTelematicsDataQuery,
} = recentTelematicsApi;
