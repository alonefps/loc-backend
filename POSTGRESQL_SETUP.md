# 🚀 Guia Rápido - Backend com PostgreSQL

## ✅ Configuração Concluída

O backend está configurado para usar **PostgreSQL**!

### Arquivos Criados/Atualizados:
- ✅ `.env.local` - Configurações de desenvolvimento
- ✅ `Dockerfile` - Build do container
- ✅ `docker-compose.yml` - PostgreSQL + API
- ✅ `package-lock.json` - Gerado para Docker

---

## 🐘 Opção 1: Rodar com Docker (Recomendado)

### 1. Iniciar Docker Desktop
Abra o Docker Desktop no seu Mac

### 2. Iniciar containers
```bash
cd backend
docker-compose up -d
```

### 3. Ver logs
```bash
docker-compose logs -f api
```

### 4. Parar
```bash
docker-compose down
```

**URLs:**
- API: http://localhost:3001
- Docs: http://localhost:3001/api/docs
- PostgreSQL: localhost:5432

---

## 💻 Opção 2: Rodar Localmente (Mais Simples)

### 1. Instalar PostgreSQL
```bash
# Com Homebrew
brew install postgresql@15

# Iniciar
brew services start postgresql@15
```

### 2. Criar Database
```bash
psql postgres
CREATE DATABASE locations;
CREATE USER locations WITH PASSWORD 'locations123';
GRANT ALL PRIVILEGES ON DATABASE locations TO locations;
\q
```

### 3. Configurar .env.local
Já está configurado! Verifique:
```bash
cat .env.local
```

### 4. Rodar Backend
```bash
npm install
npm run start:dev
```

**URLs:**
- API: http://localhost:3001
- Docs: http://localhost:3001/api/docs

---

## 🔍 Verificar se Está Funcionando

### Health Check
```bash
curl http://localhost:3001/health
```

### Swagger Docs
Abra: http://localhost:3001/api/docs

### Listar Locais
```bash
curl http://localhost:3001/locations
```

---

## 🌱 Popular Database (Opcional)

```bash
npm run seed
```

Isso criará 5 locais de exemplo:
- Cristo Redentor
- Pão de Açúcar
- Copacabana
- Maracanã
- Jardim Botânico

---

## 🐛 Troubleshooting

### Porta 3001 em uso
```bash
lsof -ti:3001 | xargs kill -9
```

### Porta 5432 em uso
```bash
lsof -ti:5432 | xargs kill -9
```

### PostgreSQL não conecta
Verifique se está rodando:
```bash
# Docker
docker ps

# Local
brew services list | grep postgresql
```

### Resetar Database (Docker)
```bash
docker-compose down -v
docker-compose up -d
```

---

## 📝 Credenciais PostgreSQL

```
Host: localhost
Port: 5432
Database: locations
Username: locations
Password: locations123
```

---

## ✅ Próximo Passo

Após o backend estar rodando, inicie o frontend:

```bash
cd ../frontend
npm install
# Configure NEXT_PUBLIC_MAPBOX_TOKEN no .env.local
npm run dev
```

---

**🎉 Backend pronto para usar com PostgreSQL!**

