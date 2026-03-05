import type { Metadata } from "next"
import LegalPageLayout from "@/components/legal-page-layout"
import TermosContent from "./content"

export const metadata: Metadata = {
    title: "Termos de Uso | WitDev",
    description: "Termos e Condições de Uso dos serviços e plataformas do ecossistema WitDev.",
}

export default function TermosDeUsoPage() {
    return (
        <LegalPageLayout title="Termos de Uso" lastUpdated="5 de março de 2026">
            <TermosContent />
        </LegalPageLayout>
    )
}
