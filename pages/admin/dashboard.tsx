import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FaBars, FaBoxOpen, FaInbox, FaSignOutAlt, FaCheck, FaClock, FaPlus, FaEdit, FaTrash, FaHome, FaSearch } from 'react-icons/fa';
import { PRODUCT_CATEGORIES } from '../../data/products';
import { formatCurrency } from '../../lib/productMeta';
import type { FormEvent } from 'react';
import type { Enquiry, Product } from '../../types/domain';

type AdminTab = 'enquiries' | 'products';
type ProductModal =
  | { type: 'add' }
  | { type: 'edit'; product: Product }
  | { type: 'delete'; product: Product };

interface ProductForm {
  name: string;
  category: string;
  priceExcl: string;
  gst: string;
  hsn: string;
  desc: string;
  warranty: string;
  tag: string;
  featured: boolean;
}

interface AdminStats {
  total: number;
  pending: number;
  contacted: number;
  today: number;
}

interface SidebarProps {
  tab: AdminTab;
  setTab: (tab: AdminTab) => void;
  logout: () => void;
  stats: AdminStats;
}

const DEFAULT_PRODUCT_FORM: ProductForm = {
  name: '',
  category: 'Roti Making Machine',
  priceExcl: '',
  gst: '18',
  hsn: '84382000',
  desc: '',
  warranty: '1 Year Motor · 5 Year Gear Box',
  tag: 'Popular',
  featured: false,
};

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<AdminTab>('enquiries');
  const [auth, setAuth] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modal, setModal] = useState<ProductModal | null>(null);
  const [form, setForm] = useState<ProductForm>(DEFAULT_PRODUCT_FORM);
  const [saving, setSaving] = useState(false);
  const [searchProd, setSearchProd] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('vgm_admin_auth');
    if (!stored) { router.push('/admin'); return; }
    setAuth(stored);
    loadData(stored);
  }, []);

  const loadData = async (key: string) => {
    setLoading(true);
    try {
      const [pRes, eRes] = await Promise.all([
        fetch('/api/admin?action=get-products', { headers: { 'x-admin-auth': key } }),
        fetch('/api/admin?action=get-enquiries', { headers: { 'x-admin-auth': key } }),
      ]);
      if (!pRes.ok) { router.push('/admin'); return; }
      setProducts(await pRes.json() as Product[]);
      setEnquiries(await eRes.json() as Enquiry[]);
    } catch {}
    setLoading(false);
  };

  const apiFetch = (action: string, body: unknown) => fetch(`/api/admin?action=${action}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-auth': auth },
    body: JSON.stringify(body),
  });

  const showMsg = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };

  const handleLogout = () => { sessionStorage.removeItem('vgm_admin_auth'); router.push('/admin'); };

  const updateEnquiryStatus = async (id: string, status: Enquiry['status']) => {
    await apiFetch('update-enquiry-status', { id, status });
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm('Delete this enquiry?')) return;
    await apiFetch('delete-enquiry', { id });
    setEnquiries(prev => prev.filter(e => e.id !== id));
    showMsg('Enquiry deleted.');
  };

  const openAdd = () => { setForm(DEFAULT_PRODUCT_FORM); setModal({type:'add'}); };
  const openEdit = (p: Product) => { setForm({ ...p, priceExcl:String(p.priceExcl), gst:String(p.gst), featured:p.featured||false }); setModal({type:'edit',product:p}); };
  const openDelete = (p: Product) => setModal({type:'delete',product:p});

  const handleSaveProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!modal || modal.type === 'delete') return;
    setSaving(true);
    const body = { ...form, priceExcl: Number(form.priceExcl), gst: Number(form.gst) };
    if (modal.type === 'add') {
      const res = await apiFetch('add-product', body);
      const data = await res.json() as { success?: boolean; product: Product };
      if (data.success) { setProducts(prev => [...prev, data.product]); showMsg('Product added!'); }
    } else {
      await apiFetch('edit-product', { ...body, id: modal.product.id });
      setProducts(prev => prev.map(p => p.id === modal.product.id ? { ...p, ...body, id: p.id } : p));
      showMsg('Product updated!');
    }
    setSaving(false);
    setModal(null);
  };

  const handleDelete = async () => {
    if (!modal || modal.type !== 'delete') return;
    await apiFetch('delete-product', { id: modal.product.id });
    setProducts(prev => prev.filter(p => p.id !== modal.product.id));
    showMsg('Product deleted.');
    setModal(null);
  };

  const stats = {
    total: enquiries.length,
    pending: enquiries.filter(e => e.status === 'Pending').length,
    contacted: enquiries.filter(e => e.status === 'Contacted').length,
    today: enquiries.filter(e => new Date(e.createdAt).toDateString() === new Date().toDateString()).length,
  };

  const filteredProducts = products.filter(p =>
    !searchProd || p.name.toLowerCase().includes(searchProd.toLowerCase()) || p.category.toLowerCase().includes(searchProd.toLowerCase())
  );

  if (loading) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f0f4f8'}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:44,marginBottom:16,display:'inline-block',animation:'spin 1s linear infinite'}}>⚙️</div>
        <div style={{fontSize:15,color:'#4a4a4a'}}>Loading admin panel...</div>
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <>
      <Head><title>Admin Dashboard — VGM</title></Head>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,900&family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'Barlow',sans-serif;background:#f5f7fa;color:#1c1c1c;}
        .adm{display:flex;min-height:100vh;}
        .adm-sb{width:230px;background:#07111f;color:#fff;flex-shrink:0;display:flex;flex-direction:column;position:sticky;top:0;height:100vh;overflow-y:auto;}
        .adm-sb-logo{padding:22px 18px 18px;border-bottom:1px solid rgba(255,255,255,0.07);}
        .adm-sb-title{font-family:'Fraunces',serif;font-size:17px;font-weight:700;color:#fff;}
        .adm-sb-sub{font-size:11px;color:rgba(255,255,255,0.4);margin-top:3px;}
        .adm-nav{padding:14px 10px;flex:1;}
        .adm-nb{display:flex;align-items:center;gap:10px;width:100%;padding:11px 14px;border:none;background:none;color:rgba(255,255,255,0.55);font-size:13.5px;font-weight:500;cursor:pointer;border-radius:8px;transition:all .2s;margin-bottom:4px;font-family:'Barlow',sans-serif;position:relative;white-space:nowrap;}
        .adm-nb:hover{background:rgba(255,255,255,0.07);color:#fff;}
        .adm-nb.active{background:#c8860a;color:#fff;font-weight:700;}
        .adm-nb-badge{position:absolute;right:10px;background:rgba(255,255,255,0.2);color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;}
        .adm-sb-bottom{padding:14px 10px;border-top:1px solid rgba(255,255,255,0.07);}
        .adm-logout{display:flex;align-items:center;gap:9px;width:100%;padding:10px 14px;border:none;background:rgba(220,38,38,0.15);color:rgba(255,255,255,0.65);font-size:13px;font-weight:600;cursor:pointer;border-radius:8px;font-family:'Barlow',sans-serif;transition:all .2s;}
        .adm-logout:hover{background:rgba(220,38,38,0.3);color:#fff;}
        .adm-main{flex:1;min-width:0;overflow-x:hidden;}
        .adm-topbar{background:#fff;border-bottom:1.5px solid #eee;padding:0 24px;height:58px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;gap:12px;}
        .adm-topbar-title{font-family:'Fraunces',serif;font-size:18px;font-weight:700;color:#07111f;}
        .adm-topbar-right{display:flex;align-items:center;gap:12px;}
        .adm-hamburger{display:none;background:none;border:none;color:#07111f;font-size:20px;cursor:pointer;}
        .adm-content{padding:26px 24px 60px;}
        .adm-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px;}
        .adm-stat{background:#fff;border:1.5px solid #eee;border-radius:12px;padding:18px 16px;}
        .adm-stat-n{font-family:'Fraunces',serif;font-size:28px;font-weight:900;color:#c8860a;}
        .adm-stat-l{font-size:12px;color:#888;margin-top:4px;font-weight:500;}
        .adm-card{background:#fff;border:1.5px solid #eee;border-radius:14px;overflow:hidden;}
        .adm-card-h{padding:16px 20px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;}
        .adm-card-title{font-family:'Fraunces',serif;font-size:17px;font-weight:700;color:#07111f;}
        .adm-tbl{width:100%;border-collapse:collapse;}
        .adm-tbl th{background:#f8f9fa;padding:11px 16px;text-align:left;font-size:11px;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid #eee;white-space:nowrap;}
        .adm-tbl td{padding:13px 16px;font-size:13.5px;color:#1c1c1c;border-bottom:1px solid #f0f0f0;vertical-align:middle;}
        .adm-tbl tr:last-child td{border-bottom:none;}
        .adm-tbl tr:hover td{background:#fafafa;}
        .badge{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:7px;font-size:11px;font-weight:700;font-family:'Barlow Condensed',sans-serif;text-transform:uppercase;letter-spacing:.3px;}
        .badge-pending{background:rgba(234,88,12,0.1);color:#c2410c;}
        .badge-contacted{background:rgba(22,163,74,0.1);color:#15803d;}
        .adm-btn{background:none;border:1.5px solid #eee;border-radius:7px;padding:6px 10px;font-size:12px;cursor:pointer;font-family:'Barlow',sans-serif;font-weight:600;transition:all .2s;display:inline-flex;align-items:center;gap:5px;white-space:nowrap;}
        .adm-btn:hover{border-color:#c8860a;color:#c8860a;}
        .adm-btn.danger:hover{border-color:#dc2626;color:#dc2626;}
        .adm-btn.primary{background:#07111f;border-color:#07111f;color:#fff;}
        .adm-btn.primary:hover{background:#0d1e30;border-color:#0d1e30;color:#fff;}
        .adm-search-wrap{position:relative;}
        .adm-search-wrap svg{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:#aaa;}
        .adm-search{border:1.5px solid #eee;border-radius:8px;padding:8px 12px 8px 32px;font-size:13px;font-family:'Barlow',sans-serif;outline:none;transition:border-color .2s;background:#f8f9fa;}
        .adm-search:focus{border-color:#c8860a;background:#fff;}
        .adm-empty{text-align:center;padding:44px 20px;color:#aaa;font-size:14px;}
        .adm-msg{position:fixed;bottom:24px;right:24px;background:#07111f;color:#fff;padding:13px 20px;border-radius:10px;font-size:14px;font-weight:600;z-index:999;box-shadow:0 4px 20px rgba(0,0,0,0.2);animation:slideIn .3s ease;}
        @keyframes slideIn{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
        .mob-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:200;}
        .mob-overlay.open{display:block;}
        .adm-sb-mob{position:fixed;left:0;top:0;bottom:0;z-index:201;width:230px;transform:translateX(-100%);transition:transform .25s;}
        .adm-sb-mob.open{transform:translateX(0);}
        /* MODAL */
        .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:500;display:flex;align-items:center;justify-content:center;padding:20px;}
        .modal-box{background:#fff;border-radius:18px;width:100%;max-width:520px;max-height:90vh;overflow-y:auto;padding:32px;box-shadow:0 24px 60px rgba(0,0,0,0.25);}
        .modal-title{font-family:'Fraunces',serif;font-size:20px;font-weight:700;color:#07111f;margin-bottom:22px;padding-bottom:14px;border-bottom:1px solid #eee;}
        .modal-field{margin-bottom:14px;}
        .modal-label{display:block;font-size:11px;font-weight:700;color:#888;margin-bottom:5px;text-transform:uppercase;letter-spacing:.5px;font-family:'Barlow Condensed',sans-serif;}
        .modal-input{width:100%;border:1.5px solid #e6d5b4;border-radius:8px;padding:10px 12px;font-size:14px;font-family:'Barlow',sans-serif;color:#1c1c1c;background:#fdf8f0;outline:none;transition:border-color .2s;}
        .modal-input:focus{border-color:#c8860a;background:#fff;}
        .modal-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .modal-actions{display:flex;gap:10px;margin-top:20px;justify-content:flex-end;}
        .modal-cancel{padding:11px 20px;background:none;border:1.5px solid #eee;border-radius:9px;font-size:13.5px;font-weight:600;cursor:pointer;font-family:'Barlow',sans-serif;color:#888;transition:all .2s;}
        .modal-cancel:hover{border-color:#aaa;color:#1c1c1c;}
        .modal-save{padding:11px 24px;background:#c8860a;border:none;border-radius:9px;font-size:13.5px;font-weight:700;cursor:pointer;font-family:'Barlow',sans-serif;color:#fff;transition:all .2s;}
        .modal-save:hover{background:#e09a0e;}
        .modal-save:disabled{opacity:.6;cursor:not-allowed;}
        .modal-delete-msg{font-size:15px;color:#1c1c1c;line-height:1.7;margin-bottom:10px;}
        .modal-delete-warn{background:rgba(220,38,38,0.07);border:1px solid rgba(220,38,38,0.2);border-radius:8px;padding:10px 14px;font-size:13px;color:#dc2626;margin-bottom:20px;}
        .del-btn{padding:11px 24px;background:#dc2626;border:none;border-radius:9px;font-size:13.5px;font-weight:700;cursor:pointer;font-family:'Barlow',sans-serif;color:#fff;}
        .del-btn:hover{background:#b91c1c;}
        @media(max-width:900px){.adm-sb{display:none;}.adm-hamburger{display:block;}.adm-stats{grid-template-columns:1fr 1fr;}}
        @media(max-width:540px){.adm-stats{grid-template-columns:1fr 1fr;}.adm-content{padding:14px;}.modal-grid{grid-template-columns:1fr;}}
      `}</style>

      {msg && <div className="adm-msg">✅ {msg}</div>}

      {/* Mobile sidebar */}
      <div className={`mob-overlay ${sidebarOpen?'open':''}`} onClick={()=>setSidebarOpen(false)}/>
      <div className={`adm-sb adm-sb-mob ${sidebarOpen?'open':''}`}>
        <SB tab={tab} setTab={(t)=>{setTab(t);setSidebarOpen(false);}} logout={handleLogout} stats={stats}/>
      </div>

      {/* Modal */}
      {modal && (
        <div className="modal-overlay" onClick={(e)=>e.target===e.currentTarget&&setModal(null)}>
          <div className="modal-box">
            {modal.type === 'delete' ? (
              <>
                <div className="modal-title">🗑️ Delete Product</div>
                <div className="modal-delete-msg">Are you sure you want to delete <strong>{modal.product.name}</strong>?</div>
                <div className="modal-delete-warn">⚠️ This action cannot be undone.</div>
                <div className="modal-actions">
                  <button className="modal-cancel" onClick={()=>setModal(null)}>Cancel</button>
                  <button className="del-btn" onClick={handleDelete}>Yes, Delete</button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSaveProduct}>
                <div className="modal-title">{modal.type==='add'?'➕ Add New Product':'✏️ Edit Product'}</div>
                <div className="modal-field">
                  <label className="modal-label">Product Name *</label>
                  <input className="modal-input" value={form.name||''} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="e.g. VR-200 Roti Making Machine" required/>
                </div>
                <div className="modal-grid">
                  <div className="modal-field">
                    <label className="modal-label">Category *</label>
                    <select className="modal-input" value={form.category||''} onChange={e=>setForm(p=>({...p,category:e.target.value}))}>
                      {PRODUCT_CATEGORIES.filter(c=>c!=='All').map(c=><option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="modal-field">
                    <label className="modal-label">Tag</label>
                    <select className="modal-input" value={form.tag||'Popular'} onChange={e=>setForm(p=>({...p,tag:e.target.value}))}>
                      {['Popular','Bestseller','Premium','Industrial','Commercial','Heavy Duty','Home Use','Value','New'].map(t=><option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="modal-grid">
                  <div className="modal-field">
                    <label className="modal-label">Price (Excl. GST) ₹</label>
                    <input className="modal-input" type="number" value={form.priceExcl||''} onChange={e=>setForm(p=>({...p,priceExcl:e.target.value}))} placeholder="e.g. 42373" required/>
                  </div>
                  <div className="modal-field">
                    <label className="modal-label">GST %</label>
                    <select className="modal-input" value={form.gst||'18'} onChange={e=>setForm(p=>({...p,gst:e.target.value}))}>
                      <option value="5">5%</option><option value="12">12%</option><option value="18">18%</option><option value="28">28%</option>
                    </select>
                  </div>
                </div>
                <div className="modal-grid">
                  <div className="modal-field">
                    <label className="modal-label">HSN Code</label>
                    <input className="modal-input" value={form.hsn||''} onChange={e=>setForm(p=>({...p,hsn:e.target.value}))} placeholder="84382000"/>
                  </div>
                  <div className="modal-field">
                    <label className="modal-label">Warranty</label>
                    <input className="modal-input" value={form.warranty||''} onChange={e=>setForm(p=>({...p,warranty:e.target.value}))} placeholder="1 Year Motor · 5 Year Gear Box"/>
                  </div>
                </div>
                <div className="modal-field">
                  <label className="modal-label">Description</label>
                  <textarea className="modal-input" rows={3} value={form.desc||''} onChange={e=>setForm(p=>({...p,desc:e.target.value}))} placeholder="Brief product description..." style={{resize:'vertical'}}/>
                </div>
                <div className="modal-field" style={{display:'flex',alignItems:'center',gap:10}}>
                  <input type="checkbox" id="featured" checked={form.featured||false} onChange={e=>setForm(p=>({...p,featured:e.target.checked}))} style={{width:16,height:16,cursor:'pointer'}}/>
                  <label htmlFor="featured" style={{fontSize:14,cursor:'pointer',fontWeight:600,color:'#1c1c1c'}}>Show on Homepage (Featured)</label>
                </div>
                <div className="modal-actions">
                  <button type="button" className="modal-cancel" onClick={()=>setModal(null)}>Cancel</button>
                  <button type="submit" className="modal-save" disabled={saving}>{saving?'Saving...':modal.type==='add'?'Add Product':'Save Changes'}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <div className="adm">
        {/* Desktop Sidebar */}
        <aside className="adm-sb"><SB tab={tab} setTab={setTab} logout={handleLogout} stats={stats}/></aside>

        <div className="adm-main">
          <div className="adm-topbar">
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <button className="adm-hamburger" onClick={()=>setSidebarOpen(true)}><FaBars/></button>
              <div className="adm-topbar-title">{tab==='enquiries'?'Enquiries':'Products'}</div>
            </div>
            <div className="adm-topbar-right">
              <a href="/" target="_blank" style={{fontSize:12,color:'#888',textDecoration:'none',display:'flex',alignItems:'center',gap:5,transition:'color .2s'}} onMouseEnter={e=>e.currentTarget.style.color='#c8860a'} onMouseLeave={e=>e.currentTarget.style.color='#888'}>
                <FaHome size={11}/> View Site
              </a>
            </div>
          </div>

          <div className="adm-content">
            {/* ENQUIRIES TAB */}
            {tab === 'enquiries' && (
              <>
                <div className="adm-stats">
                  <div className="adm-stat"><div className="adm-stat-n">{stats.total}</div><div className="adm-stat-l">Total Enquiries</div></div>
                  <div className="adm-stat"><div className="adm-stat-n">{stats.pending}</div><div className="adm-stat-l">Pending</div></div>
                  <div className="adm-stat"><div className="adm-stat-n">{stats.contacted}</div><div className="adm-stat-l">Contacted</div></div>
                  <div className="adm-stat"><div className="adm-stat-n">{stats.today}</div><div className="adm-stat-l">Today</div></div>
                </div>
                <div className="adm-card">
                  <div className="adm-card-h">
                    <div className="adm-card-title">All Enquiries</div>
                    <span style={{fontSize:12,color:'#aaa'}}>Newest first</span>
                  </div>
                  <div style={{overflowX:'auto'}}>
                    {enquiries.length === 0 ? <div className="adm-empty">📭 No enquiries yet.</div> : (
                      <table className="adm-tbl">
                        <thead><tr><th>Date</th><th>Name</th><th>Phone</th><th>City/State</th><th>Machine</th><th>Message</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                          {enquiries.map(e => (
                            <tr key={e.id}>
                              <td style={{whiteSpace:'nowrap',fontSize:11.5,color:'#aaa'}}>{new Date(e.createdAt).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'2-digit',hour:'2-digit',minute:'2-digit'})}</td>
                              <td><strong>{e.name}</strong>{e.company&&<div style={{fontSize:11,color:'#aaa'}}>{e.company}</div>}</td>
                              <td><a href={`tel:${e.phone}`} style={{color:'#c8860a',fontWeight:700,textDecoration:'none'}}>{e.phone}</a></td>
                              <td style={{fontSize:12}}>{[e.city,e.state].filter(Boolean).join(', ')||'—'}</td>
                              <td style={{fontSize:12}}>{e.machine||'—'}</td>
                              <td style={{fontSize:12,maxWidth:160}}>{(e.notes||'—').slice(0,70)}</td>
                              <td>
                                <span className={`badge ${e.status==='Contacted'?'badge-contacted':'badge-pending'}`}>
                                  {e.status==='Contacted'?<FaCheck size={8}/>:<FaClock size={8}/>} {e.status}
                                </span>
                              </td>
                              <td>
                                <div style={{display:'flex',gap:6}}>
                                  <button className="adm-btn" onClick={()=>updateEnquiryStatus(e.id, e.status==='Pending'?'Contacted':'Pending')}>
                                    {e.status==='Pending'?'✅ Mark Contacted':'↩ Pending'}
                                  </button>
                                  <button className="adm-btn danger" onClick={()=>deleteEnquiry(e.id)}><FaTrash size={10}/></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* PRODUCTS TAB */}
            {tab === 'products' && (
              <div className="adm-card">
                <div className="adm-card-h">
                  <div className="adm-card-title">All Products ({products.length})</div>
                  <div style={{display:'flex',gap:10,alignItems:'center'}}>
                    <div className="adm-search-wrap">
                      <FaSearch size={11}/>
                      <input className="adm-search" placeholder="Search products..." value={searchProd} onChange={e=>setSearchProd(e.target.value)}/>
                    </div>
                    <button className="adm-btn primary" onClick={openAdd}><FaPlus size={11}/> Add Product</button>
                  </div>
                </div>
                <div style={{overflowX:'auto'}}>
                  {filteredProducts.length === 0 ? <div className="adm-empty">No products found.</div> : (
                    <table className="adm-tbl">
                      <thead><tr><th>#</th><th>Name</th><th>Category</th><th>Price (Excl. GST)</th><th>GST</th><th>Tag</th><th>Featured</th><th>Actions</th></tr></thead>
                      <tbody>
                        {filteredProducts.map(p=>(
                          <tr key={p.id}>
                            <td style={{color:'#aaa',fontSize:12}}>{p.id}</td>
                            <td><strong style={{fontSize:13.5}}>{p.name}</strong></td>
                            <td><span style={{fontSize:11,background:'#f5f7fa',border:'1px solid #eee',padding:'3px 8px',borderRadius:6}}>{p.category}</span></td>
                            <td style={{fontWeight:700,color:'#c8860a',fontFamily:"'Fraunces',serif"}}>{formatCurrency(p.priceExcl)}</td>
                            <td>{p.gst}%</td>
                            <td><span style={{fontSize:11,fontWeight:700,fontFamily:"'Barlow Condensed',sans-serif",textTransform:'uppercase',letterSpacing:'.3px'}}>{p.tag}</span></td>
                            <td>{p.featured?<span style={{color:'#c8860a',fontWeight:700}}>⭐ Yes</span>:'—'}</td>
                            <td>
                              <div style={{display:'flex',gap:6}}>
                                <button className="adm-btn" onClick={()=>openEdit(p)}><FaEdit size={11}/> Edit</button>
                                <button className="adm-btn danger" onClick={()=>openDelete(p)}><FaTrash size={11}/> Delete</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function SB({ tab, setTab, logout, stats }: SidebarProps) {
  return (
    <>
      <div className="adm-sb-logo">
        <div className="adm-sb-title">⚙️ VGM Admin</div>
        <div className="adm-sb-sub">Management Dashboard</div>
      </div>
      <div className="adm-nav">
        <button className={`adm-nb ${tab==='enquiries'?'active':''}`} onClick={()=>setTab('enquiries')}>
          <FaInbox size={14}/> Enquiries
          {stats.pending>0&&<span className="adm-nb-badge">{stats.pending}</span>}
        </button>
        <button className={`adm-nb ${tab==='products'?'active':''}`} onClick={()=>setTab('products')}>
          <FaBoxOpen size={14}/> Products
        </button>
      </div>
      <div className="adm-sb-bottom">
        <button className="adm-logout" onClick={logout}><FaSignOutAlt size={13}/> Logout</button>
      </div>
    </>
  );
}
