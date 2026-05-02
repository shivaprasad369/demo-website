import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { readJsonFile, writeJsonFile } from '../../lib/jsonFile';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Enquiry } from '../../types/domain';

const FILE = path.join(process.cwd(), 'data', 'enquiries.json');

export default function handler(req: NextApiRequest, res: NextApiResponse<{ success: true } | { message: string }>) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { name, phone, email, city, state, company, machine, notes, message, products, totalExcl, totalIncl } = req.body;
    if (!name || !phone) return res.status(400).json({ message: 'Name and phone required' });
    const list = readJsonFile<Enquiry[]>(FILE, []);
    const enquiry = {
      id: uuidv4(), createdAt: new Date().toISOString(), status: 'Pending',
      name, phone, email: email||'', city: city||'', state: state||'', company: company||'',
      machine: machine||'', notes: notes||message||'',
      products: products||[], totalExcl: totalExcl||0, totalIncl: totalIncl||0,
    };
    list.unshift(enquiry);
    writeJsonFile(FILE, list);
    res.status(200).json({ success: true });
  } catch (e) { res.status(500).json({ message: 'Server error' }); }
}
