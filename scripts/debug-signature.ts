import crypto from 'crypto';

const secret = 'test_secret';
const payload = JSON.stringify({
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
});

// Generate signature the same way as the test script
const signature = crypto
  .createHmac('sha256', secret)
  .update(payload)
  .digest('hex');

console.log('🔍 Debug Signature Verification');
console.log('Secret:', secret);
console.log('Payload:', payload);
console.log('Generated Signature:', signature);
console.log('');

// Verify signature the same way as the webhook route
const expectedSignature = crypto
  .createHmac('sha256', secret)
  .update(payload)
  .digest('hex');

console.log('Expected Signature:', expectedSignature);
console.log('Signatures Match:', signature === expectedSignature);
console.log('');

// Test the timingSafeEqual function
const signatureBuffer = Buffer.from(signature, 'hex');
const expectedBuffer = Buffer.from(expectedSignature, 'hex');

console.log('Buffer Comparison:');
console.log('Signature Buffer:', signatureBuffer);
console.log('Expected Buffer:', expectedBuffer);
console.log('Buffers Match:', signatureBuffer.equals(expectedBuffer));
console.log('Timing Safe Equal:', crypto.timingSafeEqual(signatureBuffer, expectedBuffer)); 