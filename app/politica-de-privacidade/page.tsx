import type { Metadata } from "next"
import LegalPageLayout from "@/components/legal-page-layout"
import PrivacidadeContent from "./content"

export const metadata: Metadata = {
    title: "Política de Privacidade | WitDev",
    description: "Como a WitDev coleta, armazena e protege seus dados pessoais, em conformidade com a LGPD.",
}

export default function PoliticaPrivacidadePage() {
    return (
        <LegalPageLayout title="Política de Privacidade" lastUpdated="5 de março de 2026">
            <PrivacidadeContent />
        </LegalPageLayout>
    )
}
