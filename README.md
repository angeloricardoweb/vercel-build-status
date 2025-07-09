# Vercel Build Status Webhook

Um sistema completo para receber e processar webhooks da Vercel, com armazenamento em MongoDB e expiração automática de eventos.

A complete system to receive and process Vercel webhooks, with MongoDB storage and automatic event expiration.

## 📋 Índice

- [Funcionalidades](#funcionalidades)
- [Arquitetura](#arquitetura)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Troubleshooting](#troubleshooting)

## ✨ Funcionalidades

### 🔗 Webhook da Vercel
- ✅ Recebe eventos da Vercel via webhook
- ✅ Validação de assinatura SHA1
- ✅ Suporte a todos os tipos de eventos (deployment, project, attack)
- ✅ Parsing automático do payload aninhado
- ✅ Tratamento de eventos duplicados

### 💾 Armazenamento
- ✅ MongoDB com Mongoose
- ✅ Índices otimizados para performance
- ✅ Expiração automática após 25 horas (TTL Index)
- ✅ Estrutura de dados flexível

### 📊 Monitoramento
- ✅ API de estatísticas em tempo real
- ✅ Logs detalhados de eventos
- ✅ Script de limpeza manual
- ✅ Dashboard de eventos

## 🏗️ Arquitetura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vercel        │    │   Next.js API   │    │   MongoDB       │
│   Webhook       │───▶│   Route Handler │───▶│   BuildEvents   │
│   Events        │    │   Validation    │    │   Collection    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   Statistics    │
                       │   API           │
                       └─────────────────┘
```

### Fluxo de Dados

1. **Vercel envia webhook** → Evento de deployment/project/attack
2. **Validação de assinatura** → SHA1 HMAC verification
3. **Parsing do payload** → Extração de campos aninhados
4. **Salvamento no MongoDB** → Com TTL de 25 horas
5. **Resposta de sucesso** → Status 200/409 para duplicados

## 🚀 Instalação

### Pré-requisitos

- Node.js 18+ 
- MongoDB (local ou Atlas)
- Conta na Vercel (para webhooks)

### 1. Clone o repositório

```bash
git clone <repository-url>
cd vercel-build-status
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local`:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/vercel-build-status

# Vercel Webhook Secret (obtido ao criar o webhook na Vercel)
VERCEL_WEBHOOK_SECRET=your_webhook_secret_here

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

## ⚙️ Configuração

### Configurando Webhook na Vercel

1. **Acesse o Dashboard da Vercel**
   - Vá para [vercel.com/dashboard](https://vercel.com/dashboard)
   - Selecione seu time/account

2. **Configure o Webhook**
   - Settings → Webhooks
   - Clique em "Create Webhook"

3. **Selecione os Eventos**
   - ✅ `deployment.created`
   - ✅ `deployment.succeeded`
   - ✅ `deployment.error`
   - ✅ `deployment.cancelled`
   - ✅ `deployment.promoted`
   - ✅ `project.created`
   - ✅ `project.removed`
   - ✅ `attack.detected`

4. **Configure a URL**
   - **Desenvolvimento**: `http://localhost:3000/api/webhook`
   - **Produção**: `https://seu-dominio.com/api/webhook`

5. **Guarde o Secret**
   - Copie o secret fornecido pela Vercel
   - Adicione ao `.env.local` como `VERCEL_WEBHOOK_SECRET`

### Configurando MongoDB

#### Opção 1: MongoDB Local

```bash
# Instalar MongoDB
brew install mongodb-community

# Iniciar MongoDB
brew services start mongodb-community

# Criar database
mongosh
use vercel-build-status
```

#### Opção 2: MongoDB Atlas

1. Crie uma conta em [mongodb.com](https://mongodb.com)
2. Crie um cluster gratuito
3. Obtenha a connection string
4. Configure no `.env.local`

## 📖 Uso

### Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start

# Testar webhook
npm run test:webhook

# Limpeza manual de eventos
npm run cleanup:events

# Linting
npm run lint
```

### Testando o Webhook

```bash
# Teste com eventos simulados
npm run test:webhook

# Teste com evento único
npx tsx scripts/test-webhook-unique.ts
```

### Monitorando Eventos

```bash
# Ver estatísticas
curl http://localhost:3000/api/stats

# Ver eventos salvos
curl http://localhost:3000/api/events
```

## 🔌 API Endpoints

### POST `/api/webhook`
**Recebe webhooks da Vercel**

- **Headers obrigatórios**: `x-vercel-signature`
- **Content-Type**: `application/json`
- **Respostas**:
  - `200`: Evento salvo com sucesso
  - `409`: Evento duplicado
  - `401`: Assinatura inválida
  - `400`: Payload inválido
  - `500`: Erro interno

### GET `/api/webhook`
**Verifica status do endpoint**

```json
{
  "message": "Vercel Build Status Webhook Endpoint",
  "status": "active",
  "supportedEvents": [
    "deployment.created",
    "deployment.succeeded",
    "deployment.error",
    "deployment.cancelled",
    "deployment.promoted",
    "project.created",
    "project.removed",
    "attack.detected"
  ]
}
```

### GET `/api/events`
**Lista eventos salvos**

**Query Parameters**:
- `page`: Número da página (padrão: 1)
- `limit`: Itens por página (padrão: 20)
- `type`: Filtrar por tipo de evento
- `status`: Filtrar por status

### GET `/api/stats`
**Estatísticas dos eventos**

```json
{
  "success": true,
  "stats": {
    "total": 150,
    "last24h": 25,
    "expiringSoon": 5,
    "byType": [
      { "_id": "deployment.created", "count": 50 },
      { "_id": "deployment.succeeded", "count": 45 }
    ],
    "byRegion": [
      { "_id": "iad1", "count": 100 },
      { "_id": "gru1", "count": 50 }
    ],
    "recent": [...]
  },
  "expiration": {
    "ttlHours": 25,
    "description": "Eventos expiram automaticamente após 25 horas"
  }
}
```

## 📁 Estrutura do Projeto

```
vercel-build-status/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── webhook/
│   │   │   │   └── route.ts          # Webhook handler
│   │   │   ├── events/
│   │   │   │   └── route.ts          # Lista eventos
│   │   │   └── stats/
│   │   │       └── route.ts          # Estatísticas
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── EventCard.tsx
│   │   ├── EventFilters.tsx
│   │   └── StatsCard.tsx
│   ├── lib/
│   │   └── mongodb.ts                # Conexão MongoDB
│   └── models/
│       └── BuildEvent.ts             # Modelo de dados
├── scripts/
│   ├── test-webhook.ts               # Teste de webhook
│   └── cleanup-events.ts             # Limpeza manual
├── public/
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Modelo de Dados

### BuildEvent Schema

```typescript
interface IBuildEvent {
  eventId: string;           // ID único do evento
  type: string;              // Tipo do evento (deployment.created, etc.)
  createdAt: Date;           // Data de criação
  payload: Record<string, unknown>; // Payload completo da Vercel
  region: string;            // Região do evento
  projectId?: string;        // ID do projeto
  deploymentId?: string;     // ID do deployment
  status?: string;           // Status do evento
  url?: string;              // URL do deployment
  meta?: {                   // Metadados extraídos
    teamId?: string;
    userId?: string;
    projectName?: string;
    deploymentUrl?: string;
    target?: string;
    alias?: string[];
    framework?: string;
    attackType?: string;
    mitigated?: boolean;
    ipAddress?: string;
    userAgent?: string;
  };
  expiresAt: Date;           // Data de expiração (25h)
}
```

### Índices MongoDB

- `eventId`: Único
- `type`: Performance
- `createdAt`: Ordenação
- `projectId`: Filtros
- `deploymentId`: Filtros
- `status`: Filtros
- `meta.teamId`: Filtros
- `expiresAt`: TTL (25 horas)

## 🛠️ Troubleshooting

### Problemas Comuns

#### 1. "Invalid signature" (401)
**Causa**: Secret do webhook incorreto
**Solução**: 
```bash
# Verificar se o secret está correto
echo $VERCEL_WEBHOOK_SECRET

# Reiniciar servidor com secret
VERCEL_WEBHOOK_SECRET=your_secret npm run dev
```

#### 2. "MongoDB connection failed"
**Causa**: MongoDB não está rodando
**Solução**:
```bash
# Verificar se MongoDB está rodando
brew services list | grep mongodb

# Iniciar MongoDB
brew services start mongodb-community
```

#### 3. "Duplicate event" (409)
**Causa**: Evento já foi processado
**Solução**: Normal, o evento foi processado com sucesso

#### 4. "BuildEvent validation failed"
**Causa**: Campos obrigatórios faltando
**Solução**: Verificar se o payload da Vercel está correto

### Logs Úteis

```bash
# Ver logs do servidor
npm run dev

# Ver eventos no MongoDB
mongosh
use vercel-build-status
db.buildevents.find().sort({createdAt: -1}).limit(10)

# Ver índices
db.buildevents.getIndexes()
```

### Debug

```bash
# Testar conexão MongoDB
npx tsx scripts/test-mongodb.ts

# Testar webhook com payload específico
npx tsx scripts/debug-webhook.ts

# Ver estatísticas detalhadas
curl http://localhost:3000/api/stats | jq
```

## 🔒 Segurança

### Validação de Assinatura

O webhook valida a assinatura usando HMAC SHA1:

```typescript
const signature = crypto
  .createHmac('sha1', secret)
  .update(payload)
  .digest('hex');
```

### Headers Obrigatórios

- `x-vercel-signature`: Assinatura HMAC SHA1
- `content-type`: `application/json`

### Rate Limiting

Considere implementar rate limiting para produção:

```typescript
// Exemplo com express-rate-limit
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por window
});
```

## 🚀 Deploy

### Vercel (Recomendado)

1. **Conecte o repositório**
   ```bash
   vercel --prod
   ```

2. **Configure as variáveis de ambiente**
   - `MONGODB_URI`
   - `VERCEL_WEBHOOK_SECRET`

3. **Atualize a URL do webhook**
   - Use a URL de produção no painel da Vercel

### Outras Plataformas

- **Railway**: `railway up`
- **Render**: Conecte via GitHub
- **Heroku**: `git push heroku main`

## 📈 Monitoramento

### Métricas Importantes

- **Eventos por hora**: Monitorar volume
- **Taxa de erro**: Webhook failures
- **Tempo de resposta**: Performance
- **Uso de disco**: MongoDB storage

### Alertas Recomendados

- Webhook retornando 5xx
- MongoDB connection failures
- Eventos não sendo salvos
- Storage > 80%

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

- **Issues**: [GitHub Issues](https://github.com/username/vercel-build-status/issues)
- **Documentação**: [Vercel Webhooks](https://vercel.com/docs/integrations/webhooks)
- **Comunidade**: [Vercel Discord](https://discord.gg/vercel)

---

**Desenvolvido com ❤️ para a comunidade Vercel**
