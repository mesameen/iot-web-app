"use client"

import { PropsWithChildren } from "react"
import { ThemeProvider } from "next-themes";

export const NextThemeProvider = ({ children }: PropsWithChildren) => {
    return (
        <ThemeProvider
            attribute={"class"}
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
            storageKey="iot-web-app-theme"
        >{children}</ThemeProvider>
    )
}

