import { ToggleAppTheme } from "./toggle-theme";

export function Navbar() {
    return (
        <nav
            className="w-full h-16 border-b flex items-center justify-between px-16 bg-background"
        >
            <h1>My App</h1>
            <ToggleAppTheme></ToggleAppTheme>
        </nav>
    )
}