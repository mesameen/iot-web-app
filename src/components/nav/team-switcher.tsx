import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"

export function TeamSwitcher({teams}: {
    teams: {
        name: string
        logo: React.ElementType
        plan: string
    }[]
}) {
    const [activeTeam, setActive] = useState(teams[0])
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton>
                            <div>
                                <activeTeam.logo></activeTeam.logo>
                            </div>
                            <div>
                                <span>{activeTeam.name}</span>
                                <span>{activeTeam.plan}</span>
                            </div>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>

                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}