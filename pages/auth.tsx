import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaPhone, FaEnvelope } from 'react-icons/fa';
import type { FormEvent } from 'react';

export default function Auth() {
  const [tab, setTab] = useState('login');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const [login, setLogin] = useState({ email:'', password:'' });
  const [reg, setReg] = useState({ name:'', email:'', phone:'', password:'', confirm:'' });
  const setL = (k: keyof typeof login, v: string) => setLogin(p=>({...p,[k]:v}));
  const setR = (k: keyof typeof reg, v: string) => setReg(p=>({...p,[k]:v}));

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ action:'login', email:login.email, password:login.password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || 'Invalid credentials'); setLoading(false); return; }
      localStorage.setItem('vgm_user', JSON.stringify(data.user));
      window.dispatchEvent(new Event('vgm_user_update'));
      router.push('/');
    } catch { setError('Something went wrong. Please try again.'); }
    setLoading(false);
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (reg.password !== reg.confirm) { setError('Passwords do not match.'); return; }
    if (reg.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ action:'register', name:reg.name, email:reg.email, phone:reg.phone, password:reg.password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || 'Registration failed'); setLoading(false); return; }
      setSuccess('Account created! Please login.');
      setTab('login');
      setLogin(l => ({ ...l, email: reg.email }));
    } catch { setError('Something went wrong. Please try again.'); }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>{tab==='login'?'Login':'Register'} — Viraj Global Machinery</title>
      </Head>
      <style>{`
        .auth-page { min-height: 100vh; background: linear-gradient(135deg, var(--navy) 0%, var(--navy2) 60%, var(--navy3) 100%); display: flex; align-items: center; justify-content: center; padding: 40px 20px; }
        .auth-box { background: var(--white); border-radius: 20px; padding: 40px; width: 100%; max-width: 440px; box-shadow: 0 24px 60px rgba(0,0,0,0.25); }
        .auth-logo { text-align: center; margin-bottom: 28px; }
        .auth-logo-title { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 700; color: var(--navy); margin-bottom: 4px; }
        .auth-logo-sub { font-size: 12.5px; color: var(--text3); }
        .auth-tabs { display: flex; background: var(--cream); border-radius: 10px; padding: 4px; margin-bottom: 28px; }
        .auth-tab { flex: 1; padding: 10px; text-align: center; border: none; background: none; font-size: 14px; font-weight: 600; color: var(--text2); cursor: pointer; border-radius: 7px; transition: all .2s; font-family: 'Barlow', sans-serif; }
        .auth-tab.active { background: var(--white); color: var(--navy); box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .auth-field { margin-bottom: 16px; position: relative; }
        .auth-input-wrap { position: relative; }
        .auth-input-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text3); font-size: 13px; }
        .auth-input { width: 100%; border: 1.5px solid var(--cream3); border-radius: 9px; padding: 12px 14px 12px 36px; font-size: 14px; font-family: 'Barlow', sans-serif; color: var(--text); background: var(--cream); transition: border-color .2s; outline: none; }
        .auth-input:focus { border-color: var(--gold); background: var(--white); }
        .auth-input::placeholder { color: var(--text3); }
        .pw-toggle { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--text3); padding: 4px; }
        .pw-toggle:hover { color: var(--navy); }
        .auth-submit { width: 100%; padding: 14px; font-size: 14px; border-radius: 10px; justify-content: center; margin-top: 4px; }
        .auth-divider { text-align: center; font-size: 12px; color: var(--text3); margin: 16px 0; }
        .auth-footer { text-align: center; font-size: 12.5px; color: var(--text3); margin-top: 18px; }
        .auth-footer a { color: var(--gold); font-weight: 600; }
        .auth-error { background: rgba(220,38,38,0.08); border: 1px solid rgba(220,38,38,0.2); color: var(--red-err); border-radius: 8px; padding: 10px 14px; font-size: 13px; margin-bottom: 14px; }
        .auth-success { background: rgba(22,163,74,0.08); border: 1px solid rgba(22,163,74,0.2); color: var(--green); border-radius: 8px; padding: 10px 14px; font-size: 13px; margin-bottom: 14px; }
      `}</style>

      <div className="auth-page">
        <div className="auth-box">
          <div className="auth-logo">
            <div style={{fontSize:32,marginBottom:8}}>🏭</div>
            <div className="auth-logo-title">Viraj Global Machinery</div>
            <div className="auth-logo-sub">Hubballi, Karnataka · Est. 2014</div>
          </div>

          <div className="auth-tabs">
            <button className={`auth-tab ${tab==='login'?'active':''}`} onClick={()=>{setTab('login');setError('');setSuccess('');}}>Login</button>
            <button className={`auth-tab ${tab==='register'?'active':''}`} onClick={()=>{setTab('register');setError('');setSuccess('');}}>Register</button>
          </div>

          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          {tab === 'login' ? (
            <form onSubmit={handleLogin}>
              <div className="auth-field">
                <label className="form-label">Email Address</label>
                <div className="auth-input-wrap">
                  <FaEnvelope className="auth-input-icon"/>
                  <input className="auth-input" type="email" value={login.email} onChange={e=>setL('email',e.target.value)} placeholder="you@example.com" required/>
                </div>
              </div>
              <div className="auth-field">
                <label className="form-label">Password</label>
                <div className="auth-input-wrap">
                  <FaLock className="auth-input-icon"/>
                  <input className="auth-input" type={showPw?'text':'password'} value={login.password} onChange={e=>setL('password',e.target.value)} placeholder="Your password" required/>
                  <button type="button" className="pw-toggle" onClick={()=>setShowPw(!showPw)}>{showPw?<FaEyeSlash size={13}/>:<FaEye size={13}/>}</button>
                </div>
              </div>
              <button type="submit" className="btn-gold auth-submit" disabled={loading}>{loading?'Logging in...':'Login to Account'}</button>
              <div className="auth-footer">Don't have an account? <a onClick={()=>setTab('register')} style={{cursor:'pointer'}}>Register here</a></div>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <div className="auth-field">
                <label className="form-label">Full Name *</label>
                <div className="auth-input-wrap">
                  <FaUser className="auth-input-icon"/>
                  <input className="auth-input" value={reg.name} onChange={e=>setR('name',e.target.value)} placeholder="Your Full Name" required/>
                </div>
              </div>
              <div className="auth-field">
                <label className="form-label">Email Address *</label>
                <div className="auth-input-wrap">
                  <FaEnvelope className="auth-input-icon"/>
                  <input className="auth-input" type="email" value={reg.email} onChange={e=>setR('email',e.target.value)} placeholder="you@example.com" required/>
                </div>
              </div>
              <div className="auth-field">
                <label className="form-label">Phone Number *</label>
                <div className="auth-input-wrap">
                  <FaPhone className="auth-input-icon"/>
                  <input className="auth-input" type="tel" value={reg.phone} onChange={e=>setR('phone',e.target.value)} placeholder="+91 XXXXX XXXXX" required/>
                </div>
              </div>
              <div className="auth-field">
                <label className="form-label">Password *</label>
                <div className="auth-input-wrap">
                  <FaLock className="auth-input-icon"/>
                  <input className="auth-input" type={showPw?'text':'password'} value={reg.password} onChange={e=>setR('password',e.target.value)} placeholder="Min 6 characters" required/>
                  <button type="button" className="pw-toggle" onClick={()=>setShowPw(!showPw)}>{showPw?<FaEyeSlash size={13}/>:<FaEye size={13}/>}</button>
                </div>
              </div>
              <div className="auth-field">
                <label className="form-label">Confirm Password *</label>
                <div className="auth-input-wrap">
                  <FaLock className="auth-input-icon"/>
                  <input className="auth-input" type="password" value={reg.confirm} onChange={e=>setR('confirm',e.target.value)} placeholder="Repeat password" required/>
                </div>
              </div>
              <div style={{fontSize:12,color:'var(--text3)',marginBottom:16}}>By registering, you agree to our <Link href="/privacy-policy" style={{color:'var(--gold)'}}>Privacy Policy</Link> & <Link href="/terms" style={{color:'var(--gold)'}}>Terms</Link>.</div>
              <button type="submit" className="btn-gold auth-submit" disabled={loading}>{loading?'Creating account...':'Create Account'}</button>
              <div className="auth-footer">Already have an account? <a onClick={()=>setTab('login')} style={{cursor:'pointer'}}>Login here</a></div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
