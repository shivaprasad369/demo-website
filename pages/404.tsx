import Head from 'next/head';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Head><title>Page Not Found — Viraj Global Machinery</title></Head>
      <div style={{minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 20px',background:'var(--cream)'}}>
        <div style={{textAlign:'center',maxWidth:500}}>
          <div style={{fontSize:72,marginBottom:16}}>⚙️</div>
          <h1 style={{fontFamily:"'Fraunces',serif",fontSize:52,fontWeight:900,color:'var(--navy)',marginBottom:8}}>404</h1>
          <h2 style={{fontFamily:"'Fraunces',serif",fontSize:24,fontWeight:700,color:'var(--navy)',marginBottom:12}}>Page Not Found</h2>
          <p style={{fontSize:15,color:'var(--text2)',lineHeight:1.7,marginBottom:28}}>This page doesn't exist or has been moved. Let us help you find what you need.</p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/" className="btn-navy">← Back to Home</Link>
            <Link href="/products" className="btn-gold">Browse Products</Link>
          </div>
        </div>
      </div>
    </>
  );
}
