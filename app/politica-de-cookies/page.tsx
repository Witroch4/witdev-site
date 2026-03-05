import type { Metadata } from "next"
import LegalPageLayout from "@/components/legal-page-layout"
import CookiesContent from "./content"

export const metadata: Metadata = {
    title: "Política de Cookies | WitDev",
    description: "Entenda como a WitDev utiliza cookies e tecnologias semelhantes em suas plataformas.",
}

export default function PoliticaCookiesPage() {
    return (
        <LegalPageLayout title="Política de Cookies" lastUpdated="5 de março de 2026">
            <CookiesContent />
        </LegalPageLayout>
    )
}
