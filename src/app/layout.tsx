import { Navbar } from "@/components/nav/nav-bar";
import "./globals.css";
import { RootProvider } from "@/providers/root";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/nav/app-sidebar";
import { SiteHeader } from "@/components/nav/site-header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider>
          <SidebarProvider
            style={
              {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
              } as React.CSSProperties
            }
          >
            <AppSidebar variant="inset" />
            <SidebarInset>
              <SiteHeader></SiteHeader>

              {children}
            </SidebarInset>
          </SidebarProvider>
        </RootProvider>
      </body>
    </html>
  );
}
