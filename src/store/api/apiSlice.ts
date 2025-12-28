import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Post {
    id: string,
    title: string,
    content: string,
    user: string
}

// Single API slice object for an entire app
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://jsonplaceholder.typeicode.com"
    }),
    // endpoints represents operations and requests to the server
    endpoints: (builder) => ({
        // getPosts is a query operation which returns a data
        // the return value is a `Post[]` array, and it takes no arguments
        getPosts: builder.query<Post[], void>({
            // The url for the request is "/posts"
            query: () => {
                return {
                    url: "/posts",
                    method: "GET"
                }
            }
        })
    })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetPostsQuery } = apiSlice;
