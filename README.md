# Monitor de Builds Vercel

Um dashboard completo para monitorar o status de builds e deploys da Vercel em tempo real usando webhooks.

## 🚀 Funcionalidades

- **Webhook Receiver**: Endpoint para receber eventos da Vercel
- **Dashboard em Tempo Real**: Interface moderna para visualizar eventos
- **Filtros Avançados**: Filtre por tipo de evento, status, data, etc.
- **Estatísticas**: Visualize métricas de sucesso, falhas e pendências
- **Paginação**: Navegue pelos eventos com paginação
- **Segurança**: Validação de assinatura dos webhooks

## 🛠️ Tecnologias

- **Next.js 14** com App Router
- **TypeScript** para type safety
- **MongoDB** com Mongoose
- **Tailwind CSS** para estilização
- **Lucide React** para ícones
- **date-fns** para formatação de datas

## 📋 Pré-requisitos

- Node.js 18+
- MongoDB (local ou Atlas)
- Conta Vercel com plano Pro ou Enterprise

## ⚙️ Configuração

### 1. Clone e Instale

```bash
cd app
npm install
```

### 2. Configure as Variáveis de Ambiente

Copie o arquivo `env.example` para `.env.local`:

```bash
cp env.example .env.local
```

Edite o `.env.local` com suas configurações:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/vercel-build-status

# Vercel Webhook Secret (obtido ao criar o webhook na Vercel)
VERCEL_WEBHOOK_SECRET=your_webhook_secret_here
```

### 3. Configure o Webhook na Vercel

1. Acesse o [Dashboard da Vercel](https://vercel.com/dashboard)
2. Vá em **Settings** → **Webhooks**
3. Clique em **Create Webhook**
4. Configure:
   - **Events**: Selecione os eventos que deseja monitorar
   - **Project Scope**: Escolha os projetos
   - **Endpoint URL**: `https://seu-dominio.com/api/webhook`
5. Clique em **Create Webhook**
6. Copie o **Secret** e adicione ao `.env.local`

### 4. Execute o Projeto

```bash
npm run dev
```

Acesse `http://localhost:3000`

## 📊 Eventos Suportados

### Deployment Events
- `deployment.created` - Deploy iniciado
- `deployment.succeeded` - Deploy concluído com sucesso
- `deployment.error` - Deploy falhou
- `deployment.cancelled` - Deploy cancelado
- `deployment.promoted` - Deploy promovido

### Project Events
- `project.created` - Projeto criado
- `project.removed` - Projeto removido

### Security Events
- `attack.detected` - Ataque detectado pelo firewall

## 🔧 Estrutura do Projeto

```
src/
├── app/
│   ├── api/
│   │   ├── events/     # API para buscar eventos
│   │   └── webhook/    # Endpoint para webhooks
│   ├── page.tsx        # Dashboard principal
│   └── layout.tsx      # Layout da aplicação
├── components/
│   ├── EventCard.tsx   # Card de evento
│   ├── EventFilters.tsx # Filtros
│   └── StatsCard.tsx   # Estatísticas
├── lib/
│   └── mongodb.ts      # Conexão MongoDB
└── models/
    └── BuildEvent.ts   # Modelo de dados
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente no dashboard
3. Deploy automático

### Outras Plataformas

O projeto pode ser deployado em qualquer plataforma que suporte Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Segurança

- Validação de assinatura HMAC dos webhooks
- Conexão segura com MongoDB
- Rate limiting (recomendado para produção)
- CORS configurado adequadamente

## 📈 Monitoramento

O dashboard exibe:

- **Total de Eventos**: Contagem geral
- **Deploys Sucesso**: Deploys concluídos com sucesso
- **Deploys Falharam**: Deploys que falharam
- **Deploys Pendentes**: Deploys em andamento

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique se o MongoDB está rodando
2. Confirme se as variáveis de ambiente estão corretas
3. Verifique se o webhook está configurado corretamente na Vercel
4. Abra uma issue no GitHub

## 🔄 Atualizações

Para manter o projeto atualizado:

```bash
npm update
npm run build
```

---

Desenvolvido com ❤️ para monitorar builds da Vercel
