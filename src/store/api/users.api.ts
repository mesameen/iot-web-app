import { apiSlice } from "./apiSlice"

export interface User {
    id: number,
    name: string,
    email: string
};

export const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => "/users",
            // providesTags: ["Users"],
        }),
        getUserById: builder.query<User, number>({
            query: (id) => "/users/${id}"
        })
    })
})

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
} = usersApi;