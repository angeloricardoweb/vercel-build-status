import crypto from 'crypto';
 
export async function GET(request: Request) {
  const { INTEGRATION_SECRET } = process.env;
 
  if (typeof INTEGRATION_SECRET != 'string') {
    throw new Error('No integration secret found');
  }
 
  const rawBody = await request.text();
  const rawBodyBuffer = Buffer.from(rawBody, 'utf-8');
  const bodySignature = sha1(rawBodyBuffer, INTEGRATION_SECRET);
 
  if (bodySignature !== request.headers.get('x-vercel-signature')) {
    return Response.json({
      code: 'invalid_signature',
      error: "signature didn't match",
    });
  }
 
  const json = JSON.parse(rawBodyBuffer.toString('utf-8'));
 
  switch (json.type) {
    case 'project.created':
    // ...
  }
 
  return new Response('Webhook request validated', {
    status: 200,
  });
}
 
function sha1(data: Buffer, secret: string): string {
  return crypto.createHmac('sha1', secret).update(data).digest('hex');
}