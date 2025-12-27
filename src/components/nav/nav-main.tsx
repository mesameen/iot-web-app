import { Icon } from "@tabler/icons-react"
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import Link from "next/link"

export const NavMain = ({ items }: {
    items: {
        title: string,
        url: string,
        icon?: Icon
    }[]
}) => {
    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link href={item.url}>
                                {item.icon && <item.icon></item.icon>}
                                <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
