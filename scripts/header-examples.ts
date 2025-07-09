import crypto from 'crypto';

// Exemplo 1: Verificação básica de headers
function verifyBasicHeaders(req: any) {
  console.log('=== Verificação Básica de Headers ===');
  
  // Verificar se o header existe
  const signature = req.headers['x-vercel-signature'];
  if (!signature) {
    console.log('❌ Header x-vercel-signature não encontrado');
    return false;
  }
  
  console.log('✅ Header x-vercel-signature encontrado:', signature);
  return true;
}

// Exemplo 2: Verificação de assinatura com SHA1 (como no seu exemplo)
async function verifySignatureSHA1(req: any) {
  console.log('\n=== Verificação de Assinatura SHA1 ===');
  
  const payload = await req.text();
  const signature = crypto
    .createHmac('sha1', process.env.WEBHOOK_SECRET || 'test_secret')
    .update(payload)
    .digest('hex');
  
  const headerSignature = req.headers['x-vercel-signature'];
  
  console.log('Payload:', payload.substring(0, 100) + '...');
  console.log('Calculated Signature:', signature);
  console.log('Header Signature:', headerSignature);
  console.log('Signatures Match:', signature === headerSignature);
  
  return signature === headerSignature;
}

// Exemplo 3: Verificação de assinatura com SHA256 (como no webhook atual)
async function verifySignatureSHA256(req: any) {
  console.log('\n=== Verificação de Assinatura SHA256 ===');
  
  const payload = await req.text();
  const signature = crypto
    .createHmac('sha256', process.env.VERCEL_WEBHOOK_SECRET || 'test_secret')
    .update(payload)
    .digest('hex');
  
  const headerSignature = req.headers['x-vercel-signature'];
  
  console.log('Payload:', payload.substring(0, 100) + '...');
  console.log('Calculated Signature:', signature);
  console.log('Header Signature:', headerSignature);
  console.log('Signatures Match:', signature === headerSignature);
  
  return signature === headerSignature;
}

// Exemplo 4: Verificação de múltiplos headers
function verifyMultipleHeaders(req: any) {
  console.log('\n=== Verificação de Múltiplos Headers ===');
  
  const requiredHeaders = [
    'x-vercel-signature',
    'content-type',
    'user-agent'
  ];
  
  const missingHeaders = requiredHeaders.filter(header => !req.headers[header]);
  
  if (missingHeaders.length > 0) {
    console.log('❌ Headers faltando:', missingHeaders);
    return false;
  }
  
  console.log('✅ Todos os headers necessários encontrados');
  console.log('Content-Type:', req.headers['content-type']);
  console.log('User-Agent:', req.headers['user-agent']);
  
  return true;
}

// Exemplo 5: Verificação de headers com valores específicos
function verifyHeaderValues(req: any) {
  console.log('\n=== Verificação de Valores de Headers ===');
  
  // Verificar se Content-Type é application/json
  const contentType = req.headers['content-type'];
  if (!contentType || !contentType.includes('application/json')) {
    console.log('❌ Content-Type deve ser application/json');
    return false;
  }
  
  // Verificar se User-Agent contém informações específicas
  const userAgent = req.headers['user-agent'];
  if (userAgent && userAgent.includes('Vercel')) {
    console.log('✅ User-Agent parece ser da Vercel');
  } else {
    console.log('⚠️ User-Agent não parece ser da Vercel');
  }
  
  return true;
}

// Exemplo 6: Função completa de verificação
async function completeHeaderVerification(req: any) {
  console.log('\n=== Verificação Completa de Headers ===');
  
  try {
    // 1. Verificar se todos os headers necessários existem
    if (!verifyBasicHeaders(req)) {
      return { success: false, error: 'Headers básicos não encontrados' };
    }
    
    // 2. Verificar valores dos headers
    if (!verifyHeaderValues(req)) {
      return { success: false, error: 'Valores de headers inválidos' };
    }
    
    // 3. Verificar assinatura
    const signatureValid = await verifySignatureSHA256(req);
    if (!signatureValid) {
      return { success: false, error: 'Assinatura inválida' };
    }
    
    return { success: true, message: 'Todos os headers verificados com sucesso' };
    
  } catch (error) {
    return { success: false, error: `Erro na verificação: ${error}` };
  }
}

// Exemplo de uso
async function demonstrateHeaderVerification() {
  console.log('🔍 Exemplos de Verificação de Headers\n');
  
  // Simular uma requisição
  const mockRequest = {
    headers: {
      'x-vercel-signature': 'test_signature_123',
      'content-type': 'application/json',
      'user-agent': 'Vercel-Webhook/1.0'
    },
    text: async () => JSON.stringify({ test: 'data' })
  };
  
  // Executar exemplos
  verifyBasicHeaders(mockRequest);
  await verifySignatureSHA1(mockRequest);
  await verifySignatureSHA256(mockRequest);
  verifyMultipleHeaders(mockRequest);
  verifyHeaderValues(mockRequest);
  
  const result = await completeHeaderVerification(mockRequest);
  console.log('\nResultado final:', result);
}

// Executar se chamado diretamente
if (require.main === module) {
  demonstrateHeaderVerification().catch(console.error);
}

export {
  verifyBasicHeaders,
  verifySignatureSHA1,
  verifySignatureSHA256,
  verifyMultipleHeaders,
  verifyHeaderValues,
  completeHeaderVerification
}; 