import { apiSlice } from "./apiSlice";
import { Command, GetCommandsRequest } from "@/model/commands";

export const commandsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCommands: builder.query<
            Command[], GetCommandsRequest
        >({
            query: (body) => ({
                url: "/commands/getcommands",
                method: "POST",
                body
            })
        })
    })
})

export const {
    useGetCommandsQuery,
    useLazyGetCommandsQuery
} = commandsApi;
