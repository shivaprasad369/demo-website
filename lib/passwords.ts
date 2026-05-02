import crypto from 'crypto';

const ITERATIONS = 120000;
const KEY_LENGTH = 32;
const DIGEST = 'sha256';
const PREFIX = 'pbkdf2';

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString('hex');
  return `${PREFIX}$${ITERATIONS}$${salt}$${hash}`;
}

export function isHashedPassword(value = ''): boolean {
  return value.startsWith(`${PREFIX}$`);
}

export function verifyPassword(password: string, storedPassword = ''): boolean {
  if (!isHashedPassword(storedPassword)) {
    return password === storedPassword;
  }

  const [, iterations, salt, storedHash] = storedPassword.split('$');
  if (!iterations || !salt || !storedHash) return false;

  const hash = crypto
    .pbkdf2Sync(password, salt, Number(iterations), KEY_LENGTH, DIGEST)
    .toString('hex');

  if (hash.length !== storedHash.length) return false;

  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(storedHash, 'hex'));
}
