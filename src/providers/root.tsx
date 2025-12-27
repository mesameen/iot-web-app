"use client"
import { PropsWithChildren } from "react";
import { NextThemeProvider } from "./next-theme";
import { AppThemeProvider } from "./app-theme";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Provider as StoreProvider } from "react-redux";
import { store } from "@/store";

export const RootProvider = ({ children }: PropsWithChildren) => {
    return (
        <StoreProvider store={store}>
            <NextThemeProvider>
                <AppThemeProvider>
                    <SidebarProvider>
                        {children}
                    </SidebarProvider>
                </AppThemeProvider>
            </NextThemeProvider>
        </StoreProvider>
    )
}