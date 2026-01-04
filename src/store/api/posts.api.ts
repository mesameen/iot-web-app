import { apiSlice } from "./apiSlice"

export interface Post {
    id: string,
    title: string,
    content: string,
    user: string
}

export const postsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query<Post[], void>({
            query: () => "/posts"
        }),
        getPostById: builder.query<Post, string>({
            query: (id) => "/posts/${id}"
        })
    })
})

export const {
    useGetPostsQuery,
    useGetPostByIdQuery,
} = postsApi
