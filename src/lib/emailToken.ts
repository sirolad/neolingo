const secret = process.env.JWT_SECRET || 'your-secret-key';

// Helper: Base64 URL-safe encoding
function base64UrlEncode(str: string | Buffer) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlDecode(str: string) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  // Pad string with '='
  while (str.length % 4) str += '=';
  return Buffer.from(str, 'base64').toString('utf8');
}

// HMAC-SHA256 signing using Web Crypto API
async function signData(str: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(str));
  return base64UrlEncode(Buffer.from(signature));
}

// Encode email → token
export async function encodeEmail(email: string, expiresInSeconds = 900) {
  const expiresAt = Math.floor(Date.now() / 1000) + expiresInSeconds; // default 15 min
  const payload = JSON.stringify({ email, exp: expiresAt });
  const data = base64UrlEncode(payload);
  const signature = await signData(data);
  return `${data}.${signature}`;
}

// Decode token → email
export async function decodeEmail(token: string) {
  const [data, sig] = token.split('.');
  if (!data || !sig) throw new Error('Invalid token');

  const validSig = await signData(data);
  if (sig !== validSig) throw new Error('Invalid signature');

  const payload = JSON.parse(base64UrlDecode(data));
  const now = Math.floor(Date.now() / 1000);

  if (!payload.exp || now > payload.exp) {
    throw new Error('Token expired');
  }

  return payload.email as string;
}
