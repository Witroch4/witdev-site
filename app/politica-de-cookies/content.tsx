"use client"

import { motion } from "framer-motion"
import { legalItemVariant } from "@/components/legal-page-layout"

export default function CookiesContent() {
    const v = legalItemVariant
    return (
        <>
            <motion.section variants={v}>
                <h2>1. O que são Cookies?</h2>
                <p>
                    Cookies são pequenos arquivos de texto armazenados no seu navegador quando você visita um site.
                    Eles permitem que o site reconheça seu dispositivo, memorize suas preferências e melhore sua
                    experiência de navegação. Tecnologias semelhantes incluem pixels, web beacons e armazenamento local.
                </p>
            </motion.section>

            <motion.section variants={v}>
                <h2>2. Cookies que Utilizamos</h2>
                <p>
                    As plataformas WitDev utilizam os seguintes tipos de cookies:
                </p>

                <h3>2.1. Cookies Estritamente Necessários</h3>
                <p>
                    Essenciais para o funcionamento das plataformas. Sem eles, funcionalidades como autenticação,
                    segurança e navegação não funcionariam corretamente.
                </p>
                <ul>
                    <li>Cookies de sessão e autenticação</li>
                    <li>Tokens CSRF para proteção contra ataques</li>
                    <li>Preferências de idioma e tema</li>
                </ul>

                <h3>2.2. Cookies de Desempenho e Analytics</h3>
                <p>
                    Coletam informações anônimas sobre como os visitantes utilizam nossas plataformas,
                    ajudando-nos a melhorar a performance e a experiência do usuário.
                </p>
                <ul>
                    <li>Páginas mais visitadas e tempo de permanência</li>
                    <li>Taxas de erro e performance de carregamento</li>
                    <li>Origem do tráfego (referrer)</li>
                </ul>

                <h3>2.3. Cookies de Funcionalidade</h3>
                <p>
                    Permitem que as plataformas se lembrem de escolhas que você faz, proporcionando
                    funcionalidades avançadas e personalizadas.
                </p>
                <ul>
                    <li>Preferências de layout e configurações de interface</li>
                    <li>Histórico de interações recentes</li>
                    <li>Dados de preenchimento automático de formulários</li>
                </ul>
            </motion.section>

            <motion.section variants={v}>
                <h2>3. Cookies de Terceiros</h2>
                <p>
                    Podemos utilizar serviços de terceiros que definem seus próprios cookies:
                </p>
                <ul>
                    <li><strong>Analytics:</strong> para mensuração de tráfego e comportamento de uso</li>
                    <li><strong>CDN e infraestrutura:</strong> para otimizar a entrega de conteúdo</li>
                    <li><strong>Integrações:</strong> serviços como WhatsApp, Instagram e provedores de IA</li>
                </ul>
                <p>
                    Recomendamos que você consulte as políticas de privacidade desses terceiros para
                    compreender como eles utilizam seus dados.
                </p>
            </motion.section>

            <motion.section variants={v}>
                <h2>4. Como Gerenciar Cookies</h2>
                <p>
                    Você pode controlar e gerenciar cookies através das configurações do seu navegador.
                    A maioria dos navegadores permite:
                </p>
                <ul>
                    <li>Visualizar todos os cookies armazenados</li>
                    <li>Bloquear cookies de terceiros</li>
                    <li>Excluir cookies existentes</li>
                    <li>Configurar notificações quando novos cookies são definidos</li>
                </ul>
                <p>
                    <strong>Atenção:</strong> desabilitar cookies estritamente necessários pode afetar o funcionamento
                    das plataformas, impedindo o acesso a áreas autenticadas e funcionalidades essenciais.
                </p>

                <h3>Como desabilitar cookies nos principais navegadores:</h3>
                <ul>
                    <li><strong>Google Chrome:</strong> Configurações → Privacidade e segurança → Cookies</li>
                    <li><strong>Mozilla Firefox:</strong> Configurações → Privacidade e Segurança → Cookies e dados de sites</li>
                    <li><strong>Safari:</strong> Preferências → Privacidade → Gerenciar dados do site</li>
                    <li><strong>Microsoft Edge:</strong> Configurações → Cookies e permissões do site</li>
                </ul>
            </motion.section>

            <motion.section variants={v}>
                <h2>5. Tempo de Retenção</h2>
                <p>
                    Os cookies possuem diferentes tempos de vida:
                </p>
                <ul>
                    <li><strong>Cookies de sessão:</strong> expiram quando você fecha o navegador</li>
                    <li><strong>Cookies persistentes:</strong> permanecem por um período definido (geralmente de 30 dias a 1 ano)</li>
                    <li><strong>Cookies de analytics:</strong> retidos por até 26 meses para análise de tendências</li>
                </ul>
            </motion.section>

            <motion.section variants={v}>
                <h2>6. Alterações nesta Política</h2>
                <p>
                    Esta Política de Cookies pode ser atualizada periodicamente para refletir mudanças nas tecnologias
                    que utilizamos ou nas regulamentações aplicáveis. Recomendamos que você revise esta página
                    regularmente.
                </p>
            </motion.section>

            <motion.section variants={v}>
                <h2>7. Contato</h2>
                <p>
                    Para dúvidas sobre o uso de cookies em nossas plataformas, entre em contato:
                </p>
                <ul>
                    <li><strong>E-mail:</strong> <a href="mailto:suporte@witdev.com.br">suporte@witdev.com.br</a></li>
                    <li><strong>Empresa:</strong> WitDev</li>
                </ul>
                <p>
                    Para mais informações sobre como tratamos seus dados pessoais, consulte nossa{" "}
                    <a href="/politica-de-privacidade">Política de Privacidade</a>.
                </p>
            </motion.section>
        </>
    )
}
