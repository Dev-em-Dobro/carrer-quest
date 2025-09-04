# Career Quest - Sistema de Recrutamento Inteligente

🎯 **Um sistema moderno de busca de vagas de programação integrado com LinkedIn**

## ✨ Características

- 🔍 **Busca inteligente de vagas** - Filtros personalizáveis e palavras-chave específicas
- 🎨 **Design System moderno** - Interface dark com cores roxas e tipografia profissional
- 📱 **Responsivo** - Funciona perfeitamente em desktop, tablet e mobile
- ⚡ **Performance otimizada** - Build com Vite e TypeScript
- 🔗 **Integração LinkedIn** - Preparado para consumir API oficial do LinkedIn

## 🛠️ Stack Tecnológica

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Styling**: CSS nativo com Design System
- **Fonts**: Inter, Press Start 2P, Fira Code

## 🚀 Como executar

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🎨 Design System

### Cores

#### Brand (Roxo)
- **Primary**: #9d4edd
- **Light**: #b84eeb  
- **Dark**: #8b3ed1
- **Variações**: 50, 100, 200, 300, 500, 700, 900

#### Accent Colors
- **Verde**: #0CF2A0
- **Laranja**: #e34c26
- **Azul**: #1572b6
- **Amarelo**: #f7df1e

#### Backgrounds
- **Primary**: #0a0a0a (preto)
- **Secondary**: #1a1a1a (cinza escuro)
- **Tertiary**: #172122 (cinza médio)

### Tipografia
- **Sans**: Inter, Segoe UI, Roboto
- **Retro**: Press Start 2P
- **Mono**: Fira Code, Consolas, Monaco

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── VagaCard.tsx    # Card individual da vaga
│   ├── VagasList.tsx   # Lista de vagas
│   └── FiltrosVagas.tsx # Componente de filtros
├── hooks/              # Custom hooks
│   └── useVagas.ts     # Hook para gerenciar estado das vagas
├── services/           # Serviços externos
│   └── linkedin.ts     # Integração com LinkedIn API
├── styles/             # Estilos e design system
│   ├── globals.css     # CSS global com variáveis
│   └── theme.ts        # Tema em TypeScript
├── types/              # Definições de tipos
│   └── vaga.ts         # Interface das vagas
└── utils/              # Utilitários
```

## 🔧 Funcionalidades Implementadas

### ✅ Concluídas
- [x] Configuração inicial com Vite + React + TypeScript
- [x] Design system completo com cores e tipografia
- [x] Integração base com API do LinkedIn (com dados mockados)
- [x] Componente de listagem de vagas responsivo
- [x] Sistema de filtros avançado
- [x] Interface de usuário moderna e intuitiva
- [x] Build e deploy prontos

### 🔄 Próximas Funcionalidades
- [ ] Autenticação OAuth 2.0 com LinkedIn
- [ ] Integração real com LinkedIn API
- [ ] Sistema de favoritos
- [ ] Modal de detalhes da vaga
- [ ] Candidatura direta

## 🎯 Próximos Passos

### LinkedIn API Integration

Para conectar com a API real do LinkedIn:

1. **Registrar aplicação**: https://www.linkedin.com/developers/
2. **Configurar OAuth 2.0**:
   - Client ID e Client Secret
   - Redirect URI: `http://localhost:5173/auth/callback`
3. **Implementar backend proxy** para autenticação
4. **Atualizar serviço** em `src/services/linkedin.ts`

### Exemplo de configuração OAuth:

```typescript
const linkedinConfig = {
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'http://localhost:5173/auth/callback',
  scope: 'r_liteprofile r_emailaddress'
};
```

## 🔗 Links Úteis

- [LinkedIn API Documentation](https://docs.microsoft.com/en-us/linkedin/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

**Desenvolvido com ♥ usando React, TypeScript e LinkedIn API**
