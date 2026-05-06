# Teste Prático - Cadastro de Pontos Turísticos

## Sobre

Esta solução foi desenvolvida para o teste prático de cadastro e listagem de pontos turísticos.

Escolhi uma estrutura em camadas, com backend e frontend separados, para manter responsabilidades claras e facilitar evolução do projeto.

## Tecnologias

### Backend
- C#
- ASP.NET Core Web API
- Entity Framework Core
- SQLite

### Frontend
- React
- Vite
- JavaScript
- CSS

### Integrações externas
- API do IBGE para carregar cidades a partir do estado selecionado

## Como executar

### Requisitos
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js LTS](https://nodejs.org)

### 1. Backend
```bash
cd backend/PontosTuristicos
dotnet restore
dotnet build
dotnet run
```

API em:

```
http://localhost:5226
```

### 2. Frontend

Com a API já em execução:

```bash
cd frontend
npm install
npm run dev
```

Frontend em:

```
http://localhost:5173
```

## Funcionalidades entregues

- Cadastro de ponto turístico com nome, descrição, localização, cidade e estado
- Descrição limitada a 100 caracteres
- Estado em combo/dropdown
- Cidade carregada pela API do IBGE conforme o estado
- Listagem inicial com ordenação decrescente por data de inclusão
- Busca por nome, descrição e localização
- Paginação da listagem
- Exibição de detalhes do item selecionado
- Mensagens para estado vazio e para falha de conexão com a API
- Área de logotipo nas telas principais, conforme o modelo do teste

## Decisões de implementação

### Estrutura da aplicação
Mantive backend e frontend em projetos separados para isolar responsabilidades e facilitar manutenção.

### Banco de dados
Usei SQLite para simplificar a execução local, sem dependência de instalação externa.

Também optei por `EnsureCreated` no contexto deste teste: o banco é criado automaticamente na primeira execução. Como é uma entrega de avaliação, essa abordagem atende bem sem exigir passos extras de configuração.

### Contratos de entrada
No backend, a API recebe DTOs de entrada (`CriarPontoTuristicoRequest` e `AtualizarPontoTuristicoRequest`) em vez do model direto. Isso evita que campos controlados pelo servidor (como `Id` e `DataInclusao`) venham no payload do cliente.

### CORS
O CORS foi restringido para `http://localhost:5173`, evitando abrir a API para qualquer origem sem necessidade.

### Paginação defensiva
O serviço limita `tamanhoPagina` entre 1 e 50 e usa 10 como padrão quando o valor sai da faixa.

### Integração de cidades
A cidade não ficou como texto livre. Preferi usar a API do IBGE para manter dados mais consistentes. Essa parte depende de conexão com a internet.

### Comunicação HTTP no frontend
Usei `fetch` nativo em vez de adicionar axios, já que os requisitos da aplicação são atendidos sem dependências extras.

### Validação no frontend
Campos obrigatórios usam validação nativa (`required`) e limites de tamanho (`maxLength`). Assim, erros básicos de preenchimento são barrados antes de chamar a API.

### Interface
Segui o modelo do PDF do teste como referência de estrutura e fluxo, com ajustes visuais leves para melhorar legibilidade sem fugir da proposta.

## Estrutura de pastas

```
backend/
  PontosTuristicos/

frontend/
  src/
```

## Fechamento

O foco foi entregar todos os requisitos obrigatórios com execução simples, organização clara e decisões técnicas objetivas para o contexto do teste.
