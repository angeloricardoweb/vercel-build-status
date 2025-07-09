import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/lib/mongodb';
import BuildEvent from '@/models/BuildEvent';

// Função para verificar a assinatura do webhook (SHA1 conforme documentação Vercel)
function verifySignature(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha1', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Função para extrair informações úteis do payload conforme documentação Vercel
function extractEventInfo(event: {
  id: string;
  type: string;
  createdAt: string | number;
  payload: Record<string, unknown>;
  region: string;
}) {
  const { id, type, createdAt, payload, region } = event;
  
  let projectId: string | undefined, deploymentId: string | undefined, status: string | undefined, url: string | undefined;
  let meta: Record<string, unknown> = {};
  
  // Extrair informações baseadas no tipo de evento conforme documentação Vercel
  switch (type) {
    // Deployment Events
    case 'deployment.created':
    case 'deployment.succeeded':
    case 'deployment.error':
    case 'deployment.cancelled':
    case 'deployment.promoted':
      deploymentId = typeof payload.id === 'string' ? payload.id : undefined;
      projectId = typeof payload.projectId === 'string' ? payload.projectId : undefined;
      status = typeof payload.status === 'string' ? payload.status : type.split('.')[1];
      url = typeof payload.url === 'string' ? payload.url : undefined;
      meta = {
        teamId: typeof payload.teamId === 'string' ? payload.teamId : undefined,
        userId: typeof payload.userId === 'string' ? payload.userId : undefined,
        projectName: typeof payload.name === 'string' ? payload.name : undefined,
        deploymentUrl: typeof payload.url === 'string' ? payload.url : undefined,
        target: typeof payload.target === 'string' ? payload.target : undefined,
        alias: Array.isArray(payload.alias) ? payload.alias : undefined,
      };
      break;
    
    // Project Events
    case 'project.created':
    case 'project.removed':
      projectId = typeof payload.id === 'string' ? payload.id : undefined;
      meta = {
        teamId: typeof payload.teamId === 'string' ? payload.teamId : undefined,
        userId: typeof payload.userId === 'string' ? payload.userId : undefined,
        projectName: typeof payload.name === 'string' ? payload.name : undefined,
        framework: typeof payload.framework === 'string' ? payload.framework : undefined,
      };
      break;
    
    // Firewall Events
    case 'attack.detected':
      meta = {
        teamId: typeof payload.teamId === 'string' ? payload.teamId : undefined,
        attackType: typeof payload.attackType === 'string' ? payload.attackType : undefined,
        mitigated: typeof payload.mitigated === 'boolean' ? payload.mitigated : undefined,
        ipAddress: typeof payload.ipAddress === 'string' ? payload.ipAddress : undefined,
        userAgent: typeof payload.userAgent === 'string' ? payload.userAgent : undefined,
      };
      break;
  }
  
  return {
    eventId: id,
    type,
    createdAt: new Date(createdAt),
    payload,
    region,
    projectId,
    deploymentId,
    status,
    url,
    meta,
  };
}

export async function POST(request: NextRequest) {
  try {
    // Verificar se o webhook secret está configurado
    const webhookSecret = process.env.VERCEL_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('VERCEL_WEBHOOK_SECRET not configured');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    // Obter o corpo da requisição
    const body = await request.text();
    
    // Verificar a assinatura do webhook (x-vercel-signature conforme documentação)
    const signature = request.headers.get('x-vercel-signature');
    if (!signature) {
      console.error('Missing x-vercel-signature header');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 401 }
      );
    }

    if (!verifySignature(body, signature, webhookSecret)) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Conectar ao MongoDB
    await connectDB();

    // Parse do JSON
    const event = JSON.parse(body);
    
    // Validar formato do evento conforme documentação Vercel
    // if (!event.id || !event.type || !event.createdAt || !event.payload || !event.region) {
    //   console.error('Invalid event format');
    //   return NextResponse.json(
    //     { error: 'Invalid event format' },
    //     { status: 400 }
    //   );
    // }
    
    // Extrair informações do evento
    const eventInfo = extractEventInfo(event);
    
    // Salvar no banco de dados
    const buildEvent = new BuildEvent(eventInfo);
    await buildEvent.save();

    console.log(`✅ Event saved: ${eventInfo.type} - ${eventInfo.eventId}`);

    return NextResponse.json({ 
      success: true,
      eventId: eventInfo.eventId,
      type: eventInfo.type
    });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Método GET para verificar se o endpoint está funcionando
export async function GET() {
  return NextResponse.json({ 
    message: 'Vercel Build Status Webhook Endpoint',
    status: 'active',
    supportedEvents: [
      'deployment.created',
      'deployment.succeeded', 
      'deployment.error',
      'deployment.cancelled',
      'deployment.promoted',
      'project.created',
      'project.removed',
      'attack.detected'
    ]
  });
} 