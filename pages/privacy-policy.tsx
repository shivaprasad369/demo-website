import Head from 'next/head';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <>
      <Head><title>Privacy Policy — Viraj Global Machinery</title></Head>
      <div style={{background:'var(--navy)',padding:'44px 0 36px'}}>
        <div className="container">
          <div style={{fontSize:12,color:'rgba(255,255,255,0.4)',marginBottom:10,display:'flex',gap:6}}>
            <Link href="/" style={{color:'rgba(255,255,255,0.5)',textDecoration:'none'}}>Home</Link> / Privacy Policy
          </div>
          <h1 style={{fontFamily:"'Fraunces',serif",fontSize:34,fontWeight:900,color:'#fff'}}>Privacy Policy</h1>
        </div>
      </div>
      <div className="container" style={{padding:'48px 24px',maxWidth:860}}>
        <div style={{fontSize:13,color:'var(--text3)',marginBottom:28}}>Last updated: January 2025</div>
        {[
          {title:'1. Information We Collect',body:'When you fill an enquiry form, we collect your name, phone number, email address, city/state, and company name. We also collect the type of machinery you are interested in and any messages you send us.'},
          {title:'2. How We Use Your Information',body:'Your information is used solely to respond to your enquiries, send product information, pricing and quotations, and to contact you regarding your enquiry. We do not use your data for marketing without your consent.'},
          {title:'3. Data Sharing',body:'We do not sell, trade, or share your personal information with third parties. Your data is only accessible to the Viraj Global Machinery sales and support team.'},
          {title:'4. Data Security',body:'We take reasonable steps to protect your personal information. Our website uses secure connections and your data is stored securely on our servers.'},
          {title:'5. Cookies',body:'Our website may use basic session cookies for functionality. We do not use tracking or advertising cookies.'},
          {title:'6. Your Rights',body:'You have the right to request deletion of your personal data at any time. Contact us at virajglobalmachinery@gmail.com with a deletion request.'},
          {title:'7. Contact',body:'For privacy-related questions, email us at virajglobalmachinery@gmail.com or call +91 90357 77333.'},
        ].map((s,i) => (
          <div key={i} style={{marginBottom:28}}>
            <h3 style={{fontFamily:"'Fraunces',serif",fontSize:18,fontWeight:700,color:'var(--navy)',marginBottom:8}}>{s.title}</h3>
            <p style={{fontSize:14.5,color:'var(--text2)',lineHeight:1.8}}>{s.body}</p>
          </div>
        ))}
        <div style={{marginTop:36,padding:'20px 24px',background:'var(--cream)',borderRadius:12,border:'1px solid var(--cream3)'}}>
          <p style={{fontSize:14,color:'var(--text2)'}}>Questions? Contact us: <a href="mailto:virajglobalmachinery@gmail.com" style={{color:'var(--gold)',fontWeight:600}}>virajglobalmachinery@gmail.com</a></p>
        </div>
      </div>
    </>
  );
}
