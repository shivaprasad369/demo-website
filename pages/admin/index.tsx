import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import type { FormEvent } from 'react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); setError('');
    const res = await fetch('/api/admin?action=get-enquiries', {
      headers: { 'x-admin-auth': password },
    });
    if (res.ok) {
      sessionStorage.setItem('vgm_admin_auth', password);
      router.push('/admin/dashboard');
    } else {
      setError('Incorrect password. Please try again.');
    }
    setLoading(false);
  };

  return (
    <>
      <Head><title>Admin Login — VGM</title></Head>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900&family=Barlow:wght@400;500;600;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        body { font-family:'Barlow',sans-serif; background:#07111f; color:#1c1c1c; }
        .al-page { min-height:100vh; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#07111f 0%,#0d1e30 100%); padding:24px; }
        .al-box { background:#fff; border-radius:20px; padding:44px; width:100%; max-width:400px; box-shadow:0 24px 60px rgba(0,0,0,0.4); }
        .al-logo { text-align:center; margin-bottom:32px; }
        .al-logo-icon { font-size:40px; margin-bottom:10px; }
        .al-logo-title { font-family:'Fraunces',serif; font-size:20px; font-weight:700; color:#07111f; margin-bottom:4px; }
        .al-logo-sub { font-size:12px; color:#888; }
        .al-label { display:block; font-size:11.5px; font-weight:700; color:#4a4a4a; margin-bottom:6px; text-transform:uppercase; letter-spacing:.5px; }
        .al-input-wrap { position:relative; margin-bottom:18px; }
        .al-icon { position:absolute; left:14px; top:50%; transform:translateY(-50%); color:#888; }
        .al-input { width:100%; border:1.5px solid #e6d5b4; border-radius:9px; padding:13px 44px 13px 40px; font-size:14px; font-family:'Barlow',sans-serif; color:#1c1c1c; background:#fdf8f0; outline:none; transition:border-color .2s; }
        .al-input:focus { border-color:#c8860a; background:#fff; }
        .al-pw-toggle { position:absolute; right:12px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; color:#888; padding:4px; }
        .al-btn { width:100%; padding:14px; background:#c8860a; color:#fff; border:none; border-radius:10px; font-size:14px; font-weight:700; cursor:pointer; font-family:'Barlow',sans-serif; letter-spacing:.5px; text-transform:uppercase; transition:all .2s; }
        .al-btn:hover { background:#e09a0e; }
        .al-btn:disabled { opacity:.6; cursor:not-allowed; }
        .al-error { background:rgba(220,38,38,0.08); border:1px solid rgba(220,38,38,0.2); color:#dc2626; border-radius:8px; padding:10px 14px; font-size:13px; margin-bottom:16px; }
        .al-back { text-align:center; margin-top:18px; font-size:12.5px; }
        .al-back a { color:#c8860a; text-decoration:none; font-weight:600; }
      `}</style>
      <div className="al-page">
        <div className="al-box">
          <div className="al-logo">
            <div className="al-logo-icon">⚙️</div>
            <div className="al-logo-title">VGM Admin Panel</div>
            <div className="al-logo-sub">Viraj Global Machinery · Management</div>
          </div>
          {error && <div className="al-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <label className="al-label">Admin Password</label>
            <div className="al-input-wrap">
              <FaLock className="al-icon" size={13}/>
              <input className="al-input" type={showPw?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter admin password" required autoFocus/>
              <button type="button" className="al-pw-toggle" onClick={()=>setShowPw(!showPw)}>{showPw?<FaEyeSlash size={13}/>:<FaEye size={13}/>}</button>
            </div>
            <button type="submit" className="al-btn" disabled={loading}>{loading?'Verifying...':'Login to Admin Panel'}</button>
          </form>
          <div className="al-back"><a href="/">← Back to Website</a></div>
        </div>
      </div>
    </>
  );
}
