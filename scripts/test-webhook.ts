import crypto from 'crypto';

// Dados de exemplo para testar o webhook
const testEvents = [
  {
    id: 'evt_test_deployment_created',
    type: 'deployment.created',
    createdAt: new Date().toISOString(),
    payload: {
      id: 'dpl_test123',
      projectId: 'prj_test456',
      teamId: 'team_test789',
      userId: 'user_test123',
      name: 'Test Project',
      url: 'https://test-project.vercel.app',
      status: 'created'
    },
    region: 'iad1'
  },
  {
    id: 'evt_test_deployment_succeeded',
    type: 'deployment.succeeded',
    createdAt: new Date().toISOString(),
    payload: {
      id: 'dpl_test123',
      projectId: 'prj_test456',
      teamId: 'team_test789',
      userId: 'user_test123',
      name: 'Test Project',
      url: 'https://test-project.vercel.app',
      status: 'succeeded'
    },
    region: 'iad1'
  },
  {
    id: 'evt_test_deployment_error',
    type: 'deployment.error',
    createdAt: new Date().toISOString(),
    payload: {
      id: 'dpl_test456',
      projectId: 'prj_test789',
      teamId: 'team_test123',
      userId: 'user_test456',
      name: 'Another Test Project',
      url: 'https://another-test.vercel.app',
      status: 'error'
    },
    region: 'iad1'
  }
];

async function testWebhook() {
  const webhookUrl = process.env.WEBHOOK_URL || 'http://localhost:3000/api/webhook';
  const secret = process.env.VERCEL_WEBHOOK_SECRET || 'test_secret';

  console.log('🧪 Testando webhook...');
  console.log(`📍 URL: ${webhookUrl}`);
  console.log(`🔑 Secret: ${secret}`);
  console.log('');

  for (const event of testEvents) {
    try {
      const payload = JSON.stringify(event);
      const signature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-vercel-signature': signature,
        },
        body: payload,
      });

      const result = await response.json();

      if (response.ok) {
        console.log(`✅ ${event.type} - Sucesso`);
        console.log(`   Event ID: ${event.id}`);
        console.log(`   Status: ${response.status}`);
      } else {
        console.log(`❌ ${event.type} - Erro`);
        console.log(`   Status: ${response.status}`);
        console.log(`   Error: ${JSON.stringify(result)}`);
      }
    } catch (error) {
      console.log(`❌ ${event.type} - Erro de conexão`);
      console.log(`   Error: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }

    console.log('');
  }

  console.log('🎉 Teste concluído!');
}

// Executar o teste se o script for chamado diretamente
if (require.main === module) {
  testWebhook().catch(console.error);
}

export { testWebhook }; 