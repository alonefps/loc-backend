# 🧪 Guia de Testes - Locations Backend

## ✅ Problema Resolvido

Os testes estavam falhando porque:
1. **Use Cases sem decorators** - Faltava `@Injectable()` e `@Inject()`
2. **Jest sem path aliases** - Configuração de moduleNameMapper estava faltando

## 🎯 Testes Agora Passam

Todos os 8 testes estão passando:
- ✅ 6 testes de entidade (Location Entity)
- ✅ 2 testes de use case (CreateLocationUseCase)

## 🚀 Como Rodar os Testes

### ⚠️ IMPORTANTE: Use npm test, não bun test

O Bun ainda tem problemas com path aliases do TypeScript. Use Jest com npm:

```bash
# Rodar todos os testes
npm test

# Rodar em watch mode
npm run test:watch

# Rodar com coverage
npm run test:cov

# Rodar testes E2E
npm run test:e2e
```

### ❌ Não Use (por enquanto)
```bash
bun test  # ❌ Ainda tem problemas com path aliases
```

## 📋 Melhorias Aplicadas

### 1. Use Cases com Injeção de Dependência Correta

**Antes:**
```typescript
export class CreateLocationUseCase {
  constructor(private readonly locationRepository: ILocationRepository) {}
}
```

**Depois:**
```typescript
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class CreateLocationUseCase {
  constructor(
    @Inject('ILocationRepository')
    private readonly locationRepository: ILocationRepository
  ) {}
}
```

### 2. Jest com Path Aliases

**package.json:**
```json
{
  "jest": {
    "moduleNameMapper": {
      "^@domain/(.*)$": "<rootDir>/domain/$1",
      "^@application/(.*)$": "<rootDir>/application/$1",
      "^@infrastructure/(.*)$": "<rootDir>/infrastructure/$1",
      "^@shared/(.*)$": "<rootDir>/shared/$1"
    }
  }
}
```

## 📊 Resultado dos Testes

```bash
PASS src/domain/entities/location.entity.spec.ts
PASS src/application/use-cases/create-location.use-case.spec.ts

Test Suites: 2 passed, 2 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        1.677 s
```

## 🔧 Estrutura de Testes

```
backend/
├── src/
│   ├── domain/
│   │   └── entities/
│   │       └── location.entity.spec.ts       ✅ Testes unitários
│   ├── application/
│   │   └── use-cases/
│   │       └── create-location.use-case.spec.ts  ✅ Testes unitários
│   └── ...
├── test/
│   └── locations.e2e-spec.ts                ✅ Testes E2E
└── package.json
```

## ✅ Checklist de Testes

- ✅ Location Entity
  - ✅ Criação válida
  - ✅ Validação de nome vazio
  - ✅ Validação de latitude
  - ✅ Validação de longitude
  - ✅ Validação de URL de imagem
  - ✅ Atualização correta

- ✅ CreateLocationUseCase
  - ✅ Use case definido
  - ✅ Criação de local com sucesso

## 🎯 Próximos Passos

### Testes a Adicionar
- [ ] Testes para UpdateLocationUseCase
- [ ] Testes para DeleteLocationUseCase
- [ ] Testes para GetLocationByIdUseCase
- [ ] Testes para ListLocationsUseCase
- [ ] Mais casos de erro

### Exemplo de Teste Adicional

```typescript
describe('DeleteLocationUseCase', () => {
  it('should throw error when location not found', async () => {
    const mockRepository: Partial<ILocationRepository> = {
      findById: jest.fn().mockResolvedValue(null),
    };

    const useCase = new DeleteLocationUseCase(mockRepository as any);
    
    await expect(useCase.execute('invalid-id'))
      .rejects
      .toThrow('Location not found');
  });
});
```

## 📚 Comandos Úteis

```bash
# Desenvolvimento
npm run start:dev       # Servidor com hot-reload
npm run test:watch      # Testes em watch mode

# Produção
npm run build           # Build do projeto
npm run test:cov        # Coverage report
npm run test:e2e        # Testes end-to-end

# Qualidade
npm run lint            # ESLint
npm run format          # Prettier
```

## 🐛 Troubleshooting

### Erro: "Cannot find module '@domain/...'"
**Solução:** Use `npm test` ao invés de `bun test`

### Erro: "this.locationRepository is undefined"
**Solução:** Adicione `@Injectable()` e `@Inject('ILocationRepository')` no use case

### Testes lentos
**Solução:** Use `npm run test:watch` para rodar apenas testes modificados

---

**✅ Todos os testes estão passando! Use `npm test` para executar.**

