"use client";
import { useGetUsersQuery, User } from "@/store/api/users.api"
import { IconLoader } from "@tabler/icons-react";
import { ReactNode, use } from "react";

interface UserInfoProps {
    user: User
}

const UserInfo = ({user}: UserInfoProps) => {
    return (
        <article>
            <h3>{user.name}</h3>
        </article>
    )
}

export const UsersList = () => {
    const {
        data: users = [],
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery();
    let content: ReactNode;
    if (isLoading) {
        content = <IconLoader></IconLoader>
    } else if (isSuccess) {
        content = users.map(user => <UserInfo key={user.id} user={user}></UserInfo>)
    } else if (isError) {
        content = <div>{"Error: "+ error.toString()}</div>
    }
    return (
        <section>
            <h2>Users</h2>
            {content}
        </section>
    )
}