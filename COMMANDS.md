# 🚀 Quick Reference - Comandos Úteis

## Instalação e Setup

```bash
# Instalar dependências
npm install

# Setup inicial (cria .env)
chmod +x setup.sh
./setup.sh

# Ou manualmente
cp .env.example .env
```

## Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run start:dev

# Iniciar com debug
npm run start:debug

# Iniciar modo watch
npm run start:dev
```

## Build e Produção

```bash
# Build do projeto
npm run build

# Iniciar em produção
npm run start:prod

# Build + Start
npm run build && npm run start:prod
```

## Database

```bash
# Popular banco com dados de exemplo
npm run seed

# Conectar ao SQLite (dev)
sqlite3 database.sqlite

# Ver tabelas
.tables

# Ver dados
SELECT * FROM locations;
```

## Testes

```bash
# Todos os testes
npm test

# Testes em watch mode
npm run test:watch

# Testes E2E
npm run test:e2e

# Cobertura
npm run test:cov

# Teste específico
npm test location.entity.spec
```

## Code Quality

```bash
# Lint
npm run lint

# Format
npm run format

# Lint + Fix
npm run lint -- --fix
```

## Docker

```bash
# Build imagem
docker build -t locations-api .

# Run container
docker run -p 3001:3001 locations-api

# Com docker-compose
docker-compose up

# Em background
docker-compose up -d

# Parar
docker-compose down

# Logs
docker-compose logs -f
```

## API Testing

```bash
# Script de teste completo
chmod +x test-api.sh
./test-api.sh

# Health check
curl http://localhost:3001/health

# Listar locais
curl http://localhost:3001/locations

# Criar local
curl -X POST http://localhost:3001/locations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "description": "Test",
    "latitude": 0,
    "longitude": 0,
    "imageUrl": "https://example.com/img.jpg"
  }'

# Buscar por ID
curl http://localhost:3001/locations/{id}

# Atualizar
curl -X PUT http://localhost:3001/locations/{id} \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated"}'

# Deletar
curl -X DELETE http://localhost:3001/locations/{id}
```

## Com HTTPie (mais amigável)

```bash
# Instalar
brew install httpie  # macOS
apt install httpie   # Linux

# Listar
http GET localhost:3001/locations

# Criar
http POST localhost:3001/locations \
  name="Test" \
  description="Test" \
  latitude:=0 \
  longitude:=0 \
  imageUrl="https://example.com/img.jpg"

# Atualizar
http PUT localhost:3001/locations/{id} name="Updated"

# Deletar
http DELETE localhost:3001/locations/{id}
```

## Git

```bash
# Commits semânticos
git commit -m "feat: add location validation"
git commit -m "fix: correct latitude range"
git commit -m "docs: update API documentation"
git commit -m "refactor: improve use case structure"
git commit -m "test: add location entity tests"
git commit -m "chore: update dependencies"

# Push
git push origin main
```

## Deploy Render.com

```bash
# 1. Commit e push
git add .
git commit -m "feat: ready for deploy"
git push origin main

# 2. Render vai detectar e fazer deploy automático

# 3. Ver logs
# No dashboard do Render > Logs
```

## Monitoramento

```bash
# Logs em produção (Render)
# Dashboard > Logs > View Logs

# Health check produção
curl https://seu-app.onrender.com/health

# Ver uso de memória
node --trace-gc dist/main.js
```

## Debugging

```bash
# Debug mode
npm run start:debug

# No VS Code, use:
# F5 ou Run > Start Debugging

# Ver todas as rotas
npm run start:dev
# Abra: http://localhost:3001/api/docs
```

## Limpeza

```bash
# Limpar build
rm -rf dist

# Limpar node_modules
rm -rf node_modules

# Reinstalar
npm install

# Limpar database (dev)
rm database.sqlite
```

## Variáveis de Ambiente

```bash
# Ver variáveis carregadas
printenv | grep DB_

# Testar conexão com Postgres
psql -h $DB_HOST -U $DB_USERNAME -d $DB_DATABASE

# Exportar para sessão
export NODE_ENV=production
export PORT=3001
```

## Performance

```bash
# Benchmark simples
ab -n 1000 -c 10 http://localhost:3001/locations

# Com autocannon
npm install -g autocannon
autocannon -c 10 -d 30 http://localhost:3001/locations
```

## Backup Database (Produção)

```bash
# PostgreSQL dump
pg_dump -h $DB_HOST -U $DB_USERNAME $DB_DATABASE > backup.sql

# Restore
psql -h $DB_HOST -U $DB_USERNAME $DB_DATABASE < backup.sql

# SQLite backup
cp database.sqlite database.backup.sqlite
```

## URLs Úteis

```bash
# Desenvolvimento
open http://localhost:3001
open http://localhost:3001/api/docs
open http://localhost:3001/health

# Produção (substitua pela sua URL)
open https://seu-app.onrender.com
open https://seu-app.onrender.com/api/docs
```

## Troubleshooting

```bash
# Porta em uso
lsof -ti:3001 | xargs kill -9

# Ver processos Node
ps aux | grep node

# Limpar cache npm
npm cache clean --force

# Reinstalar tudo
rm -rf node_modules package-lock.json
npm install

# Ver versão do Node
node --version
npm --version

# Update npm
npm install -g npm@latest
```

## Atalhos do Terminal

```bash
# Alias úteis (adicione ao ~/.zshrc ou ~/.bashrc)
alias dev="npm run start:dev"
alias test="npm run test"
alias build="npm run build"
alias prod="npm run start:prod"
alias api="./test-api.sh"
```

## Estrutura de Arquivos

```bash
# Ver estrutura
tree -L 3 -I node_modules

# Contar linhas de código
find src -name "*.ts" | xargs wc -l

# Buscar no código
grep -r "Location" src/

# Buscar arquivos
find src -name "*location*"
```

## Dicas

```bash
# Terminal múltiplo
# Terminal 1: npm run start:dev
# Terminal 2: npm run test:watch
# Terminal 3: ./test-api.sh

# Watch logs
tail -f logs/app.log

# Pretty print JSON
curl localhost:3001/locations | jq '.'

# Save response
curl localhost:3001/locations > locations.json
```

---

## 📝 Cheat Sheet

| Comando | Descrição |
|---------|-----------|
| `npm run start:dev` | Dev server |
| `npm run build` | Build |
| `npm test` | Testes |
| `npm run seed` | Popular DB |
| `npm run lint` | Lint |
| `./test-api.sh` | Testar API |
| `docker-compose up` | Docker |

---

**💡 Dica:** Adicione o script `test-api.sh` aos seus favoritos para testar rapidamente a API!


