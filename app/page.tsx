"use client"

import { motion, type Variants } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import SplashCursor from "@/components/SplashCursor"
import LogoLoop from "@/components/LogoLoop"
import dynamic from "next/dynamic"

const Antigravity = dynamic(() => import("@/components/Antigravity"), { ssr: false })

/* ─────────────────────────────────────────
   Animation variants
───────────────────────────────────────── */
const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 22 } },
}

/* ─────────────────────────────────────────
   Products
───────────────────────────────────────── */
const products = [
  {
    name: "JusMonitorIA",
    tagline: "CRM Jurídico com 4 Agentes de IA",
    description:
      "Orquestração processual multitenancy com monitoramento DataJud, LangGraph, pgvector e IA autônoma para advocacia de alta performance.",
    features: ["DataJud", "LangGraph", "Multi-tenant", "pgvector", "Agentes IA"],
    logo: "/logos/jusmonitoria.png",
    href: "https://jusmonitoria.witdev.com.br/",
    accent: "#C9A84C",
    glow: "rgba(201,168,76,0.15)",
    border: "rgba(201,168,76,0.25)",
    hoverBorder: "rgba(201,168,76,0.55)",
  },
  {
    name: "ChatWit",
    tagline: "Atendimento Omnichannel com IA",
    description:
      "Plataforma avançada de atendimento ao cliente com automação inteligente, WhatsApp API, Instagram e múltiplos modelos de linguagem integrados.",
    features: ["WhatsApp API", "GPT-4o", "DALL-E", "IG Automations", "OAB Leads"],
    logo: "/logos/chatwit.svg",
    href: "https://chatwit.witdev.com.br/",
    accent: "#06B6D4",
    glow: "rgba(6,182,212,0.15)",
    border: "rgba(6,182,212,0.25)",
    hoverBorder: "rgba(6,182,212,0.55)",
  },
  {
    name: "SocialWise",
    tagline: "Social Intelligence Platform",
    description:
      "Plataforma de inteligência social para monitoramento, análise e automação de presença digital com insights gerados por IA generativa.",
    features: ["Social Monitor", "AI Insights", "Analytics", "Automação"],
    logo: null,
    href: "https://socialwise.witdev.com.br/",
    accent: "#A855F7",
    glow: "rgba(168,85,247,0.15)",
    border: "rgba(168,85,247,0.25)",
    hoverBorder: "rgba(168,85,247,0.55)",
  },
]

/* ─────────────────────────────────────────
   AI Models
───────────────────────────────────────── */
const aiModels = [
  {
    name: "ChatGPT",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
      </svg>
    ),
  },
  {
    name: "Gemini",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M11.04 0c-.26 1.76-.44 3.52-.88 5.24a11.93 11.93 0 0 1-4.88 7.04C3.92 13.56 2.48 14.4 0 14.96c2.04.44 3.8 1.16 5.28 2.28a12.1 12.1 0 0 1 4.72 7.2c.2.84.32 1.72.44 2.56H11.04a40 40 0 0 1 .8-5.08 11.88 11.88 0 0 1 4.8-7.16C18 13.52 19.52 12.76 22 12.24c-1.88-.44-3.56-1.12-5-2.16a12.16 12.16 0 0 1-5.04-7.52A33.8 33.8 0 0 1 11.36 0z"/>
      </svg>
    ),
  },
  {
    name: "Claude",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M17.304 1.33c-.48-.216-1.032.024-1.248.504L13.2 8.76 9.24 2.4a.96.96 0 0 0-1.656.96l4.32 7.44-7.44-4.32a.96.96 0 0 0-.96 1.656l6.36 3.96-7.08 2.856a.96.96 0 1 0 .72 1.776l7.44-3 .48 8.16a.96.96 0 1 0 1.92-.048l-.48-8.16 6.36 3.96a.96.96 0 1 0 .984-1.632l-6.36-3.96 7.44-3a.96.96 0 0 0-.744-1.776l-7.44 3 3-6.36a.96.96 0 0 0-.504-1.272z"/>
      </svg>
    ),
  },
  {
    name: "Perplexity",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M22.386 7.27h-4.87V.248L12 5.274 6.484.248V7.27H1.614v9.46h4.87v7.022L12 18.726l5.516 5.026V16.73h4.87V7.27zM13.1 1.931l3.316 3.02v2.319H13.1V1.931zm-2.2 0V7.27H7.584V4.95L10.9 1.931zM2.714 8.37h3.77v7.26h-3.77V8.37zm5.97 12.897v-2.04h2.216v3.774l-2.216-1.734zm5.284-.001l-2.168 1.686v-3.725h2.168v2.04zm2.2-5.636H7.832V8.37h8.336v7.26zm2.2 5.637l-2.2 1.687v-2.04h2.2v.353zm0-2.353h-2.2V9.47h-.002v-.001h2.202v9.445zm.002-9.444H7.832V7.27h8.538v2.2z"/>
      </svg>
    ),
  },
  {
    name: "Grok",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: "Mistral",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M0 0h4v4H0zM0 8h4v4H0zM0 16h4v4H0zM4 4h4v4H4zM4 12h4v4H4zM8 8h4v4H8zM8 0h4v4H8zM12 4h4v4h-4zM12 12h4v4h-4zM16 0h4v4h-4zM16 8h4v4h-4zM16 16h4v4h-4zM20 4h4v4h-4zM20 12h4v4h-4z"/>
      </svg>
    ),
  },
  {
    name: "Meta AI",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.18.291l2.46 3.963c.42.674.749 1.171 1.116 1.682.413.601.816 1.08 1.108 1.378.852.867 1.799 1.149 2.768 1.149 2.37 0 3.949-1.857 4.454-4.54.131-.689.205-1.444.205-2.251 0-1.993-.435-4.131-1.221-5.832C21.221 5.048 19.783 4.03 18 4.03c-1.539 0-2.894.839-4.22 2.494-.1.13-.3.395-.558.755l-.359.504-.36-.505c-1.165-1.629-2.36-2.758-3.527-3.094a5.01 5.01 0 0 0-.996-.154H6.915zm0 1.53c.21 0 .44.02.672.083 1.078.29 2.243 1.379 3.419 3.1l.427.6-.427.6C9.58 11.676 8.77 13.033 8.34 14.138c-.36.937-.562 1.86-.562 2.76 0 .327.022.636.066.93-.817-.51-1.397-1.196-1.672-2.06-.198-.635-.3-1.354-.3-2.129 0-2.295.635-4.76 1.688-6.51.606-1.009 1.306-1.6 2.355-1.6zm10.09 0c.855 0 1.576.469 2.254 1.43.757 1.077 1.263 2.64 1.263 4.35 0 .575-.044 1.085-.134 1.53-.342 1.799-1.12 2.73-2.12 2.73-.636 0-1.2-.214-1.778-.775-.282-.285-.633-.714-1.01-1.268l-2.45-3.948-.198-.317c.447-.66.816-1.188 1.063-1.503C14.24 6.47 15.343 5.56 17.005 5.56z"/>
      </svg>
    ),
  },
  {
    name: "DeepSeek",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M23.748 18.321a.534.534 0 0 1-.066.13c-.048.065-.12.122-.185.171-.097.072-.207.13-.317.188a4.64 4.64 0 0 1-.615.266 7.484 7.484 0 0 1-1.485.354c-.59.09-1.192.097-1.785.03-.293-.033-.584-.08-.87-.14a6.44 6.44 0 0 1-.834-.245 5.226 5.226 0 0 1-.742-.372 4.24 4.24 0 0 1-.617-.506c-.18-.182-.34-.38-.477-.592a3.79 3.79 0 0 1-.315-.677 3.567 3.567 0 0 1-.162-.74c-.024-.255-.02-.513.012-.768.031-.253.088-.502.17-.742.082-.24.186-.47.31-.688.123-.218.266-.425.425-.616.16-.19.335-.366.523-.526.189-.16.39-.304.602-.43.21-.127.432-.237.661-.327a4.35 4.35 0 0 1 .717-.195c.248-.044.5-.068.752-.07.253-.003.505.016.753.057.247.04.491.102.726.183.234.081.46.183.673.303.213.12.414.257.598.411.184.154.351.325.499.51.148.185.276.384.383.592.107.209.191.428.251.653.06.225.096.456.105.687.01.232-.004.463-.042.69a3.69 3.69 0 0 1-.176.674 3.57 3.57 0 0 1-.29.619c.077-.02.152-.046.225-.076.073-.03.143-.066.208-.108.065-.042.125-.09.178-.145.053-.054.099-.114.136-.179a.89.89 0 0 0 .08-.213.82.82 0 0 0 .017-.224.73.73 0 0 0-.047-.218.67.67 0 0 0-.11-.191.64.64 0 0 0-.17-.143.6.6 0 0 0-.21-.082.57.57 0 0 0-.222.007.54.54 0 0 0-.204.095.51.51 0 0 0-.147.166.48.48 0 0 0-.059.217.46.46 0 0 0 .04.22.44.44 0 0 0 .136.168c-.07.043-.143.081-.22.113a1.7 1.7 0 0 1-.237.074 1.84 1.84 0 0 1-.246.033 1.98 1.98 0 0 1-.25-.008 1.9 1.9 0 0 1-.246-.05 1.84 1.84 0 0 1-.233-.093 1.77 1.77 0 0 1-.21-.132 1.7 1.7 0 0 1-.18-.17 1.63 1.63 0 0 1-.146-.203 1.56 1.56 0 0 1-.108-.232 1.49 1.49 0 0 1-.067-.254 1.43 1.43 0 0 1-.022-.266c.003-.09.014-.179.032-.266.019-.088.045-.173.079-.255.033-.082.074-.16.122-.233.048-.073.103-.14.164-.2.06-.06.127-.114.199-.16.072-.047.148-.086.228-.117.08-.031.163-.054.247-.068.085-.014.17-.018.255-.013.085.005.169.02.25.044.081.024.16.057.233.099.073.041.14.091.2.148.06.057.112.12.156.19.044.07.079.145.105.222.026.077.043.157.05.238.007.08.005.162-.006.241-.011.08-.031.157-.059.231a1.66 1.66 0 0 1-.101.205l.117-.027c.04-.01.079-.022.117-.035.038-.013.075-.028.11-.045.035-.017.068-.036.1-.057.031-.021.06-.044.087-.069.027-.025.051-.052.073-.08.021-.03.04-.06.055-.093.015-.032.027-.066.035-.1.008-.034.012-.07.012-.105 0-.035-.004-.07-.012-.104a.645.645 0 0 0-.035-.098.585.585 0 0 0-.055-.09.534.534 0 0 0-.073-.078.49.49 0 0 0-.087-.063.45.45 0 0 0-.1-.044.41.41 0 0 0-.106-.022.38.38 0 0 0-.108.006.35.35 0 0 0-.101.036.32.32 0 0 0-.088.063.3.3 0 0 0-.066.087.28.28 0 0 0-.035.107.26.26 0 0 0 .008.111.24.24 0 0 0 .051.098.22.22 0 0 0 .086.068c-.03.012-.062.021-.094.027a.46.46 0 0 1-.099.006.49.49 0 0 1-.097-.017.52.52 0 0 1-.09-.038.55.55 0 0 1-.08-.057.59.59 0 0 1-.065-.074.62.62 0 0 1-.049-.088.66.66 0 0 1-.03-.099.7.7 0 0 1-.008-.104c0-.035.005-.07.014-.104.01-.034.022-.066.038-.097.016-.031.036-.06.059-.086.023-.026.049-.05.077-.07.029-.021.059-.038.091-.053.032-.014.066-.025.1-.031.035-.007.07-.01.106-.01zm-9.5-8.04c.28-.023.56-.013.837.03.276.044.547.12.803.225.256.107.496.244.713.407.217.163.41.353.575.565.165.212.3.445.402.691.101.247.168.505.198.77.03.265.024.532-.018.795-.043.263-.12.52-.228.764a4.008 4.008 0 0 1-.39.678 3.826 3.826 0 0 1-.533.563 3.663 3.663 0 0 1-.648.427 3.53 3.53 0 0 1-.733.267 3.408 3.408 0 0 1-.787.082 3.349 3.349 0 0 1-.776-.106 3.32 3.32 0 0 1-.703-.31 3.33 3.33 0 0 1-.586-.497 3.368 3.368 0 0 1-.439-.661 3.41 3.41 0 0 1-.269-.788 3.46 3.46 0 0 1-.077-.835 3.512 3.512 0 0 1 .115-.819 3.565 3.565 0 0 1 .313-.75 3.617 3.617 0 0 1 .488-.651 3.667 3.667 0 0 1 .636-.524 3.714 3.714 0 0 1 .757-.377 3.754 3.754 0 0 1 .847-.185zm-.228 1.13a2.32 2.32 0 0 0-.569.148 2.24 2.24 0 0 0-.501.29 2.17 2.17 0 0 0-.406.416 2.1 2.1 0 0 0-.29.52 2.05 2.05 0 0 0-.118.588 2.01 2.01 0 0 0 .048.593c.058.195.144.38.256.55.112.17.248.32.403.45.155.13.327.237.51.319.183.082.375.139.573.17.198.03.4.033.6.008.2-.025.394-.08.577-.163.183-.083.352-.195.499-.33.147-.136.271-.293.369-.466.098-.173.17-.36.213-.553.043-.194.054-.392.033-.587a2.33 2.33 0 0 0-.122-.567 2.38 2.38 0 0 0-.254-.5 2.42 2.42 0 0 0-.371-.415 2.45 2.45 0 0 0-.467-.309 2.47 2.47 0 0 0-.543-.186 2.48 2.48 0 0 0-.581-.077c-.001 0 .002 0 0 0zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/>
      </svg>
    ),
  },
  {
    name: "Cohere",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.086 5.5c1.46 0 2.648.543 3.415 1.458.68.81.962 1.905.962 3.042 0 1.137-.282 2.232-.962 3.042-.767.915-1.955 1.458-3.415 1.458-1.46 0-2.647-.543-3.414-1.458-.68-.81-.962-1.905-.962-3.042 0-1.137.282-2.232.962-3.042.767-.915 1.954-1.458 3.414-1.458zm5.836 1.084c.632 0 1.144.278 1.479.716.293.381.416.882.416 1.4 0 .518-.123 1.019-.416 1.4-.335.438-.847.716-1.479.716-.22 0-.428-.039-.617-.11.148-.558.226-1.311.226-1.906 0-.663-.095-1.348-.254-1.932.192-.176.41-.284.645-.284z"/>
      </svg>
    ),
  },
  {
    name: "LLaMA",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
      </svg>
    ),
  },
]

const technologies = [
  "Next.js 15", "React 19", "Tailwind v4", "FastAPI (Async)",
  "PostgreSQL 17", "pgvector", "LangGraph", "LiteLLM",
  "Redis 7", "Taskiq", "WebSocket", "Docker"
]

/* ─────────────────────────────────────────
   SocialWise logo text (no image available)
───────────────────────────────────────── */
function SocialWiseLogo() {
  return (
    <div
      className="flex items-center gap-1 text-lg font-bold tracking-tight"
      style={{ fontFamily: "var(--font-syne)" }}
    >
      <span className="text-white">Social</span>
      <span style={{ color: "#A855F7" }}>Wise</span>
    </div>
  )
}

/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "#080A0F", fontFamily: "var(--font-dm-sans)" }}>

      {/* ── Splash Cursor Effect ── */}
      <SplashCursor TRANSPARENT={true} BACK_COLOR={{ r: 0, g: 0, b: 0 }} />

      {/* ── Background mesh ── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #06B6D4, transparent 70%)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #7C3AED, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #C9A84C, transparent 70%)" }} />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px"
          }} />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <header className="flex w-full items-center justify-between py-8 mb-8 border-b border-white/[0.07]">
          <div className="flex items-center gap-3">
            <Image src="/logos/witdev.png" alt="WitDev" width={140} height={44} className="object-contain" priority />
          </div>
          <nav className="flex items-center gap-2">
            <a href="/admin">
              <Button variant="ghost" size="sm" className="hidden sm:flex text-white/40 hover:text-white/80 hover:bg-white/5 transition-all">
                Painel
              </Button>
            </a>
            <a href="mailto:suporte@witdev.com.br">
              <Button size="sm" className="border border-white/15 bg-white/5 hover:bg-white/10 text-white transition-all rounded-full px-5">
                Contato
              </Button>
            </a>
          </nav>
        </header>

        {/* ── Hero ── */}
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-5xl pt-12 pb-24"
        >
          <motion.div variants={item}>
            <Badge className="mb-8 border border-cyan-500/20 text-cyan-400 bg-cyan-500/5 uppercase tracking-[0.2em] text-xs py-1.5 px-4 rounded-full">
              Corporate Technology Ecosystem
            </Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl lg:text-[5.5rem] font-extrabold tracking-tight leading-[1.05] mb-8"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            <span className="text-white">Shaping the Future of</span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #06B6D4 0%, #A855F7 50%, #C9A84C 100%)" }}
            >
              Legal &amp; Support
            </span>
            <span className="text-white"> Tech.</span>
          </motion.h1>

          <motion.p variants={item} className="text-lg text-white/50 max-w-2xl mb-12 leading-relaxed">
            Engenharia de software de alta performance. Multi-tenant SaaS, inteligência artificial integrada e arquiteturas corporativas robustas — da infraestrutura ao produto final.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <a href="mailto:suporte@witdev.com.br">
              <Button
                size="lg"
                className="rounded-full font-semibold px-8 text-black transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #06B6D4, #A855F7)",
                  boxShadow: "0 0 30px rgba(6,182,212,0.25)"
                }}
              >
                Entre em contato <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a href="#products">
              <Button variant="ghost" size="lg" className="rounded-full text-white/60 hover:text-white border border-white/10 hover:bg-white/5 px-8 transition-all">
                Ver Produtos <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </motion.div>
        </motion.section>

        {/* ── Products ── */}
        <motion.section
          id="products"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-32"
        >
          <motion.div variants={item} className="mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-white/30 mb-3">Plataformas</p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Ecosystem Showcase
            </h2>
            <p className="text-white/40 mt-2 text-base">Nossas plataformas principais em produção.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.a
                key={i}
                variants={item}
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group block rounded-2xl p-6 sm:p-8 relative overflow-hidden cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)`,
                  border: `1px solid ${product.border}`,
                  boxShadow: `0 0 0 0 ${product.glow}`,
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = product.hoverBorder
                  ;(e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${product.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = product.border
                  ;(e.currentTarget as HTMLElement).style.boxShadow = "none"
                }}
              >
                {/* Background glow */}
                <div
                  className="absolute top-0 right-0 w-48 h-48 rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[60px]"
                  style={{ background: product.glow }}
                />

                {/* Logo */}
                <div className="mb-6 h-14 flex items-center">
                  {product.logo ? (
                    <Image
                      src={product.logo}
                      alt={product.name}
                      width={product.name === "JusMonitorIA" ? 140 : 120}
                      height={50}
                      className="object-contain max-h-12"
                    />
                  ) : (
                    <SocialWiseLogo />
                  )}
                </div>

                {/* Tagline */}
                <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: product.accent }}>
                  {product.tagline}
                </p>

                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.features.map(f => (
                    <span
                      key={f}
                      className="text-xs px-2.5 py-1 rounded-full border"
                      style={{
                        color: product.accent,
                        borderColor: `${product.accent}30`,
                        background: `${product.accent}08`
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <div className="flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all" style={{ color: product.accent }}>
                  Acessar plataforma <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* ── AI Marquee ── */}
        <section className="mb-32 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="px-4 sm:px-6 lg:px-8 mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-white/30 mb-2">Tecnologia</p>
            <h3
              className="text-2xl sm:text-3xl font-bold text-white"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Powered by Leading AI Models
            </h3>
            <p className="text-white/40 text-sm mt-1">Integração com os principais modelos de linguagem do mercado.</p>
          </div>

          <LogoLoop
            logos={aiModels.map(ai => ({
              node: (
                <span className="flex items-center gap-3 py-4 px-6 rounded-xl border border-white/6 bg-white/2">
                  <span className="text-white/40">{ai.svg}</span>
                  <span
                    className="text-white/60 text-sm font-medium tracking-wide"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {ai.name}
                  </span>
                </span>
              ),
            }))}
            speed={80}
            gap={24}
            logoHeight={52}
            pauseOnHover
            fadeOut
            fadeOutColor="#080A0F"
            ariaLabel="AI models we integrate with"
          />
        </section>

        {/* ── Tech Stack ── */}
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-32"
        >
          <motion.div
            variants={item}
            className="rounded-2xl border border-white/[0.07] relative overflow-hidden p-8 sm:p-12"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 100%)" }}
          >
            <div className="absolute top-0 right-0 w-80 h-80 -translate-y-1/4 translate-x-1/4 rounded-full blur-[100px] opacity-30"
              style={{ background: "radial-gradient(circle, #7C3AED, transparent 70%)" }} />

            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.25em] text-white/30 mb-3">Arquitetura</p>
              <h3
                className="text-2xl sm:text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Standardized Modern Stack
              </h3>
              <p className="text-white/45 mb-10 max-w-2xl text-sm leading-relaxed">
                Todos os sistemas compartilham uma arquitetura base sólida e escalável, alinhada com as melhores práticas da indústria para alta disponibilidade e desenvolvimento unificado.
              </p>

              <div className="flex flex-wrap gap-2.5 mb-12">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3.5 py-1.5 rounded-full border border-white/10 text-white/50 hover:border-cyan-500/30 hover:text-cyan-300 transition-colors cursor-default"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-8 border-t border-white/[0.07] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <h4 className="font-semibold text-lg text-white" style={{ fontFamily: "var(--font-syne)" }}>
                    Acelere seu ecossistema corporativo
                  </h4>
                  <p className="text-sm text-white/40 mt-1">Criação de soluções complexas de ponta a ponta.</p>
                </div>
                <a href="mailto:suporte@witdev.com.br">
                  <Button
                    size="lg"
                    className="rounded-full font-semibold px-8 text-black transition-all duration-300 shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #06B6D4, #7C3AED)",
                      boxShadow: "0 0 24px rgba(6,182,212,0.2)"
                    }}
                  >
                    Entre em contato <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.section>

      </main>

      {/* ── Footer with Antigravity ── */}
      <footer className="relative z-10 mt-0">
        {/* Antigravity particle background */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Antigravity
            count={200}
            magnetRadius={12}
            ringRadius={8}
            waveSpeed={0.3}
            waveAmplitude={0.8}
            particleSize={1.5}
            lerpSpeed={0.06}
            color="#06B6D4"
            autoAnimate
            particleVariance={0.8}
            rotationSpeed={0.1}
            depthFactor={0.6}
            pulseSpeed={2}
            particleShape="sphere"
            fieldStrength={8}
          />
        </div>

        {/* Gradient fade from page bg into footer */}
        <div className="absolute top-0 left-0 right-0 h-32 z-1 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, #080A0F, transparent)" }} />

        {/* Footer content */}
        <div className="relative z-2 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-10">

          {/* CTA banner */}
          <div className="text-center mb-20">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Vamos construir o{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #06B6D4, #A855F7)" }}
              >
                futuro
              </span>{" "}
              juntos?
            </h2>
            <p className="text-white/40 max-w-lg mx-auto mb-8 text-base leading-relaxed">
              Da concepção à produção. Engenharia de software de ponta para ecossistemas corporativos complexos.
            </p>
            <a href="mailto:suporte@witdev.com.br">
              <Button
                size="lg"
                className="rounded-full font-semibold px-10 text-black transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #06B6D4, #A855F7)",
                  boxShadow: "0 0 40px rgba(6,182,212,0.3)"
                }}
              >
                Iniciar conversa <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>

          {/* Main footer grid */}
          <div className="border-t border-white/[0.07] pt-14 grid grid-cols-2 sm:grid-cols-4 gap-10 mb-14">

            {/* Brand column */}
            <div className="col-span-2 sm:col-span-1">
              <Image src="/logos/witdev.png" alt="WitDev" width={110} height={36} className="object-contain mb-4 opacity-60" />
              <p className="text-white/30 text-sm leading-relaxed max-w-55">
                Engenharia de software corporativa com inteligência artificial integrada.
              </p>
            </div>

            {/* Products */}
            <div>
              <h4
                className="text-xs uppercase tracking-[0.2em] text-white/50 mb-5 font-semibold"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Produtos
              </h4>
              <ul className="space-y-3">
                {products.map(p => (
                  <li key={p.name}>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/35 hover:text-white/80 transition-colors flex items-center gap-1.5 group"
                    >
                      {p.name}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tecnologias */}
            <div>
              <h4
                className="text-xs uppercase tracking-[0.2em] text-white/50 mb-5 font-semibold"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Stack
              </h4>
              <ul className="space-y-3 text-sm text-white/35">
                <li>Next.js / React</li>
                <li>FastAPI / Python</li>
                <li>PostgreSQL / pgvector</li>
                <li>LangGraph / LiteLLM</li>
                <li>Docker / Swarm</li>
              </ul>
            </div>

            {/* Contato & Legal */}
            <div>
              <h4
                className="text-xs uppercase tracking-[0.2em] text-white/50 mb-5 font-semibold"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Empresa
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:suporte@witdev.com.br" className="text-sm text-white/35 hover:text-white/80 transition-colors">
                    suporte@witdev.com.br
                  </a>
                </li>
                <li>
                  <a href="/politica-de-privacidade" className="text-sm text-white/35 hover:text-white/80 transition-colors">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="/termos-de-uso" className="text-sm text-white/35 hover:text-white/80 transition-colors">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="/politica-de-cookies" className="text-sm text-white/35 hover:text-white/80 transition-colors">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/20">
              © {new Date().getFullYear()} WitDev. Todos os direitos reservados.
            </p>
            <p className="text-xs text-white/15">
              Feito com engenharia de precisão em Brasília, Brasil.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
