import { apiSlice } from "./apiSlice";
import { ConnectionsData, ConnectionsRequest } from "@/model/connections";

export const recentConnectionsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRecentConnectionsData: builder.query<
            ConnectionsData[], ConnectionsRequest
        >({
            query: (body) => ({
                url: "/connections/recent",
                method: "POST",
                body
            })
        })
    })
})

export const {
    useGetRecentConnectionsDataQuery,
    useLazyGetRecentConnectionsDataQuery,
} = recentConnectionsApi;