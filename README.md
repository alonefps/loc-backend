# Locations API - Backend

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=for-the-badge&logo=typeorm&logoColor=white)

API RESTful para gerenciamento de locais desenvolvida com **NestJS** seguindo os princípios de **DDD (Domain-Driven Design)** e **Clean Code**.

## 📋 Índice

- [Arquitetura](#-arquitetura)
- [Tecnologias](#-tecnologias)
- [Funcionalidades](#-funcionalidades)
- [Instalação](#-instalação)
- [Executando o Projeto](#-executando-o-projeto)
- [Documentação da API](#-documentação-da-api)
- [Endpoints](#-endpoints)
- [Testes](#-testes)
- [Deploy](#-deploy)
- [Princípios Aplicados](#-princípios-aplicados)

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas baseada em **DDD (Domain-Driven Design)**:

```
src/
├── domain/                  # 🎯 Camada de Domínio
│   ├── entities/           # Entidades de negócio com validações
│   ├── repositories/       # Interfaces de repositórios (contratos)
│   └── dtos/              # Data Transfer Objects do domínio
│
├── application/            # 📝 Camada de Aplicação
│   └── use-cases/         # Casos de uso (regras de negócio)
│
├── infrastructure/         # 🔧 Camada de Infraestrutura
│   ├── database/          # Configurações de banco de dados
│   │   ├── models/        # Modelos do TypeORM
│   │   ├── mappers/       # Mapeadores Domain ↔ Persistence
│   │   └── repositories/  # Implementações concretas dos repositórios
│   └── http/              # Controllers e DTOs HTTP
│       ├── controllers/
│       └── dtos/
│
└── shared/                 # 🌐 Camada Compartilhada
    ├── modules/           # Módulos do NestJS
    ├── filters/           # Filtros de exceção
    ├── exceptions/        # Exceções customizadas
    ├── interfaces/        # Interfaces compartilhadas
    └── core/             # Utilitários core
```

### Fluxo de Dados

```
HTTP Request → Controller → Use Case → Repository Interface → Repository Implementation → Database
                    ↓           ↓              ↓
                  DTOs    Domain Entity   Domain Entity
```

## 🚀 Tecnologias

| Tecnologia | Descrição |
|------------|-----------|
| **NestJS** | Framework Node.js progressivo para aplicações server-side |
| **TypeScript** | Superset JavaScript com tipagem estática |
| **TypeORM** | ORM para TypeScript e JavaScript |
| **SQLite** | Banco de dados para desenvolvimento |
| **PostgreSQL** | Banco de dados para produção |
| **Swagger** | Documentação automática da API |
| **class-validator** | Validação declarativa de dados |
| **class-transformer** | Transformação de objetos |
| **Jest** | Framework de testes |

## 📋 Funcionalidades

- ✅ **Criar Local** - Adicionar novos pontos de interesse
- ✅ **Listar Locais** - Obter todos os locais cadastrados
- ✅ **Buscar por ID** - Obter detalhes de um local específico
- ✅ **Atualizar Local** - Modificar informações de um local
- ✅ **Deletar Local** - Remover um local do sistema

### Modelo de Dados - Location

| Campo | Tipo | Descrição | Validação |
|-------|------|-----------|-----------|
| `id` | UUID | Identificador único | Gerado automaticamente |
| `name` | string | Nome do local | Obrigatório, não vazio |
| `description` | string | Descrição do local | Obrigatório, não vazio |
| `latitude` | number | Coordenada de latitude | -90 a 90 |
| `longitude` | number | Coordenada de longitude | -180 a 180 |
| `imageUrl` | string | URL da imagem | URL válida |
| `createdAt` | Date | Data de criação | Automático |
| `updatedAt` | Date | Data de atualização | Automático |

## 🔧 Instalação

### Pré-requisitos

- **Node.js** 18+ ([Download](https://nodejs.org))
- **npm** ou **yarn**

### Passo a Passo

1. **Clone o repositório**

2. **Execute o script de setup**
```bash
chmod +x setup.sh
./setup.sh
```

**OU instale manualmente:**

```bash
npm install
cp .env.example .env
```

3. **Configure as variáveis de ambiente**

Edite o arquivo `.env`:

```env
NODE_ENV=development
PORT=3001

# Desenvolvimento (SQLite)
DB_TYPE=sqlite
DB_DATABASE=database.sqlite

# Produção (PostgreSQL - Render)
# DB_TYPE=postgres
# DB_HOST=your-postgres-host
# DB_PORT=5432
# DB_USERNAME=your-username
# DB_PASSWORD=your-password
# DB_DATABASE=your-database

CORS_ORIGIN=http://localhost:3000
```

## 🏃 Executando o Projeto

### Desenvolvimento
```bash
npm run start:dev
```

### Produção
```bash
npm run build
npm run start:prod
```

### Watch Mode (com hot-reload)
```bash
npm run start:dev
```

**A API estará disponível em:** `http://localhost:3001`

## 📚 Documentação da API

Após iniciar a aplicação, acesse a documentação **Swagger** interativa:

**URL:** [http://localhost:3001/api/docs](http://localhost:3001/api/docs)

A documentação inclui:
- Todos os endpoints disponíveis
- Schemas de request/response
- Códigos de status HTTP
- Possibilidade de testar os endpoints diretamente

## 🔌 Endpoints

### Base URL: `http://localhost:3001`

### 1. Criar Local

```http
POST /locations
Content-Type: application/json

{
  "name": "Central Park",
  "description": "A large public park in New York City",
  "latitude": 40.785091,
  "longitude": -73.968285,
  "imageUrl": "https://example.com/image.jpg"
}
```

**Resposta (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Central Park",
  "description": "A large public park in New York City",
  "latitude": 40.785091,
  "longitude": -73.968285,
  "imageUrl": "https://example.com/image.jpg",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 2. Listar Todos os Locais

```http
GET /locations
```

**Resposta (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Central Park",
    "description": "A large public park in New York City",
    "latitude": 40.785091,
    "longitude": -73.968285,
    "imageUrl": "https://example.com/image.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 3. Buscar Local por ID

```http
GET /locations/:id
```

**Resposta (200 OK):** Objeto do local  
**Resposta (404 Not Found):** Local não encontrado

### 4. Atualizar Local

```http
PUT /locations/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description"
}
```

**Resposta (200 OK):** Objeto atualizado  
**Resposta (404 Not Found):** Local não encontrado

### 5. Deletar Local

```http
DELETE /locations/:id
```

**Resposta (204 No Content):** Deletado com sucesso  
**Resposta (404 Not Found):** Local não encontrado

## 🧪 Testes

### Executar todos os testes
```bash
npm run test
```

### Testes unitários com watch
```bash
npm run test:watch
```

### Testes e2e
```bash
npm run test:e2e
```

### Cobertura de testes
```bash
npm run test:cov
```

### Estrutura de Testes

```
src/
├── domain/entities/*.spec.ts           # Testes unitários de entidades
├── application/use-cases/*.spec.ts     # Testes unitários de use cases
test/
└── locations.e2e-spec.ts              # Testes e2e dos endpoints
```

## 📦 Deploy no Render.com

### Pré-requisitos
- Conta no [Render.com](https://render.com)
- Repositório Git (GitHub, GitLab, etc.)

### Passo a Passo

#### 1. Criar PostgreSQL Database

1. Acesse o [Dashboard do Render](https://dashboard.render.com)
2. Clique em **New +** → **PostgreSQL**
3. Escolha o plano **Free**
4. Anote as credenciais fornecidas

#### 2. Criar Web Service

1. Clique em **New +** → **Web Service**
2. Conecte seu repositório
3. Configure:
   - **Name:** `locations-api` (ou outro nome)
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start:prod`

#### 3. Configurar Variáveis de Ambiente

No painel do Web Service, adicione:

```env
NODE_ENV=production
PORT=3001
DB_TYPE=postgres
DB_HOST=<fornecido_pelo_render>
DB_PORT=5432
DB_USERNAME=<fornecido_pelo_render>
DB_PASSWORD=<fornecido_pelo_render>
DB_DATABASE=<fornecido_pelo_render>
CORS_ORIGIN=<url_do_frontend_na_vercel>
```

#### 4. Deploy

O deploy iniciará automaticamente. Aguarde a conclusão.

**URL da API:** `https://seu-servico.onrender.com`

**Documentação:** `https://seu-servico.onrender.com/api/docs`

### ⚠️ Observação - Free Tier

O plano gratuito do Render hiberna após 15 minutos de inatividade. A primeira requisição após hibernação pode levar ~30 segundos.

## 🎯 Princípios Aplicados

### Clean Code

- ✅ Nomes descritivos e significativos
- ✅ Funções pequenas com responsabilidade única
- ✅ Código auto-documentado
- ✅ Tratamento adequado de erros
- ✅ Evitar duplicação de código (DRY)
- ✅ Formatação consistente

### DDD (Domain-Driven Design)

- ✅ **Separação de camadas** - Domain, Application, Infrastructure, Shared
- ✅ **Domínio isolado** - Lógica de negócio independente de frameworks
- ✅ **Entidades ricas** - Validações e comportamentos no domínio
- ✅ **Use Cases** - Encapsulamento de regras de negócio
- ✅ **Repositórios abstraídos** - Inversão de dependência com interfaces
- ✅ **Mapeadores** - Separação entre modelo de domínio e persistência

### SOLID

| Princípio | Aplicação |
|-----------|-----------|
| **S**ingle Responsibility | Cada classe tem uma única responsabilidade |
| **O**pen/Closed | Aberto para extensão, fechado para modificação |
| **L**iskov Substitution | Implementações podem substituir interfaces |
| **I**nterface Segregation | Interfaces específicas e coesas |
| **D**ependency Inversion | Dependência de abstrações, não implementações |

## 📁 Estrutura Detalhada

### Camada de Domínio (`domain/`)

Contém a lógica de negócio pura, independente de frameworks:

- **Entidades:** Objetos de negócio com identidade e comportamento
- **Interfaces de Repositórios:** Contratos para persistência
- **DTOs:** Objetos de transferência de dados do domínio

**Exemplo - Location Entity:**

```typescript
export class Location {
  constructor(/* ... */) {
    this.validate(); // Validação no domínio
  }
  
  public update(/* ... */): Location {
    // Comportamento de negócio
  }
}
```

### Camada de Aplicação (`application/`)

Orquestra a lógica de negócio através de Use Cases:

```typescript
export class CreateLocationUseCase {
  constructor(private repository: ILocationRepository) {}
  
  async execute(data: CreateLocationDto): Promise<Location> {
    // Regra de negócio
  }
}
```

### Camada de Infraestrutura (`infrastructure/`)

Implementa detalhes técnicos:

- **Database:** TypeORM, modelos, repositórios concretos
- **HTTP:** Controllers, DTOs de request/response
- **Mappers:** Conversão entre domínio e persistência

### Camada Compartilhada (`shared/`)

Código compartilhado entre camadas:

- **Modules:** Configuração do NestJS
- **Filters:** Tratamento global de exceções
- **Exceptions:** Exceções customizadas
- **Interfaces:** Contratos compartilhados

## 🤝 Contribuindo

Veja [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes sobre:
- Commits semânticos
- Padrões de código
- Como adicionar novas features

## 📝 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run start` | Inicia em modo normal |
| `npm run start:dev` | Inicia com hot-reload |
| `npm run start:debug` | Inicia em modo debug |
| `npm run start:prod` | Inicia em produção |
| `npm run build` | Compila o projeto |
| `npm run format` | Formata código com Prettier |
| `npm run lint` | Executa ESLint |
| `npm run test` | Executa testes unitários |
| `npm run test:watch` | Testes em watch mode |
| `npm run test:cov` | Gera relatório de cobertura |
| `npm run test:e2e` | Executa testes e2e |

## 📄 Licença

Este projeto está sob a licença MIT.

---

**Desenvolvido com ❤️ usando NestJS e DDD**
