#!/usr/bin/env bash
# =============================================================================
# dev.sh - Script para gerenciar o ambiente de desenvolvimento do WitDev Site
# =============================================================================
#
# Tudo roda em Docker. Basta executar:
#   ./dev.sh           → Sobe a aplicação
#
# E abrir: http://localhost:3000
#
# =============================================================================

set -euo pipefail

# ─────────────────────────────────────────────────────────────────────────────
# Configurações
# ─────────────────────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMPOSE_FILE="$SCRIPT_DIR/docker-compose-dev.yaml"
ENV_FILE="$SCRIPT_DIR/.env.local"
ENV_EXAMPLE="$SCRIPT_DIR/.env.example"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# ─────────────────────────────────────────────────────────────────────────────
# Funções auxiliares
# ─────────────────────────────────────────────────────────────────────────────
log_info()    { echo -e "${BLUE}ℹ${NC}  $1"; }
log_success() { echo -e "${GREEN}✔${NC}  $1"; }
log_warn()    { echo -e "${YELLOW}⚠${NC}  $1"; }
log_error()   { echo -e "${RED}✖${NC}  $1"; }
log_header()  { echo -e "\n${BOLD}${CYAN}═══ $1 ═══${NC}\n"; }

# Verifica se .env.local existe
ensure_env_file() {
  if [ ! -f "$ENV_FILE" ]; then
    if [ -f "$ENV_EXAMPLE" ]; then
      log_warn "Arquivo .env.local não encontrado. Criando a partir de .env.example..."
      cp "$ENV_EXAMPLE" "$ENV_FILE"
      log_success ".env.local criado! Edite-o conforme necessário."
    else
      log_warn "Nenhum arquivo de ambiente encontrado, prosseguindo sem ele."
    fi
  fi
}

# Verifica dependências necessárias
check_dependencies() {
  local missing=()

  if ! command -v docker &> /dev/null; then
    missing+=("docker")
  fi

  if ! docker compose version &> /dev/null 2>&1; then
    if ! command -v docker-compose &> /dev/null; then
      missing+=("docker-compose")
    fi
  fi

  if [ ${#missing[@]} -gt 0 ]; then
    log_error "Dependências faltando: ${missing[*]}"
    log_info "Instale as dependências e tente novamente."
    exit 1
  fi
}

# Comando Docker Compose (suporta v1 e v2)
dc() {
  local compose_file="$COMPOSE_FILE"

  if docker compose version &> /dev/null 2>&1; then
    docker compose -f "$compose_file" "$@"
  else
    docker-compose -f "$compose_file" "$@"
  fi
}

# ─────────────────────────────────────────────────────────────────────────────
# Comandos
# ─────────────────────────────────────────────────────────────────────────────

cmd_up() {
  log_header "Subindo ambiente de desenvolvimento"

  ensure_env_file

  # Sobe containers
  dc up -d
  log_info "Aguardando aplicativo iniciar..."
  sleep 3

  print_urls

  log_info "Exibindo logs (Ctrl+C para parar container)..."

  # Trap para capturar Ctrl+C e fazer graceful stop
  trap 'echo ""; log_info "Parando o container..."; dc down; log_success "Ambiente parado!"; exit 0' INT TERM

  dc logs -f --tail=100
}

cmd_up_detached() {
  log_header "Subindo ambiente de desenvolvimento (detached)"

  ensure_env_file

  dc up -d
  log_success "Ambiente iniciado em background!"
  print_urls
}

print_urls() {
  echo ""
  log_success "Ambiente de desenvolvimento pronto!"
  echo ""
  echo -e "  ${BOLD}${GREEN}URLs:${NC}"
  echo -e "  ${CYAN}🌐 Aplicação${NC}     → ${BOLD}http://localhost:3000${NC}"
  echo ""
  echo -e "  ${BOLD}Comandos úteis:${NC}"
  echo -e "    ./dev.sh logs              Ver logs da aplicação"
  echo -e "    ./dev.sh shell             Abrir shell no container app"
  echo -e "    ./dev.sh install           Instalar dependências (npm install)"
  echo ""
}

cmd_build() {
  log_header "Build de desenvolvimento"

  ensure_env_file

  log_info "Parando containers..."
  dc down

  # Descobre o prefixo do projeto (nome do diretório por padrão)
  local project
  project="$(basename "$SCRIPT_DIR" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9_-]//g')"

  log_info "Removendo volume node_modules..."
  docker volume rm "${project}_node_modules" 2>/dev/null \
    && log_success "Volume node_modules removido." \
    || log_warn "Volume node_modules não encontrado (ok)."

  log_info "Subindo containers (npm install será executado)..."
  dc up -d

  log_success "Build finalizado! ⚡"

  print_urls

  log_info "Mostrando logs do serviço (Ctrl+C para sair)..."
  ./dev.sh logs
}

cmd_down() {
  log_header "Parando ambiente"
  dc down
  log_success "Ambiente parado."
}

cmd_restart() {
  log_header "Reiniciando ambiente"
  dc restart
  log_success "Ambiente reiniciado."
}

cmd_logs() {
  dc logs -f --tail 200
}

cmd_status() {
  log_header "Status dos containers"
  dc ps -a
}

cmd_shell() {
  log_info "Abrindo shell no container app..."
  dc exec app sh
}

cmd_exec() {
  log_info "Executando comando no container app..."
  dc exec app "$@"
}

cmd_lint() {
  log_header "Rodando linter"
  dc exec app npm run lint
  log_success "Lint concluído!"
}

cmd_install() {
  log_header "Instalando dependências"
  dc exec app npm install
  log_success "Dependências instaladas!"
}

cmd_clean() {
  log_header "Limpeza completa"
  log_warn "Isso vai PARAR o container e REMOVER os volumes!"
  read -p "Tem certeza? (y/N): " confirm
  if [[ "$confirm" =~ ^[Yy]$ ]]; then
    dc down -v --remove-orphans
    log_success "Container parado e volumes removidos."
  else
    log_info "Operação cancelada."
  fi
}

cmd_help() {
  echo -e "${BOLD}${CYAN}"
  echo "╔══════════════════════════════════════════════════════════════╗"
  echo "║        🚀  WitDev Site - Dev Environment                    ║"
  echo "╚══════════════════════════════════════════════════════════════╝"
  echo -e "${NC}"
  echo -e "  ${BOLD}Uso:${NC} ./dev.sh [comando]"
  echo ""
  echo -e "  ${BOLD}Comandos principais:${NC}"
  echo -e "    ${GREEN}(sem argumento)${NC}   Sobe, segue logs, Ctrl+C para parar"
  echo -e "    ${GREEN}up${NC}                Sobe e segue logs (Ctrl+C = stop)"
  echo -e "    ${GREEN}up:d${NC}              Sobe em background (container persiste)"
  echo -e "    ${GREEN}build${NC}             Rebuild da imagem (RÁPIDO)"
  echo -e "    ${GREEN}down${NC}              Para o container"
  echo -e "    ${GREEN}restart${NC}           Reinicia o container"
  echo ""
  echo -e "  ${BOLD}Monitoramento:${NC}"
  echo -e "    ${GREEN}logs${NC}               Mostra logs"
  echo -e "    ${GREEN}status${NC}             Mostra status do container"
  echo ""
  echo -e "  ${BOLD}Acesso:${NC}"
  echo -e "    ${GREEN}shell${NC}             Abre shell no container app"
  echo -e "    ${GREEN}exec <cmd>${NC}        Executa comando no container"
  echo ""
  echo -e "  ${BOLD}Qualidade de código:${NC}"
  echo -e "    ${GREEN}lint${NC}              Roda linter (ESLint)"
  echo ""
  echo -e "  ${BOLD}Dependências:${NC}"
  echo -e "    ${GREEN}install${NC}           Instala dependências (npm install)"
  echo ""
  echo -e "  ${BOLD}Limpeza:${NC}"
  echo -e "    ${GREEN}clean${NC}             Remove container + volumes"
  echo ""
  echo -e "  ${BOLD}URLs:${NC}"
  echo -e "    🌐 Aplicação    → ${BOLD}http://localhost:3000${NC}"
  echo ""
}

# ─────────────────────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────────────────────

check_dependencies

case "${1:-}" in
  up)          cmd_up ;;
  up:d)        cmd_up_detached ;;
  build)       shift; cmd_build "$@" ;;
  down)        cmd_down ;;
  restart)     cmd_restart ;;
  logs)        shift; cmd_logs "$@" ;;
  status)      cmd_status ;;
  shell)       cmd_shell ;;
  exec)        shift; cmd_exec "$@" ;;
  lint)        cmd_lint ;;
  install)     cmd_install ;;
  clean)       cmd_clean ;;
  help|-h|--help) cmd_help ;;
  "")          cmd_up ;;
  *)
    log_error "Comando desconhecido: $1"
    cmd_help
    exit 1
    ;;
esac
