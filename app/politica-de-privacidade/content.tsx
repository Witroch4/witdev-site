"use client"

import { motion } from "framer-motion"
import { legalItemVariant } from "@/components/legal-page-layout"

export default function PrivacidadeContent() {
    const v = legalItemVariant
    return (
        <>
            <motion.section variants={v}>
                <h2>1. Introdução</h2>
                <p>
                    A <strong>WitDev</strong> (&quot;nós&quot;, &quot;nosso&quot;) respeita sua privacidade e está comprometida com a
                    proteção dos seus dados pessoais. Esta Política de Privacidade descreve como coletamos, utilizamos,
                    armazenamos e compartilhamos suas informações quando você acessa nossas plataformas e serviços, em
                    conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — <strong>LGPD</strong>).
                </p>
            </motion.section>

            <motion.section variants={v}>
                <h2>2. Dados que Coletamos</h2>
                <p>Podemos coletar os seguintes tipos de dados pessoais:</p>

                <h3>2.1. Dados fornecidos por você</h3>
                <ul>
                    <li>Nome completo, e-mail e telefone (cadastro)</li>
                    <li>Dados profissionais (número da OAB, escritório, especialidades)</li>
                    <li>Informações de pagamento (quando aplicável)</li>
                    <li>Conteúdo gerado nas plataformas (mensagens, documentos, anotações)</li>
                </ul>

                <h3>2.2. Dados coletados automaticamente</h3>
                <ul>
                    <li>Endereço IP e geolocalização aproximada</li>
                    <li>Tipo de navegador e sistema operacional</li>
                    <li>Páginas visitadas, tempo de permanência e interações</li>
                    <li>Identificadores de dispositivo</li>
                    <li>Cookies e tecnologias semelhantes (veja nossa <a href="/politica-de-cookies">Política de Cookies</a>)</li>
                </ul>
            </motion.section>

            <motion.section variants={v}>
                <h2>3. Finalidade do Tratamento</h2>
                <p>Utilizamos seus dados pessoais para:</p>
                <ul>
                    <li><strong>Prestação de serviços:</strong> operar, manter e melhorar nossas plataformas</li>
                    <li><strong>Comunicação:</strong> enviar notificações, atualizações e suporte técnico</li>
                    <li><strong>Personalização:</strong> adaptar a experiência do usuário e recomendações de IA</li>
                    <li><strong>Segurança:</strong> detectar fraudes, abusos e proteger nossos sistemas</li>
                    <li><strong>Obrigações legais:</strong> cumprir exigências regulatórias e judiciais</li>
                    <li><strong>Analytics:</strong> analisar métricas de uso para aprimorar os serviços</li>
                </ul>
            </motion.section>

            <motion.section variants={v}>
                <h2>4. Base Legal para o Tratamento</h2>
                <p>O tratamento dos seus dados pessoais é realizado com base em:</p>
                <ul>
                    <li><strong>Consentimento</strong> (art. 7º, I, LGPD) — quando você nos autoriza expressamente</li>
                    <li><strong>Execução de contrato</strong> (art. 7º, V) — para prestar os serviços contratados</li>
                    <li><strong>Legítimo interesse</strong> (art. 7º, IX) — para melhorar nossos serviços e segurança</li>
                    <li><strong>Cumprimento de obrigação legal</strong> (art. 7º, II) — quando exigido por lei</li>
                </ul>
            </motion.section>

            <motion.section variants={v}>
                <h2>5. Compartilhamento de Dados</h2>
                <p>
                    Seus dados pessoais podem ser compartilhados com:
                </p>
                <ul>
                    <li><strong>Provedores de infraestrutura:</strong> serviços de hospedagem, banco de dados e CDN</li>
                    <li><strong>Processadores de pagamento:</strong> para transações financeiras seguras</li>
                    <li><strong>Provedores de IA:</strong> modelos de linguagem (ex.: OpenAI) para funcionalidades de IA,
                        com anonimização quando possível</li>
                    <li><strong>Autoridades públicas:</strong> quando exigido por lei ou ordem judicial</li>
                </ul>
                <p>
                    <strong>Não vendemos</strong> seus dados pessoais a terceiros para fins de marketing.
                </p>
            </motion.section>

            <motion.section variants={v}>
                <h2>6. Armazenamento e Segurança</h2>
                <p>
                    Seus dados são armazenados em servidores seguros com as seguintes medidas de proteção:
                </p>
                <ul>
                    <li>Criptografia em trânsito (TLS/HTTPS) e em repouso</li>
                    <li>Controle de acesso baseado em funções (RBAC)</li>
                    <li>Monitoramento contínuo e alertas de segurança</li>
                    <li>Backups regulares com redundância geográfica</li>
                    <li>Arquitetura multi-tenant com isolamento de dados por organização</li>
                </ul>
                <p>
                    Os dados são retidos pelo tempo necessário para cumprir as finalidades descritas nesta Política
                    ou conforme exigido pela legislação aplicável.
                </p>
            </motion.section>

            <motion.section variants={v}>
                <h2>7. Seus Direitos (LGPD)</h2>
                <p>
                    Como titular dos dados, você tem os seguintes direitos garantidos pela LGPD:
                </p>
                <ul>
                    <li><strong>Confirmação e acesso:</strong> saber se tratamos seus dados e acessá-los</li>
                    <li><strong>Correção:</strong> solicitar a atualização de dados incompletos ou desatualizados</li>
                    <li><strong>Anonimização, bloqueio ou eliminação:</strong> de dados desnecessários ou em excesso</li>
                    <li><strong>Portabilidade:</strong> transferir seus dados para outro fornecedor</li>
                    <li><strong>Revogação do consentimento:</strong> a qualquer momento, sem efeito retroativo</li>
                    <li><strong>Informação sobre compartilhamento:</strong> saber com quem seus dados foram compartilhados</li>
                    <li><strong>Oposição:</strong> ao tratamento em determinadas situações</li>
                </ul>
                <p>
                    Para exercer seus direitos, entre em contato pelo e-mail{" "}
                    <a href="mailto:suporte@witdev.com.br">suporte@witdev.com.br</a>.
                    Responderemos em até 15 (quinze) dias úteis.
                </p>
            </motion.section>

            <motion.section variants={v}>
                <h2>8. Transferência Internacional</h2>
                <p>
                    Alguns dos nossos provedores de serviço podem estar localizados fora do Brasil. Nesses casos,
                    garantimos que a transferência internacional de dados ocorre em conformidade com a LGPD,
                    adotando cláusulas contratuais padrão e garantias adequadas de proteção.
                </p>
            </motion.section>

            <motion.section variants={v}>
                <h2>9. Alterações nesta Política</h2>
                <p>
                    Esta Política pode ser atualizada periodicamente para refletir mudanças em nossos serviços ou
                    na legislação aplicável. Alterações significativas serão comunicadas por e-mail ou notificação
                    nas plataformas. A data da última atualização será sempre indicada no topo deste documento.
                </p>
            </motion.section>

            <motion.section variants={v}>
                <h2>10. Contato do Encarregado (DPO)</h2>
                <p>
                    Para questões relacionadas à proteção de dados pessoais, entre em contato com nosso
                    Encarregado de Proteção de Dados:
                </p>
                <ul>
                    <li><strong>E-mail:</strong> <a href="mailto:suporte@witdev.com.br">suporte@witdev.com.br</a></li>
                    <li><strong>Empresa:</strong> WitDev</li>
                </ul>
                <p>
                    Você também tem o direito de peticionar à Autoridade Nacional de Proteção de Dados (ANPD) caso
                    considere que o tratamento de seus dados viola a LGPD.
                </p>
            </motion.section>
        </>
    )
}
