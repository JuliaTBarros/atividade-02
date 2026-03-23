# Gerenciamento de Produtos
Aplicacao frontend em React para autenticação, visualização de produtos e módulos de usuários/tarefas, usando TanStack Router e consumo da API pública `dummyjson.com`.
## Arquitetura
Este projeto segue **Feature-Based Architecture**.
A organizacao principal do codigo acontece por dominio de negocio (features), e nao por tipo tecnico global.
Cada feature concentra sua própria regra de negócio (API, tipos, hooks e UI), enquanto:
- `src/routes` faz o wiring das rotas
- `src/shared` contem codigo reutilizavel e agnóstico de dominio
## Features atuais
- `auth`
- `dashboard`
- `home`
- `navigation`
- `products`
- `todos`
- `users`
## Estrutura principal
```text
packages/pitang-frontend/
|- src/
|  |- features/
|  |  |- auth/
|  |  |- dashboard/
|  |  |- home/
|  |  |- navigation/
|  |  |- products/
|  |  |- todos/
|  |  \- users/
|  |- routes/
|  \- shared/
|- package.json
|- vite.config.ts
\- eslint.config.js
```
## Stack atual
- React 19
- TypeScript 5
- Vite 7
- TanStack Router (file-based routing)
- Tailwind CSS 4 + componentes em `src/shared/ui`
- Recharts
- Sonner
- ESLint 9
- Bun
## Setup
### Pre-requisitos
- Bun instalado
### Instalar dependencias (na raiz)
```bash
bun install
```
### Rodar em desenvolvimento (na raiz)
```bash
bun run dev
```
Aplicacao: `http://localhost:5173`
## Scripts
### Scripts da raiz (`package.json`)
```bash
bun run dev
bun run build
bun run preview
bun run lint
```
### Type-check do frontend
```bash
cd packages/pitang-frontend
bun run compile
```
## Rotas atuais
Com base em `packages/pitang-frontend/src/routes` e `packages/pitang-frontend/src/routeTree.gen.ts`:
| Rota | Descricao |
| --- | --- |
| `/` | Home |
| `/login` | Login |
| `/register` | Registro |
| `/dashboard` | Dashboard (protegido) |
| `/dashboard/products` | Produtos |
| `/dashboard/users` | Usuarios |
| `/dashboard/todos` | Tarefas |
| `/product/:id` | Detalhes de produto |
| `/About` | Pagina About |
> Observacao: a rota de about atualmente e `'/About'` (A maiusculo), pois o arquivo esta em `src/routes/About.tsx`.
## Autenticacao
Fluxo implementado em `packages/pitang-frontend/src/features/auth/hooks/use-auth.ts`:
- login via `POST https://dummyjson.com/auth/login`
- token salvo em cookie `@pitang/accessToken`
- validacao da sessao via `GET https://dummyjson.com/auth/me`
- protecao de rota no layout de `dashboard`
## Fontes de dados
Dados consumidos da API publica `https://dummyjson.com`:
- `products`
- `users`
- `todos`
## Configuracoes tecnicas
- alias `@` apontando para `src` em `packages/pitang-frontend/vite.config.ts`
- geracao automatica de arvore de rotas com plugin TanStack Router
- lint em `packages/pitang-frontend/eslint.config.js`
- rotas em `src/routes` com responsabilidade de wiring para screens em `src/features/*/ui`
