import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/lib/mongodb';
import BuildEvent from '@/models/BuildEvent';

function sha1(data: Buffer, secret: string): string {
  return crypto.createHmac('sha1', secret).update(data).digest('hex');
}

export async function POST(request: NextRequest) {
  const secret = process.env.VERCEL_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  // Corpo bruto
  const rawBody = await request.text();
  const rawBodyBuffer = Buffer.from(rawBody, 'utf-8');

  // Validação da assinatura
  const signature = request.headers.get('x-vercel-signature');
  const expectedSignature = sha1(rawBodyBuffer, secret);

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  // Parse do JSON
  let event;
  try {
    event = JSON.parse(rawBodyBuffer.toString('utf-8'));
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Validação básica
  if (!event.id || !event.type || !event.createdAt || !event.payload) {
    return NextResponse.json({ error: 'Invalid event format' }, { status: 400 });
  }

  await connectDB();

  // Extração dos campos conforme documentação Vercel
  let projectId, deploymentId, status, url, meta = {};
  if (event.type.startsWith('deployment.')) {
    projectId = event.payload?.project?.id;
    deploymentId = event.payload?.deployment?.id;
    status = event.type;
    url = event.payload?.deployment?.url;
    meta = {
      teamId: event.payload?.team?.id,
      userId: event.payload?.user?.id,
      projectName: event.payload?.deployment?.name,
      deploymentUrl: event.payload?.deployment?.url,
      target: event.payload?.target,
      alias: event.payload?.alias,
      plan: event.payload?.plan,
      regions: event.payload?.regions,
      links: event.payload?.links,
    };
  } else if (event.type.startsWith('project.')) {
    projectId = event.payload?.project?.id;
    meta = {
      teamId: event.payload?.team?.id,
      userId: event.payload?.user?.id,
      projectName: event.payload?.project?.name,
    };
  } else if (event.type === 'attack.detected') {
    meta = {
      teamId: event.payload?.team?.id,
      attackType: event.payload?.attackType,
      mitigated: event.payload?.mitigated,
      ipAddress: event.payload?.ipAddress,
      userAgent: event.payload?.userAgent,
    };
  }

  const buildEvent = new BuildEvent({
    eventId: event.id,
    type: event.type,
    createdAt: new Date(event.createdAt),
    payload: event.payload,
    region: event.region || 'unknown', // Garantir que region sempre tenha um valor
    projectId,
    deploymentId,
    status,
    url,
    meta,
  });

  try {
    await buildEvent.save();
    console.log(`✅ Event saved: ${event.type} - ${event.id}`);
  } catch (err: unknown) {
    const error = err as Error & { code?: number };
    if (error.code === 11000) {
      console.log(`⚠️ Duplicate event: ${event.id}`);
      return NextResponse.json({ error: 'Duplicate event' }, { status: 409 });
    }
    console.error('❌ Webhook error:', error);
    return NextResponse.json({ error: 'Database error', details: error.message }, { status: 500 });
  }

  return NextResponse.json({ 
    success: true, 
    eventId: event.id,
    type: event.type 
  });
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