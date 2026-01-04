"use client";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { ComponentProps } from "react"
import { TeamSwitcher } from "./team-switcher"
import { Command, GalleryVerticalEnd, Sun } from "lucide-react"
import { ToggleAppTheme } from "./toggle-theme"
import { NavMain } from "./nav-main"
import { IconChartBar, IconDashboard, IconFolder, IconHelp, IconListDetails, IconSearch, IconSettings, IconUsers } from "@tabler/icons-react";
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"

const data = {
    user: {
        name: "sandeep",
        email: "smsandeep@wiot360.com",
        avatar: "/avatars/shadcn.jpg"
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise"
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "/",
            icon: IconDashboard,
        },
        {
            title: "Telemetry",
            url: "/telemetry",
            icon: IconListDetails,
        },
        {
            title: "Payments",
            url: "/payments",
            icon: IconChartBar
        },
        {
            title: "Posts",
            url: "/posts",
            icon: IconFolder
        },
        {
            title: "Telematics",
            url: "/telematics",
            icon: IconUsers
        }
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "#",
            icon: IconSettings
        },
        {
            title: "Get Help",
            url: "#",
            icon: IconHelp
        },
        {
            title: "Search",
            url: "#",
            icon: IconSearch
        }
    ],
    projects: []
}

export const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                        >
                            <a href="#">
                                <div>
                                    <Command></Command>
                                </div>
                                <div>
                                    <span>WIOT360</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain}></NavMain>
                <NavSecondary items={data.navSecondary} className="mt-auto"></NavSecondary>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user}></NavUser>
            </SidebarFooter>
        </Sidebar>
    )
}

