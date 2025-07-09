import crypto from 'crypto';

async function debugWebhook() {
  const webhookUrl = 'http://localhost:3000/api/webhook';
  const secret = 'test_secret';

  console.log('🔍 Debug webhook...');

  // Teste simples com evento básico
  const simpleEvent = {
    id: 'evt_debug_001',
    type: 'deployment.created',
    createdAt: new Date().toISOString(),
    payload: {
      id: 'dpl_debug_001',
      projectId: 'prj_debug_001',
      teamId: 'team_debug_001',
      userId: 'user_debug_001',
      name: 'Debug Project',
      url: 'https://debug-project.vercel.app',
      status: 'created'
    },
    region: 'iad1'
  };

  try {
    const payload = JSON.stringify(simpleEvent);
    console.log('📤 Payload:', payload);
    
    const signature = crypto
      .createHmac('sha1', secret)
      .update(payload)
      .digest('hex');
    
    console.log('🔐 Signature:', signature);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-vercel-signature': signature,
      },
      body: payload,
    });

    const result = await response.text();
    console.log('📥 Response Status:', response.status);
    console.log('📥 Response Body:', result);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

debugWebhook().catch(console.error); 