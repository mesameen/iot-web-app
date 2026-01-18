import { apiSlice } from "./apiSlice";
import { ConnectionsData, ConnectionsRequest } from "@/model/connections";

export const connectionsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConnectionsData: builder.query<
            ConnectionsData[], ConnectionsRequest
        >({
            query: (body) => ({
                url: "/connections/getconnectionsdata",
                method: "POST",
                body
            })
        })
    })
})

export const {
    useGetConnectionsDataQuery,
    useLazyGetConnectionsDataQuery,
} = connectionsApi;