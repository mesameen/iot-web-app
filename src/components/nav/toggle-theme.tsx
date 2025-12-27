"use client"
import { useAppTheme } from "@/providers/app-theme"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

export const ToggleAppTheme = () => {
    const { toggleAppTheme } = useAppTheme();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"} size={"icon"}>
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"></Sun>
                    <Moon className="h-[1.2rem] w-[1.2rem] absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"></Moon>
                    <span className="sr-only">Toggle Theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => toggleAppTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleAppTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleAppTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}