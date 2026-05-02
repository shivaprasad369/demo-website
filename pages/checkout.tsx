import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { FaWhatsapp, FaArrowLeft } from 'react-icons/fa';
import { clearCart, getCartTotals, readCart } from '../lib/cart';
import { formatCurrency, getCategoryEmoji, getInclusivePrice } from '../lib/productMeta';
import type { CartItem, PublicUser } from '../types/domain';

const STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh'];

export default function Checkout() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [form, setForm] = useState({ name:'', company:'', phone:'', email:'', city:'', state:'', notes:'' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setCart(readCart());
    const u = localStorage.getItem('vgm_user');
    if (u) {
      const parsed = JSON.parse(u) as PublicUser;
      setForm(f => ({ ...f, name: parsed.name || '', phone: parsed.phone || '', email: parsed.email || '' }));
    }
  }, []);

  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }));
  const { totalExcl, totalIncl } = getCartTotals(cart);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.phone) { setError('Name and phone are required.'); return; }
    if (cart.length === 0) { setError('Your cart is empty.'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, products: cart.map(i => `${i.name} x${i.qty}`), machine: 'Cart Checkout', totalExcl, totalIncl }),
      });
      if (!res.ok) throw new Error('Failed');
      clearCart();
      const waItems = cart.map(i => `${i.name} (x${i.qty})`).join('%0A');
      const waMsg = `https://wa.me/918867099199?text=Hello%2C%20I%20am%20${encodeURIComponent(form.name)}%20(${encodeURIComponent(form.phone)}).%20I%20want%20to%20enquire%20about%3A%0A${waItems}%0ACity%3A%20${encodeURIComponent(form.city)}%2C%20${encodeURIComponent(form.state)}`;
      setSuccess(true);
      setTimeout(() => window.open(waMsg, '_blank'), 1000);
    } catch { setError('Something went wrong. Please try again or contact us on WhatsApp.'); }
    setLoading(false);
  };

  if (success) return (
    <>
      <Head><title>Enquiry Sent — Viraj Global Machinery</title></Head>
      <div style={{minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 20px'}}>
        <div style={{textAlign:'center',maxWidth:480}}>
          <div style={{fontSize:64,marginBottom:16}}>✅</div>
          <h2 style={{fontFamily:"'Fraunces',serif",fontSize:28,fontWeight:900,color:'var(--navy)',marginBottom:10}}>Enquiry Submitted!</h2>
          <p style={{fontSize:15,color:'var(--text2)',lineHeight:1.7,marginBottom:24}}>Thank you, <strong>{form.name}</strong>! Our team will contact you within 24 hours with pricing details.<br/>Opening WhatsApp for quick confirmation...</p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/" className="btn-navy">← Back to Home</Link>
            <Link href="/products" className="btn-gold">Browse More Products</Link>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Head><title>Checkout — Viraj Global Machinery</title></Head>
      <style>{`
        .co-hero { background:var(--navy); padding:36px 0; }
        .co-hero h1 { font-family:'Fraunces',serif; font-size:32px; font-weight:900; color:var(--white); }
        .co-hero h1 em { font-style:italic; color:var(--gold2); }
        .co-bc { display:flex; gap:6px; font-size:12px; color:rgba(255,255,255,0.4); margin-bottom:10px; }
        .co-bc a { color:rgba(255,255,255,0.5); text-decoration:none; }

        .co-layout { display:grid; grid-template-columns:1fr 360px; gap:28px; padding:36px 0 60px; align-items:start; }
        .co-form-box { background:var(--white); border:1.5px solid var(--cream3); border-radius:16px; padding:32px; }
        .co-form-title { font-family:'Fraunces',serif; font-size:20px; font-weight:700; color:var(--navy); margin-bottom:22px; padding-bottom:14px; border-bottom:1px solid var(--cream3); }
        .co-field-group { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px; }
        .co-field { margin-bottom:14px; }

        .co-summary { background:var(--white); border:1.5px solid var(--cream3); border-radius:16px; padding:24px; position:sticky; top:100px; }
        .co-summary-title { font-family:'Fraunces',serif; font-size:18px; font-weight:700; color:var(--navy); margin-bottom:16px; padding-bottom:12px; border-bottom:1px solid var(--cream3); }
        .co-item { display:flex; align-items:center; gap:12px; padding:12px 0; border-bottom:1px solid var(--cream3); }
        .co-item:last-of-type { border-bottom:none; }
        .co-item-cat-emoji { font-size:28px; width:46px; height:46px; background:var(--cream); border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .co-item-name { font-size:13px; font-weight:600; color:var(--navy); flex:1; line-height:1.4; }
        .co-item-qty { font-size:12px; color:var(--text3); }
        .co-item-price { font-size:14px; font-weight:700; color:var(--navy); text-align:right; flex-shrink:0; }
        .co-total-row { display:flex; justify-content:space-between; font-family:'Fraunces',serif; font-size:19px; font-weight:900; color:var(--navy); margin:14px 0 16px; padding-top:14px; border-top:2px solid var(--navy); }
        .co-submit-btn { width:100%; padding:14px; font-size:14px; justify-content:center; border-radius:10px; margin-top:4px; }

        @media(max-width:900px) { .co-layout { grid-template-columns:1fr; } .co-summary { position:static; } }
        @media(max-width:540px) { .co-field-group { grid-template-columns:1fr; } }
      `}</style>

      <div className="co-hero">
        <div className="container">
          <div className="co-bc"><Link href="/">Home</Link><span>/</span><Link href="/cart">Cart</Link><span>/</span><span>Checkout</span></div>
          <h1>Send <em>Enquiry</em></h1>
        </div>
      </div>

      <div className="container">
        {cart.length === 0 ? (
          <div style={{textAlign:'center',padding:'60px 20px'}}>
            <div style={{fontSize:48,marginBottom:14}}>🛒</div>
            <h3 style={{fontFamily:"'Fraunces',serif",fontSize:22,color:'var(--navy)',marginBottom:8}}>Your cart is empty</h3>
            <Link href="/products" className="btn-gold" style={{display:'inline-flex',marginTop:16}}>Browse Products</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="co-layout">
              <div className="co-form-box">
                <div className="co-form-title">Your Details</div>
                <div className="co-field-group">
                  <div><label className="form-label">Name *</label><input className="form-input" value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Full Name" required/></div>
                  <div><label className="form-label">Phone *</label><input className="form-input" type="tel" value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="+91 XXXXX XXXXX" required/></div>
                </div>
                <div className="co-field-group">
                  <div><label className="form-label">Company Name</label><input className="form-input" value={form.company} onChange={e=>set('company',e.target.value)} placeholder="Optional"/></div>
                  <div><label className="form-label">Email</label><input className="form-input" type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="you@example.com"/></div>
                </div>
                <div className="co-field-group">
                  <div><label className="form-label">City</label><input className="form-input" value={form.city} onChange={e=>set('city',e.target.value)} placeholder="Your City"/></div>
                  <div>
                    <label className="form-label">State</label>
                    <select className="form-input" value={form.state} onChange={e=>set('state',e.target.value)}>
                      <option value="">Select State</option>
                      {STATES.map(s=><option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="co-field">
                  <label className="form-label">Additional Notes</label>
                  <textarea className="form-input" rows={3} value={form.notes} onChange={e=>set('notes',e.target.value)} placeholder="Any specific requirements, capacity, installation location, etc."/>
                </div>
                {error && <div className="form-error" style={{marginBottom:12}}>{error}</div>}
              </div>

              <div className="co-summary">
                <div className="co-summary-title">Order Summary</div>
                {cart.map(item => {
                  const incl = getInclusivePrice(item.priceExcl * item.qty, item.gst);
                  return (
                    <div key={item.id} className="co-item">
                      <div className="co-item-cat-emoji">{getCategoryEmoji(item.category)}</div>
                      <div style={{flex:1}}>
                        <div className="co-item-name">{item.name}</div>
                        <div className="co-item-qty">Qty: {item.qty}</div>
                      </div>
                      <div className="co-item-price">{formatCurrency(incl)}</div>
                    </div>
                  );
                })}
                <div className="co-total-row"><span>Total</span><span>{formatCurrency(totalIncl)}</span></div>
                <div style={{fontSize:12,color:'var(--text3)',marginBottom:14,lineHeight:1.6}}>* Final price confirmed after team review. Transport charges extra.</div>
                <button type="submit" className="btn-gold co-submit-btn" disabled={loading}>
                  {loading ? 'Sending...' : '📩 Submit Enquiry & Get Quote'}
                </button>
                <a href={`https://wa.me/918867099199`} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{width:'100%',justifyContent:'center',padding:'13px',marginTop:10}}>
                  <FaWhatsapp size={15}/> Send on WhatsApp Instead
                </a>
                <Link href="/cart" style={{display:'flex',alignItems:'center',gap:6,justifyContent:'center',marginTop:14,fontSize:13,color:'var(--text3)'}}><FaArrowLeft size={10}/> Back to Cart</Link>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
