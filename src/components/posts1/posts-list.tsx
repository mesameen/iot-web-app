"use client"
import { Post, useGetPostsQuery } from "@/store/api/posts.api";
import { IconLoader } from "@tabler/icons-react";
import Link from "next/link";
import { ReactNode } from "react";

interface PostExcerptProps {
    post: Post
}

function PostExcerpt({post}: PostExcerptProps) {
    return (
        <article key={post.id}>
            <h3>
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </h3>
            <div>
                <p>{post.content?.substring(0, 100)}</p>
            </div>
        </article>
    )
}

export const PostsList = () => {
    const {
        data: posts = [],
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery();
    let content: ReactNode;
    if (isLoading) {
        content = <IconLoader></IconLoader>
    } else if (isSuccess) {
        content = posts.map(post => <PostExcerpt post={post} key={post.id}></PostExcerpt>)
    } else if (isError) {
        content = <div>{"Error: "+ error.toString()}</div>
    }
    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    )
}