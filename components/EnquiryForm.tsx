import { useState } from 'react';
import type { FormEvent } from 'react';
import { FaWhatsapp, FaPaperPlane } from 'react-icons/fa';
import { PRODUCT_CATEGORIES } from '../data/products';

interface EnquiryFormProps {
  productName?: string;
}

interface EnquiryFormState {
  name: string;
  phone: string;
  email: string;
  city: string;
  machine: string;
  message: string;
}

export default function EnquiryForm({ productName = '' }: EnquiryFormProps) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', machine: productName, message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const set = (k: keyof EnquiryFormState, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.phone) { setError('Name and phone are required.'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setSuccess(true);
      const wa = `https://wa.me/918867099199?text=Hello%2C%20I%20am%20${encodeURIComponent(form.name)}%20(${encodeURIComponent(form.phone)}).%20Interested%20in%3A%20${encodeURIComponent(form.machine || 'General Enquiry')}.%20${encodeURIComponent(form.message)}`;
      setTimeout(() => window.open(wa, '_blank'), 800);
    } catch { setError('Something went wrong. Please try again.'); }
    setLoading(false);
  };

  if (success) return (
    <div style={{textAlign:'center',padding:'32px 20px'}}>
      <div style={{fontSize:48,marginBottom:12}}>✅</div>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:20,fontWeight:700,color:'var(--navy)',marginBottom:8}}>Enquiry Sent!</div>
      <div style={{fontSize:14,color:'var(--text2)',lineHeight:1.7}}>Thank you! Our team will contact you within 24 hours.<br/>Opening WhatsApp for quick chat...</div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
        <div>
          <label className="form-label">Your Name *</label>
          <input className="form-input" value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Full Name" required />
        </div>
        <div>
          <label className="form-label">Phone Number *</label>
          <input className="form-input" type="tel" value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="+91 XXXXX XXXXX" required />
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
        <div>
          <label className="form-label">Email Address</label>
          <input className="form-input" type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="you@example.com" />
        </div>
        <div>
          <label className="form-label">City / State</label>
          <input className="form-input" value={form.city} onChange={e=>set('city',e.target.value)} placeholder="Your City" />
        </div>
      </div>
      <div style={{marginBottom:14}}>
        <label className="form-label">Machine Interested In</label>
        <select className="form-input" value={form.machine} onChange={e=>set('machine',e.target.value)}>
          <option value="">Select Machine Type</option>
          {PRODUCT_CATEGORIES.filter(c=>c!=='All').map(c=><option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div style={{marginBottom:16}}>
        <label className="form-label">Message / Requirements</label>
        <textarea className="form-input" rows={3} value={form.message} onChange={e=>set('message',e.target.value)} placeholder="Describe your requirement — capacity, budget, quantity needed..." />
      </div>
      {error && <div className="form-error" style={{marginBottom:12}}>{error}</div>}
      <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
        <button type="submit" className="btn-gold" style={{flex:1,justifyContent:'center',padding:'13px'}} disabled={loading}>
          <FaPaperPlane size={13}/> {loading ? 'Sending...' : 'Send Enquiry'}
        </button>
        <a href={`https://wa.me/918867099199?text=Hello%2C%20interested%20in%20${encodeURIComponent(form.machine||'your machines')}`} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{padding:'13px 18px'}}>
          <FaWhatsapp size={15}/>
        </a>
      </div>
      <div style={{fontSize:12,color:'var(--text3)',textAlign:'center',marginTop:10}}>📞 We reply within 24 hours • WhatsApp also available</div>
    </form>
  );
}
