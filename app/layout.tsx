import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "WitDev Ecosystem | Shaping the Future of Legal & Support Tech",
  description: "Creator of intelligent, multi-tenant platforms powered by advanced AI and modern frontend architectures.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <Script src="/tracker.js" data-site="witdev" strategy="afterInteractive" />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          themes={["dark"]} // Forcing dark theme aesthetic
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
