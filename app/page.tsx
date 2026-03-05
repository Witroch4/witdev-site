"use client"

import { motion, type Variants } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, BookOpen, MessageCircle, Server, Activity } from "lucide-react"

export default function Home() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  const projects = [
    {
      title: "Socialwise Chatwit",
      description: "Plataforma avançada de atendimento com IA e automação de redes sociais.",
      features: ["OAB Leads", "GPT-4 & DALL-E", "WhatsApp API", "IG Automations"],
      icon: MessageCircle,
      accent: "text-primary",
      color: "bg-primary/10 border-primary/20 hover:border-primary/50",
    },
    {
      title: "JusMonitorIA",
      description: "CRM Orquestrador e Monitoramento Processual com 4 Agentes de IA.",
      features: ["DataJud", "Multi-tenant", "LangGraph", "pgvector"],
      icon: Activity,
      accent: "text-secondary",
      color: "bg-secondary/10 border-secondary/20 hover:border-secondary/50",
    },
    {
      title: "studIA",
      description: "Biblioteca de Flashcards e sistema de Spaced Repetition de alta performance.",
      features: ["3D Flip Cards", "MathJax", "Markdown Sync"],
      icon: BookOpen,
      accent: "text-primary",
      color: "bg-primary/10 border-primary/20 hover:border-primary/50",
    },
    {
      title: "Chatwoot Ecosystem",
      description: "Customer support omnichannel open-source powered by Captain AI.",
      features: ["Open Source", "Omnichannel", "Help Center"],
      icon: Bot,
      accent: "text-secondary",
      color: "bg-secondary/10 border-secondary/20 hover:border-secondary/50",
    },
  ]

  const technologies = [
    "Next.js 15", "React 19", "Tailwind v4", "FastAPI (Async)",
    "PostgreSQL 17", "pgvector", "LangGraph", "LiteLLM",
    "Redis 7", "Taskiq", "WebSocket"
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
        <div className="h-[800px] w-[800px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-secondary/20 blur-[100px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

        {/* Navigation & Header Space */}
        <header className="flex w-full items-center justify-between py-6 mb-16 border-b border-border/40">
          <div className="flex items-center gap-2">
            <Server className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight text-foreground">
              Wit<span className="text-secondary">Dev</span>
            </span>
          </div>
          <a href="mailto:suporte@witdev.com.br">
            <Button variant="outline" className="border-border hover:bg-white/5 transition-colors">
              Contato
            </Button>
          </a>
        </header>

        {/* Hero Section */}
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          <motion.div variants={item}>
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/5 uppercase tracking-wider py-1 px-3">
              Corporate Technology Ecosystem
            </Badge>
          </motion.div>

          <motion.h1 variants={item} className="text-5xl font-extrabold tracking-tight sm:text-7xl mb-8 leading-[1.1]">
            Shaping the Future of <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Legal & Support</span> Tech.
          </motion.h1>

          <motion.p variants={item} className="text-lg text-muted-foreground sm:text-xl max-w-2xl mb-12">
            Engenharia de software de alta performance. Multi-tenant SaaS, inteligência artificial integrada, e arquiteturas corporativas robustas.
          </motion.p>
        </motion.section>

        {/* Projects Grid */}
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32"
        >
          <motion.div variants={item} className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Ecosystem Showcase</h2>
            <p className="text-muted-foreground mt-2">Nossas plataformas principais em produção.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => {
              const Icon = project.icon
              return (
                <motion.div key={index} variants={item} whileHover={{ scale: 1.02 }} className="h-full">
                  <Card className={`h-full border border-border/40 bg-card/40 backdrop-blur-sm transition-colors hover:border-primary/30 ${project.color} group`}>
                    <CardHeader>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-background border border-border/50 group-hover:scale-110 transition-transform">
                        <Icon className={`h-6 w-6 ${project.accent}`} />
                      </div>
                      <CardTitle className="text-2xl">{project.title}</CardTitle>
                      <CardDescription className="text-base mt-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.features.map(feature => (
                          <Badge key={feature} variant="secondary" className="bg-background/50 hover:bg-background/80">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Core Expertise */}
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32 mb-20"
        >
          <motion.div variants={item} className="rounded-2xl border border-border/40 bg-card/20 p-8 backdrop-blur-sm sm:p-12 relative overflow-hidden">
            {/* Tech ambient glow */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-[80px]" />

            <h3 className="text-2xl font-bold mb-6 relative z-10">Standardized Modern Stack</h3>
            <p className="text-muted-foreground mb-8 max-w-3xl relative z-10">
              Todos os sistemas compartilham uma arquitetura base sólida e escalável, alinhada com as melhores práticas da indústria para alta disponibilidade e desenvolvimento unificado.
            </p>

            <div className="flex flex-wrap gap-3 relative z-10">
              {technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="border-border/60 bg-background/40 py-1.5 px-4 text-sm hover:border-primary/50 transition-colors">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
              <div>
                <h4 className="font-semibold text-lg text-foreground">Acelere seu ecossistema corporativo</h4>
                <p className="text-sm text-muted-foreground">Criação de soluções complexas de ponta a ponta.</p>
              </div>
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all">
                Entre em contato <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </motion.section>

        {/* Footer */}
        <footer className="mt-20 border-t border-border/40 py-10 text-center flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} WitDev. Todos os direitos reservados.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="/politica-de-privacidade" className="hover:text-foreground transition-colors">Privacidade</a>
            <a href="/termos-de-uso" className="hover:text-foreground transition-colors">Termos de Uso</a>
            <a href="/politica-de-cookies" className="hover:text-foreground transition-colors">Cookies</a>
          </div>
        </footer>
      </main>
    </div>
  )
}
