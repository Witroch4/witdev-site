"use client"

import { motion } from "framer-motion"
import { legalItemVariant } from "@/components/legal-page-layout"

export default function TermosContent() {
    const v = legalItemVariant
    return (
        <>
            <motion.section variants={v}>
                <h2>1. Objeto e Aceitação</h2>
                <p>
                    Estes Termos de Uso (&quot;Termos&quot;) regulam o acesso e a utilização dos sites, plataformas e serviços
                    digitais desenvolvidos e operados pela <strong>WitDev</strong> (&quot;nós&quot;, &quot;nosso&quot;), incluindo,
                    mas não se limitando a: Socialwise Chatwit, JusMonitorIA, studIA e demais produtos do ecossistema WitDev.
                </p>
                <p>
                    Ao acessar ou utilizar nossos serviços, você concorda integralmente com os presentes Termos.
                    Caso não concorde com qualquer disposição, por favor, interrompa imediatamente o uso das plataformas.
                </p>
            </motion.section>

            <motion.section variants={v}>
                <h2>2. Elegibilidade</h2>
                <p>
                    Para utilizar nossos serviços, você deve ter pelo menos 18 (dezoito) anos de idade ou possuir autorização
                    legal de um responsável. Ao se cadastrar, você declara que as informações fornecidas são verdadeiras,
                    completas e atualizadas.
                </p>
            </motion.section>

            <motion.section variants={v}>
                <h2>3. Descrição dos Serviços</h2>
                <p>
                    A WitDev desenvolve e opera plataformas SaaS multi-tenant voltadas para soluções jurídicas, atendimento ao
                    cliente e educação. Os serviços podem incluir:
                </p>
                <ul>
                    <li>Automação de atendimento com inteligência artificial</li>
                    <li>Monitoramento processual e CRM jurídico</li>
                    <li>Ferramentas de estudo com repetição espaçada</li>
                    <li>Integrações com redes sociais e APIs de terceiros</li>
                </ul>
                <p>
                    Os serviços estão sujeitos a alterações, melhorias ou descontinuações a qualquer momento,
                    mediante comunicação prévia aos usuários ativos.
                </p>
            </motion.section>

            <motion.section variants={v}>
                <h2>4. Cadastro e Conta do Usuário</h2>
                <p>
                    Para acessar funcionalidades específicas, pode ser necessário criar uma conta. Você é responsável por:
                </p>
                <ul>
                    <li>Manter a confidencialidade de suas credenciais de acesso</li>
                    <li>Todas as atividades realizadas em sua conta</li>
                    <li>Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
                </ul>
                <p>
                    Reservamo-nos o direito de suspender ou encerrar contas que violem estes Termos
                    ou que apresentem atividade suspeita.
                </p>
            </motion.section>

            <motion.section variants={v}>
                <h2>5. Propriedade Intelectual</h2>
                <p>
                    Todo o conteúdo, código-fonte, design, marcas, logotipos, textos, imagens e funcionalidades
                    disponibilizados nas plataformas WitDev são de propriedade exclusiva da WitDev ou de seus
                    licenciadores e estão protegidos pela legislação brasileira de propriedade intelectual.
                </p>
                <p>
                    É expressamente proibido:
                </p>
                <ul>
                    <li>Copiar, modificar, distribuir ou reproduzir qualquer conteúdo sem autorização prévia</li>
                    <li>Realizar engenharia reversa dos softwares ou sistemas</li>
                    <li>Utilizar web scraping, bots ou métodos automatizados sem consentimento</li>
                </ul>
            </motion.section>

            <motion.section variants={v}>
                <h2>6. Uso Aceitável</h2>
                <p>
                    Ao utilizar nossos serviços, você se compromete a não:
                </p>
                <ul>
                    <li>Utilizar as plataformas para fins ilegais, fraudulentos ou não autorizados</li>
                    <li>Transmitir vírus, malware ou qualquer código malicioso</li>
                    <li>Tentar acessar áreas restritas dos sistemas sem autorização</li>
                    <li>Interferir no funcionamento ou na segurança das plataformas</li>
                    <li>Violar direitos de terceiros, incluindo privacidade e propriedade intelectual</li>
                </ul>
            </motion.section>

            <motion.section variants={v}>
                <h2>7. Limitação de Responsabilidade</h2>
                <p>
                    Os serviços são fornecidos &quot;como estão&quot; (<em>as is</em>). A WitDev não garante que os serviços
                    serão ininterruptos, livres de erros ou completamente seguros. Na máxima extensão permitida pela lei:
                </p>
                <ul>
                    <li>Não nos responsabilizamos por perdas indiretas, incidentais ou consequenciais</li>
                    <li>Nossa responsabilidade total é limitada ao valor pago pelo usuário nos últimos 12 meses</li>
                    <li>Não garantimos resultados específicos decorrentes do uso dos serviços</li>
                </ul>
            </motion.section>

            <motion.section variants={v}>
                <h2>8. Links e Serviços de Terceiros</h2>
                <p>
                    Nossas plataformas podem conter links ou integrações com serviços de terceiros (ex.: WhatsApp API,
                    Instagram, OpenAI). Não somos responsáveis pelo conteúdo, políticas de privacidade ou práticas
                    desses serviços externos. Recomendamos que você leia os termos e políticas de cada serviço
                    antes de utilizá-lo.
                </p>
            </motion.section>

            <motion.section variants={v}>
                <h2>9. Modificações nos Termos</h2>
                <p>
                    Podemos atualizar estes Termos periodicamente. Alterações significativas serão comunicadas por
                    e-mail ou por meio das próprias plataformas. O uso continuado dos serviços após a publicação
                    de alterações constitui aceitação dos novos Termos.
                </p>
            </motion.section>

            <motion.section variants={v}>
                <h2>10. Rescisão</h2>
                <p>
                    Você pode encerrar sua conta a qualquer momento entrando em contato conosco. Reservamo-nos o
                    direito de suspender ou encerrar o acesso em caso de violação destes Termos, sem prévio aviso.
                    Após a rescisão, suas obrigações de confidencialidade e propriedade intelectual permanecerão em vigor.
                </p>
            </motion.section>

            <motion.section variants={v}>
                <h2>11. Legislação Aplicável e Foro</h2>
                <p>
                    Estes Termos são regidos pelas leis da República Federativa do Brasil. Para a resolução de qualquer
                    controvérsia decorrente destes Termos, fica eleito o foro da comarca de domicílio do usuário,
                    nos termos do art. 101, I, do Código de Defesa do Consumidor.
                </p>
            </motion.section>

            <motion.section variants={v}>
                <h2>12. Contato</h2>
                <p>
                    Para dúvidas, solicitações ou reclamações relacionadas a estes Termos, entre em contato:
                </p>
                <ul>
                    <li><strong>E-mail:</strong> <a href="mailto:suporte@witdev.com.br">suporte@witdev.com.br</a></li>
                    <li><strong>Empresa:</strong> WitDev</li>
                </ul>
            </motion.section>
        </>
    )
}
