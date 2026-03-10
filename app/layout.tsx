import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { Syne, DM_Sans } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const syne = Syne({ subsets: ["latin"], display: "swap", variable: "--font-syne" })
const dmSans = DM_Sans({ subsets: ["latin"], display: "swap", variable: "--font-dm-sans" })

export const metadata: Metadata = {
  title: "WitDev Ecosystem | Shaping the Future of Legal & Support Tech",
  description: "Creator of intelligent, multi-tenant platforms powered by advanced AI and modern frontend architectures.",
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.ico" },
    ],
    apple: [
      { url: "/favicon/apple-icon-57x57.png", sizes: "57x57" },
      { url: "/favicon/apple-icon-60x60.png", sizes: "60x60" },
      { url: "/favicon/apple-icon-72x72.png", sizes: "72x72" },
      { url: "/favicon/apple-icon-76x76.png", sizes: "76x76" },
      { url: "/favicon/apple-icon-114x114.png", sizes: "114x114" },
      { url: "/favicon/apple-icon-120x120.png", sizes: "120x120" },
      { url: "/favicon/apple-icon-144x144.png", sizes: "144x144" },
      { url: "/favicon/apple-icon-152x152.png", sizes: "152x152" },
      { url: "/favicon/apple-icon-180x180.png", sizes: "180x180" },
    ],
  },
  manifest: "/favicon/manifest.json",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${syne.variable} ${dmSans.variable} font-sans min-h-screen bg-background text-foreground antialiased`}>
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
