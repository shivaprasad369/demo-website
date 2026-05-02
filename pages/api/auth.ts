import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { readJsonFile, writeJsonFile } from '../../lib/jsonFile';
import { hashPassword, isHashedPassword, verifyPassword } from '../../lib/passwords';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { PublicUser, UserRecord } from '../../types/domain';

const FILE = path.join(process.cwd(), 'data', 'users.json');

type AuthResponse = { success: true } | { user: PublicUser } | { message: string };

export default function handler(req: NextApiRequest, res: NextApiResponse<AuthResponse>) {
  if (req.method !== 'POST') return res.status(405).end();
  const { action, name, email, phone, password } = req.body;
  try {
    let users = readJsonFile<UserRecord[]>(FILE, []);
    if (action === 'register') {
      if (!name || !email || !phone || !password) return res.status(400).json({ message: 'All fields required' });
      if (users.find(u => u.email === email)) return res.status(400).json({ message: 'Email already registered' });
      const user = { id: uuidv4(), name, email, phone, password: hashPassword(password), createdAt: new Date().toISOString() };
      users.push(user);
      writeJsonFile(FILE, users);
      return res.status(200).json({ success: true });
    }
    if (action === 'login') {
      if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
      const user = users.find(u => u.email === email && verifyPassword(password, u.password));
      if (!user) return res.status(401).json({ message: 'Invalid email or password' });
      if (!isHashedPassword(user.password)) {
        user.password = hashPassword(password);
        writeJsonFile(FILE, users);
      }
      const { password: _pw, ...safe } = user;
      return res.status(200).json({ user: safe });
    }
    res.status(400).json({ message: 'Invalid action' });
  } catch { res.status(500).json({ message: 'Server error' }); }
}
