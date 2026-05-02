import path from 'path';
import { readJsonFile, writeJsonFile } from '../../lib/jsonFile';
import { getAllProducts, readDynamicProducts, writeDynamicProducts } from '../../lib/products';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Enquiry, Product } from '../../types/domain';

const ENQ_FILE = path.join(process.cwd(), 'data', 'enquiries.json');

function checkAuth(req: NextApiRequest): boolean {
  const key = req.headers['x-admin-auth'];
  return Boolean(process.env.ADMIN_PASSWORD) && Boolean(key) && key === process.env.ADMIN_PASSWORD;
}

function readEnquiries(): Enquiry[] {
  return readJsonFile<Enquiry[]>(ENQ_FILE, []);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!checkAuth(req)) return res.status(401).json({ message: 'Unauthorized' });
  const action = req.query.action;

  // ── GET PRODUCTS ──
  if (req.method === 'GET' && action === 'get-products') {
    return res.status(200).json(getAllProducts());
  }

  // ── GET ENQUIRIES ──
  if (req.method === 'GET' && action === 'get-enquiries') {
    return res.status(200).json(readEnquiries());
  }

  // ── ADD PRODUCT ──
  if (req.method === 'POST' && action === 'add-product') {
    const { name, category, priceExcl, gst, hsn, desc, warranty, tag, featured } = req.body;
    if (!name || !category) return res.status(400).json({ message: 'Name and category required' });
    const dynamic = readDynamicProducts();
    const allIds = getAllProducts().map(p => p.id);
    const newId = Math.max(0, ...allIds) + 1;
    const newProduct: Product = {
      id: newId, name, category, priceExcl: Number(priceExcl)||0, gst: Number(gst)||18,
      hsn: hsn||'84382000', desc: desc||'', warranty: warranty||'1 Year',
      tag: tag||'New', featured: featured||false, _custom: true,
    };
    dynamic.push(newProduct);
    writeDynamicProducts(dynamic);
    return res.status(200).json({ success: true, product: newProduct });
  }

  // ── EDIT PRODUCT ──
  if (req.method === 'POST' && action === 'edit-product') {
    const { id, ...updates } = req.body;
    if (!id) return res.status(400).json({ message: 'ID required' });
    const dynamic = readDynamicProducts();
    const idx = dynamic.findIndex(p => p.id === Number(id));
    if (updates.priceExcl) updates.priceExcl = Number(updates.priceExcl);
    if (updates.gst) updates.gst = Number(updates.gst);
    if (idx >= 0) dynamic[idx] = { ...dynamic[idx], ...updates, id: Number(id) };
    else dynamic.push({ id: Number(id), ...updates });
    writeDynamicProducts(dynamic);
    return res.status(200).json({ success: true });
  }

  // ── DELETE PRODUCT ──
  if (req.method === 'POST' && action === 'delete-product') {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: 'ID required' });
    const dynamic = readDynamicProducts();
    const idx = dynamic.findIndex(p => p.id === Number(id));
    if (idx >= 0) dynamic[idx] = { ...dynamic[idx], _deleted: true };
    else dynamic.push({ id: Number(id), _deleted: true });
    writeDynamicProducts(dynamic);
    return res.status(200).json({ success: true });
  }

  // ── UPDATE ENQUIRY STATUS ──
  if (req.method === 'POST' && action === 'update-enquiry-status') {
    const { id, status } = req.body;
    const list = readEnquiries();
    const idx = list.findIndex(e => e.id === id);
    if (idx >= 0) { list[idx].status = status; writeJsonFile(ENQ_FILE, list); }
    return res.status(200).json({ success: true });
  }

  // ── DELETE ENQUIRY ──
  if (req.method === 'POST' && action === 'delete-enquiry') {
    const { id } = req.body;
    const list = readEnquiries().filter(e => e.id !== id);
    writeJsonFile(ENQ_FILE, list);
    return res.status(200).json({ success: true });
  }

  res.status(404).json({ message: 'Not found' });
}
