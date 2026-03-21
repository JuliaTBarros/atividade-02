# Gerenicamento de Produtos

Uma aplicação frontend moderna construída com React, TypeScript e Vite. Apresenta um sistema completo com autenticação, gerenciamento de produtos e navegação intuitiva.

## 🚀 Sobre o Projeto

### Principais Características

- ✨ **Autenticação Segura** - Sistema de login e registro de usuários
- 📦 **Gerenciamento de Produtos** - Visualização e gerenciamento de catálogo de produtos
- 🎨 **Interface Modular** - Componentes reutilizáveis com design system consistente
- 🌓 **Tema Dinâmico** - Suporte para modo claro e escuro
- 📱 **Design Responsivo** - Totalmente adaptado para dispositivos móveis e desktop
- ⚡ **Performance Otimizada** - Vite para builds rápidos e HMR instantâneo
- 🧭 **Roteamento Avançado** - TanStack Router para navegação eficiente

## 📋 Stack Tecnológico

### Frontend

- **React 19** - Biblioteca UI com suporte a Hooks
- **TypeScript** - Tipagem estática para segurança
- **Vite** - Build tool ultra-rápido
- **TailwindCSS** - Framework CSS utilitário
- **ShadcnUI** - Componentes de UI de alta qualidade
- **React Router (TanStack)** - Roteamento file-based

### Dependências Principais

- `@tanstack/react-router` - Roteamento com suporte a type-safety
- `tailwindcss` e `@tailwindcss/vite` - Estilização utilitária
- `react-dom` - Renderização no DOM
- `lucide-react` - Ícones SVG
- `next-themes` - Gerenciamento de temas
- `sonner` - Notificações toast

### Ferramentas de Desenvolvimento

- **ESLint** - Linting de código
- **TypeScript** - Verificação de tipos
- **SWC** - Compilador JavaScript super rápido
- **Bun** - Runtime e package manager

## 📂 Estrutura do Projeto

```
atividade-02/
├── packages/
│   └── pitang-frontend/          # Aplicação principal
│       ├── src/
│       │   ├── features/          # Funcionalidades organizadas por domínio
│       │   │   ├── auth/          # Autenticação (login, registro)
│       │   │   ├── navigation/    # Componentes de navegação
│       │   │   └── products/      # Gerenciamento de produtos
│       │   ├── routes/            # Estrutura de rotas file-based
│       │   │   ├── _auth/         # Rotas de autenticação
│       │   │   ├── dashboard/     # Dashboard principal
│       │   │   └── product/       # Detalhes do produto
│       │   ├── shared/            # Código compartilhado
│       │   │   ├── hooks/         # Custom hooks
│       │   │   ├── lib/           # Utilitários
│       │   │   ├── types/         # Tipos globais
│       │   │   └── ui/            # Componentes UI base
│       │   ├── app/               # Configuração da aplicação
│       │   ├── main.tsx           # Entrada da aplicação
│       │   └── index.css          # Estilos globais
│       ├── package.json           # Dependências
│       ├── vite.config.ts         # Configuração Vite
│       ├── tsconfig.json          # Configuração TypeScript
│       └── README.md              # Documentação do frontend
└── README.md                      # Este arquivo
```

## 🎯 Arquitetura

### Organização por Domínios (Features)

O projeto segue a estrutura de **Feature-Based Organization**, onde cada funcionalidade é auto-contida:

```
features/
├── auth/
│   ├── api/           # Chamadas de API de autenticação
│   ├── hooks/         # Custom hooks (useAuth)
│   ├── model/         # Tipos e interfaces
│   └── ui/            # Componentes (LoginForm, SignupForm)
├── navigation/
│   └── ui/            # Componentes de navegação (Sidebar, NavBar)
└── products/
    ├── api/           # Chamadas de API de produtos
    ├── model/         # Tipos de produtos
    └── ui/            # Componentes de listagem
```

### Shared Resources

Componentes e utilitários reutilizáveis:

- `shared/ui/` - Componentes base (Button, Input, Card, Table, etc)
- `shared/hooks/` - Custom hooks (useMobile, etc)
- `shared/lib/` - Funções utilitárias
- `shared/types/` - Tipos globais

## 🛠️ Instalação e Setup

### Pré-requisitos

- **Node.js** 18+ ou **Bun**
- **npm**, **yarn**, **pnpm** ou **bun**

### Passos

1. **Clone o repositório**

```bash
git clone https://github.com/JuliaTBarros/atividade-02
cd atividade-02
```

2. **Instale as dependências**

```bash
bun install
# ou com npm
npm install
```

3. **Inicie o servidor de desenvolvimento**

```bash
bun dev
# ou com npm
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
bun dev          # Inicia o servidor de desenvolvimento com HMR

# Compilação
bun compile      # Verifica tipos TypeScript
bun build        # Build otimizado para produção

# Qualidade
bun lint         # Executa ESLint

# Preview
bun preview      # Visualiza a build de produção
```

## 🔐 Autenticação

O sistema de autenticação inclui:

- ✅ **Login** - Autenticação de usuários existentes
- ✅ **Registro** - Criação de novas contas
- ✅ **Hook useAuth** - Context para estado global de autenticação

Arquivos principais:

- `features/auth/ui/login-form.tsx` - Formulário de login
- `features/auth/ui/signup-form.tsx` - Formulário de registro
- `features/auth/hooks/use-auth.ts` - Hook de contexto

## 📦 Gerenciamento de Produtos

Sistema completo de exibição e gerenciamento de produtos:

- 📋 **Listagem** - Dashboard com lista de produtos
- 🔍 **Detalhes** - Página individual de produto
- 📊 **API** - Integração com backend (`features/products/api/`)

## 🎨 Design System

Utiliza componentes **ShadcnUI** com **TailwindCSS**, incluindo:

- Buttons
- Forms (Input, Label, Field)
- Cards
- Tables
- Navigation (Sidebar, Breadcrumb)
- Dropdowns e Menus
- Paginação
- Tooltips
- Notificações (Sonner)

## 🌓 Temas

O projeto suporta tema claro e escuro através de `next-themes`:

```typescript
// Trocar tema
import { useTheme } from 'next-themes'

const { theme, setTheme } = useTheme()
setTheme('dark') // ou 'light', 'system'
```

## 📱 Responsividade

O projeto é completamente responsivo com breakpoints do TailwindCSS:

- `sm` - 640px
- `md` - 768px
- `lg` - 1024px
- `xl` - 1280px
- `2xl` - 1536px

Custom hook para detectar dispositivos móveis:

```typescript
import { useMobile } from '@/shared/hooks/use-mobile'

const isMobile = useMobile()
```

## 🚀 Build e Deploy

### Build para Produção

```bash
bun build
# Gera arquivos otimizados em `dist/`
```

### Preview da Build

```bash
bun preview
# Simula o ambiente de produção localmente
```

### Deploy (Vercel)

O projeto inclui configuração para Vercel (`vercel.json`):

```bash
# Deploy automático
vercel
```

## 📚 Rotas da Aplicação


| Rota                  | Descrição                     |
| --------------------- | ------------------------------- |
| `/`                   | Página inicial                 |
| `/login`              | Página de login                |
| `/register`           | Página de registro             |
| `/dashboard`          | Dashboard principal (protegido) |
| `/dashboard/products` | Listagem de produtos            |
| `/product/:id`        | Detalhes do produto             |
| `/about`              | Página sobre                   |

## 🔧 Configurações

### TypeScript

- `tsconfig.json` - Configuração base
- `tsconfig.app.json` - Configuração da app
- `tsconfig.node.json` - Configuração do Node

### Vite

- Path alias: `@` aponta para `src/`
- Hot Module Replacement (HMR) habilitado
- Code splitting automático com TanStack Router

### ESLint

- Regras recomendadas do TypeScript
- Plugins React Hooks
- React Refresh

## 📝 Padrões de Código

### Componentes

```typescript
// Componentes são TypeScript e nomeados em PascalCase
export function ComponentName() {
  return <div>Conteúdo</div>
}
```

### Custom Hooks

```typescript
// Hooks em camelCase com prefixo 'use'
export function useExample() {
  // lógica
}
```

### Tipos

```typescript
// Tipos em uma pasta separada com .types.ts
export interface User {
  id: string
  name: string
}
```

## 🐛 Troubleshooting

### Porta 5173 já está em uso

```bash
# Especifique outra porta
bun dev --port 3000
```

### Problemas de HMR

Limpe o cache e reinstale:

```bash
rm -rf node_modules .vite dist
bun install
bun dev
```

### TypeScript errors

```bash
bun compile
```
