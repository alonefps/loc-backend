# Contributing Guide

## Commits Semânticos

Este projeto segue a convenção de commits semânticos. Use os seguintes prefixos:

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Alterações na documentação
- `style:` - Formatação, ponto e vírgula faltando, etc
- `refactor:` - Refatoração de código
- `test:` - Adição ou correção de testes
- `chore:` - Atualizações de build, configurações, etc

### Exemplos:
```bash
git commit -m "feat: add location validation"
git commit -m "fix: correct latitude range validation"
git commit -m "docs: update API documentation"
git commit -m "refactor: improve use case structure"
```

## Pull Requests

1. Crie uma branch descritiva
2. Implemente suas mudanças
3. Adicione testes se aplicável
4. Execute os linters e testes
5. Faça um PR descrevendo suas mudanças

## Estrutura de Código

### Criando uma Nova Entidade

1. Crie a entidade em `src/domain/entities/`
2. Defina a interface do repositório em `src/domain/repositories/`
3. Crie os DTOs em `src/domain/dtos/`
4. Implemente os use cases em `src/application/use-cases/`
5. Crie o modelo do TypeORM em `src/infrastructure/database/models/`
6. Implemente o mapper em `src/infrastructure/database/mappers/`
7. Implemente o repositório em `src/infrastructure/database/repositories/`
8. Crie os DTOs de request/response em `src/infrastructure/http/dtos/`
9. Crie o controller em `src/infrastructure/http/controllers/`
10. Configure o módulo em `src/shared/modules/`

### Boas Práticas

- Mantenha as funções pequenas e focadas
- Use nomes descritivos
- Valide dados na camada de domínio
- Separe responsabilidades entre camadas
- Escreva testes unitários e e2e
- Documente APIs com Swagger
- Use TypeScript de forma estrita
- Evite any quando possível


