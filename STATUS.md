# 🚀 Backend - Locations API

## ✅ Status do Projeto

Backend completo desenvolvido com **NestJS** + **DDD** + **Clean Code**.

## 📦 Estrutura Criada

```
backend/
├── src/
│   ├── domain/              ✅ Camada de Domínio
│   │   ├── entities/        ✅ Location Entity com validações
│   │   ├── repositories/    ✅ Interface ILocationRepository
│   │   └── dtos/           ✅ DTOs do domínio
│   │
│   ├── application/         ✅ Camada de Aplicação
│   │   └── use-cases/      ✅ 5 Use Cases implementados
│   │       ├── create-location.use-case.ts
│   │       ├── get-location-by-id.use-case.ts
│   │       ├── list-locations.use-case.ts
│   │       ├── update-location.use-case.ts
│   │       └── delete-location.use-case.ts
│   │
│   ├── infrastructure/      ✅ Camada de Infraestrutura
│   │   ├── database/
│   │   │   ├── models/     ✅ TypeORM Models
│   │   │   ├── mappers/    ✅ Domain ↔ Persistence
│   │   │   └── repositories/ ✅ TypeORM Repository
│   │   └── http/
│   │       ├── controllers/ ✅ LocationsController
│   │       └── dtos/       ✅ Request/Response DTOs
│   │
│   ├── shared/             ✅ Camada Compartilhada
│   │   ├── modules/        ✅ NestJS Modules
│   │   ├── filters/        ✅ Global Exception Filter
│   │   ├── exceptions/     ✅ Domain Exceptions
│   │   ├── interfaces/     ✅ IUseCase Interface
│   │   └── core/          ✅ Result Pattern
│   │
│   ├── main.ts            ✅ Bootstrap da aplicação
│   └── seed.ts            ✅ Script de seed
│
├── test/                   ✅ Testes
│   ├── locations.e2e-spec.ts ✅ Testes E2E
│   └── jest-e2e.json
│
├── package.json            ✅ Dependências
├── tsconfig.json           ✅ TypeScript config
├── nest-cli.json           ✅ NestJS config
├── .eslintrc.js           ✅ ESLint
├── .prettierrc            ✅ Prettier
├── .gitignore             ✅ Git ignore
├── .env.example           ✅ Env example
├── setup.sh               ✅ Script de setup
├── Procfile               ✅ Deploy Render
├── vercel.json            ✅ Deploy Vercel (alternativa)
├── README.md              ✅ Documentação completa
└── CONTRIBUTING.md         ✅ Guia de contribuição
```

## 🎯 Features Implementadas

### CRUD Completo
- ✅ POST /locations - Criar local
- ✅ GET /locations - Listar todos
- ✅ GET /locations/:id - Buscar por ID
- ✅ PUT /locations/:id - Atualizar
- ✅ DELETE /locations/:id - Deletar

### Validações
- ✅ class-validator nos DTOs
- ✅ Validações de domínio na entidade
- ✅ Latitude: -90 a 90
- ✅ Longitude: -180 a 180
- ✅ URL válida para imagem

### Documentação
- ✅ Swagger/OpenAPI em /api/docs
- ✅ README detalhado
- ✅ Guia de contribuição
- ✅ Comentários no código

### Arquitetura
- ✅ DDD com 4 camadas (Domain, Application, Infrastructure, Shared)
- ✅ Clean Code aplicado
- ✅ SOLID principles
- ✅ Dependency Injection
- ✅ Repository Pattern
- ✅ Mapper Pattern
- ✅ Result Pattern (opcional)

### Testes
- ✅ Testes unitários (entidades, use cases)
- ✅ Testes E2E (endpoints)
- ✅ Configuração do Jest

### Database
- ✅ TypeORM configurado
- ✅ SQLite para desenvolvimento
- ✅ PostgreSQL pronto para produção
- ✅ Migrations automáticas (synchronize: true)
- ✅ Script de seed com dados de exemplo

### Error Handling
- ✅ Global Exception Filter
- ✅ Custom Domain Exceptions
- ✅ HTTP Status corretos

### Deploy
- ✅ Configurado para Render.com
- ✅ Procfile incluído
- ✅ Variáveis de ambiente documentadas

## 🚀 Como Rodar

### 1. Instalar dependências
```bash
cd backend
npm install
```

### 2. Configurar .env
```bash
cp .env.example .env
```

### 3. Rodar em desenvolvimento
```bash
npm run start:dev
```

### 4. (Opcional) Popular banco de dados
```bash
npm run seed
```

### 5. Acessar
- API: http://localhost:3001
- Docs: http://localhost:3001/api/docs

## 📊 Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | /locations | Criar local |
| GET | /locations | Listar todos |
| GET | /locations/:id | Buscar por ID |
| PUT | /locations/:id | Atualizar |
| DELETE | /locations/:id | Deletar |

## 🧪 Testes

```bash
npm run test          # Unit tests
npm run test:e2e      # E2E tests
npm run test:cov      # Coverage
```

## 📦 Deploy no Render

1. Criar PostgreSQL database (free tier)
2. Criar Web Service
3. Configurar variáveis de ambiente
4. Build: `npm install && npm run build`
5. Start: `npm run start:prod`

## 🎯 Próximos Passos

O backend está 100% completo e pronto para:
1. ✅ Rodar localmente
2. ✅ Deploy no Render.com
3. ✅ Integração com frontend Next.js

---

**Stack:** NestJS • TypeScript • TypeORM • SQLite/PostgreSQL • Swagger • Jest

