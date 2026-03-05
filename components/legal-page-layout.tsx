"use client"

import { motion, type Variants } from "framer-motion"
import { ArrowLeft, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface LegalPageLayoutProps {
    title: string
    lastUpdated: string
    children: React.ReactNode
}

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.06 },
    },
}

const item: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 28 } },
}

export { item as legalItemVariant }

export default function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-background">
            {/* Background Ambience */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
                <div className="h-[600px] w-[600px] rounded-full bg-primary/20 blur-[120px]" />
                <div className="h-[400px] w-[400px] -translate-x-1/2 translate-y-1/4 rounded-full bg-secondary/20 blur-[100px]" />
            </div>

            <main className="relative z-10 mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Header */}
                <header className="flex w-full items-center justify-between py-6 mb-12 border-b border-border/40">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Server className="h-7 w-7 text-primary" />
                        <span className="text-lg font-bold tracking-tight text-foreground">
                            Wit<span className="text-secondary">Dev</span>
                        </span>
                    </Link>
                    <Link href="/">
                        <Button variant="outline" size="sm" className="border-border hover:bg-white/5 transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar
                        </Button>
                    </Link>
                </header>

                {/* Content */}
                <motion.article
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="prose-legal"
                >
                    <motion.div variants={item}>
                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-2 text-foreground">
                            {title}
                        </h1>
                        <p className="text-sm text-muted-foreground mb-10 border-b border-border/40 pb-6">
                            Última atualização: {lastUpdated}
                        </p>
                    </motion.div>

                    <div className="space-y-8 text-muted-foreground leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary/80 [&_strong]:text-foreground [&_p]:mb-4">
                        {children}
                    </div>
                </motion.article>

                {/* Footer */}
                <footer className="mt-20 border-t border-border/40 py-8 text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} WitDev. Todos os direitos reservados.</p>
                </footer>
            </main>
        </div>
    )
}
