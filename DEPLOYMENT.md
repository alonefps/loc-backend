# 🚀 Deployment Guide - Backend

## Opções de Deploy

1. **Render.com** (Recomendado - Free Tier)
2. **Railway.app** (Alternativa)
3. **Heroku** (Alternativa)
4. **Vercel** (Apenas para apps pequenos)

---

## 1. Deploy no Render.com (Recomendado)

### Vantagens
- ✅ Free tier generoso
- ✅ PostgreSQL incluído
- ✅ Auto-deploy do GitHub
- ✅ SSL automático
- ✅ Fácil configuração

### Passo a Passo

#### A) Criar PostgreSQL Database

1. Acesse: https://dashboard.render.com
2. Clique em **New +** → **PostgreSQL**
3. Configure:
   - **Name:** `locations-db`
   - **Database:** `locations`
   - **User:** (gerado automaticamente)
   - **Region:** escolha o mais próximo
   - **Plan:** **Free**
4. Clique em **Create Database**
5. **IMPORTANTE:** Anote as credenciais:
   - Internal Database URL
   - External Database URL
   - Hostname
   - Port
   - Database
   - Username
   - Password

#### B) Criar Web Service

1. Clique em **New +** → **Web Service**
2. Conecte seu repositório GitHub
3. Configure:
   
   **Básico:**
   - **Name:** `locations-api`
   - **Region:** mesmo da database
   - **Branch:** `main` ou `master`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   
   **Build & Deploy:**
   - **Build Command:** 
     ```bash
     npm install && npm run build
     ```
   - **Start Command:**
     ```bash
     npm run start:prod
     ```
   
   **Plan:** **Free**

4. Clique em **Advanced** e adicione variáveis de ambiente:

```env
NODE_ENV=production
PORT=3001

DB_TYPE=postgres
DB_HOST=<hostname_do_postgres_render>
DB_PORT=5432
DB_USERNAME=<username_do_postgres>
DB_PASSWORD=<password_do_postgres>
DB_DATABASE=locations

CORS_ORIGIN=<url_do_frontend_na_vercel>
```

**Exemplo real:**
```env
NODE_ENV=production
PORT=3001

DB_TYPE=postgres
DB_HOST=dpg-abc123xyz-a.oregon-postgres.render.com
DB_PORT=5432
DB_USERNAME=locations_user
DB_PASSWORD=xYz123AbC456DeF789
DB_DATABASE=locations

CORS_ORIGIN=https://seu-app.vercel.app
```

5. Clique em **Create Web Service**

#### C) Aguardar Deploy

- O primeiro deploy pode levar 5-10 minutos
- Acompanhe os logs em tempo real
- Quando aparecer "Application is running on", está pronto!

#### D) Testar

```bash
# Health check
curl https://seu-app.onrender.com/health

# API Docs
# Abra no navegador:
https://seu-app.onrender.com/api/docs
```

### ⚠️ Importante - Free Tier

O plano gratuito do Render:
- ✅ 750 horas/mês (suficiente para testes)
- ⚠️ Hiberna após 15 min de inatividade
- ⚠️ Primeira requisição após hibernação: ~30-60 segundos
- ✅ 100 GB de largura de banda

**Solução:** Use um serviço de ping (UptimeRobot, Cron-Job.org) para manter ativo.

---

## 2. Deploy no Railway.app (Alternativa)

### Vantagens
- ✅ Setup mais rápido
- ✅ Não hiberna
- ✅ $5 de crédito grátis/mês

### Passo a Passo

1. Acesse: https://railway.app
2. Clique em **New Project** → **Deploy from GitHub repo**
3. Selecione o repositório
4. Railway detecta automaticamente Node.js
5. Adicione PostgreSQL:
   - Clique em **New** → **Database** → **Add PostgreSQL**
6. Configure variáveis:
   - Railway já injeta variáveis do Postgres automaticamente
   - Adicione apenas:
     ```env
     NODE_ENV=production
     CORS_ORIGIN=<url_do_frontend>
     ```
7. Deploy automático!

---

## 3. Deploy no Heroku (Alternativa)

### Passo a Passo

```bash
# 1. Instalar Heroku CLI
brew tap heroku/brew && brew install heroku

# 2. Login
heroku login

# 3. Criar app
cd backend
heroku create seu-app-name

# 4. Adicionar PostgreSQL
heroku addons:create heroku-postgresql:mini

# 5. Configurar variáveis
heroku config:set NODE_ENV=production
heroku config:set CORS_ORIGIN=https://seu-frontend.vercel.app

# 6. Deploy
git push heroku main

# 7. Abrir
heroku open
```

---

## 4. Deploy na Vercel (Alternativa)

⚠️ **Limitações:** Vercel é otimizado para frontend/serverless, não ideal para NestJS.

Apenas para testes pequenos:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
cd backend
vercel

# Seguir instruções
```

---

## Checklist Pré-Deploy

### Código
- [ ] `npm run build` sem erros
- [ ] `npm run lint` sem erros
- [ ] Testes passando
- [ ] `.env.example` atualizado
- [ ] README completo

### Segurança
- [ ] `.env` no `.gitignore`
- [ ] Secrets não commitados
- [ ] CORS configurado corretamente
- [ ] Validações de input ativas

### Database
- [ ] Migrations funcionando
- [ ] Seeds (opcional) prontos
- [ ] Backup configurado (produção)

### Monitoramento
- [ ] Health check endpoint (`/health`)
- [ ] Logs configurados
- [ ] Error tracking (opcional: Sentry)

---

## Pós-Deploy

### 1. Verificar Health

```bash
curl https://seu-app.onrender.com/health
```

Resposta esperada:
```json
{
  "status": "ok",
  "timestamp": "2024-12-02T00:00:00.000Z",
  "uptime": 123.45,
  "environment": "production"
}
```

### 2. Testar Endpoints

```bash
# Listar locais
curl https://seu-app.onrender.com/locations

# Criar local
curl -X POST https://seu-app.onrender.com/locations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "description": "Test",
    "latitude": 0,
    "longitude": 0,
    "imageUrl": "https://example.com/img.jpg"
  }'
```

### 3. Configurar Frontend

No frontend (Vercel), adicione:

```env
NEXT_PUBLIC_API_URL=https://seu-app.onrender.com
```

### 4. Popular Database

```bash
# Se tiver script de seed
npm run seed
```

---

## Troubleshooting

### Erro: "Application failed to start"

**Causa:** Variáveis de ambiente incorretas

**Solução:**
1. Verifique as variáveis no painel do Render
2. Confira os logs: `View Logs` no dashboard
3. Valide conexão com database

### Erro: "Cannot connect to database"

**Causa:** Credenciais do Postgres incorretas

**Solução:**
1. Use o **Internal Database URL** do Render
2. Verifique se o hostname está correto
3. Tente conectar manualmente:
   ```bash
   psql -h hostname -U username -d database
   ```

### App muito lento

**Causa:** Free tier hibernando

**Soluções:**
1. Use UptimeRobot para ping a cada 5 min
2. Upgrade para plano pago ($7/mês)
3. Use Railway (não hiberna)

### CORS Error

**Causa:** CORS_ORIGIN incorreto

**Solução:**
```env
CORS_ORIGIN=https://seu-frontend.vercel.app
```

Ou permitir tudo (apenas desenvolvimento):
```env
CORS_ORIGIN=*
```

---

## Monitoramento (Opcional)

### UptimeRobot (Grátis)

1. Acesse: https://uptimerobot.com
2. Crie monitor:
   - **Type:** HTTP(s)
   - **URL:** `https://seu-app.onrender.com/health`
   - **Interval:** 5 minutos
3. Receba alertas por email

### Sentry (Grátis até 5k eventos/mês)

```bash
npm install @sentry/node
```

```typescript
// main.ts
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

---

## Upgrade de Plano (Quando Necessário)

### Render
- **Starter:** $7/mês
  - ✅ Não hiberna
  - ✅ 512 MB RAM
  - ✅ Melhor performance

### Railway
- **Developer:** $5/mês em créditos
  - ✅ Pague pelo uso
  - ✅ Não hiberna
  - ✅ Melhor DX

---

## Variáveis de Ambiente - Resumo

```env
# Aplicação
NODE_ENV=production
PORT=3001

# Database (Render Postgres)
DB_TYPE=postgres
DB_HOST=<render_hostname>
DB_PORT=5432
DB_USERNAME=<render_username>
DB_PASSWORD=<render_password>
DB_DATABASE=locations

# CORS
CORS_ORIGIN=https://seu-frontend.vercel.app

# Opcional
SENTRY_DSN=<seu_sentry_dsn>
```

---

## Links Úteis

- [Render Dashboard](https://dashboard.render.com)
- [Render Docs](https://render.com/docs)
- [Railway Dashboard](https://railway.app)
- [Heroku Dashboard](https://dashboard.heroku.com)
- [UptimeRobot](https://uptimerobot.com)
- [Sentry](https://sentry.io)

---

**🎉 Backend deployed com sucesso!**

Próximo passo: Deploy do frontend Next.js na Vercel

