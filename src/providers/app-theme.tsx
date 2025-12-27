"use client"
import { useTheme } from "next-themes";
import { createContext, PropsWithChildren, useContext, useState } from "react"

type AppThemeContextType = {
    appTheme: string | undefined,
    toggleAppTheme: (appTheme: string) => void
}

const AppThemeContext = createContext<AppThemeContextType | null>(null);

export const AppThemeProvider = ({ children }: PropsWithChildren) => {
    const { theme, setTheme } = useTheme();
    const toggleAppTheme = (appTheme: string) => {
        setTheme(appTheme);
    }
    return (
        <AppThemeContext.Provider
            value={{ appTheme: theme, toggleAppTheme }}
        >{children}</AppThemeContext.Provider>
    )
}

export const useAppTheme = () => {
    let ctx = useContext(AppThemeContext);
    if (!ctx) throw new Error("useAppTheme must be used inside ThemeProvider")
    return ctx
}