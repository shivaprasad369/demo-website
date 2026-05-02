import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import EnquiryForm from '../components/EnquiryForm';
import ProductCard from '../components/ProductCard';
import type { GetServerSideProps } from 'next';
import type { Product } from '../types/domain';

function useCounter(target: number, duration = 2000, start = false): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let s: number | null = null;
    const step = (ts: number) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

interface HomePageProps {
  featuredProducts: Product[];
}

export default function Home({ featuredProducts }: HomePageProps) {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLElement | null>(null);
  const years = useCounter(11, 1800, statsVisible);
  const customers = useCounter(500, 2000, statsVisible);
  const products = useCounter(62, 1800, statsVisible);
  const states = useCounter(10, 1500, statsVisible);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const WHY = [
    { icon: '🏆', title: 'ISO 9001:2015 Certified', desc: 'Internationally certified quality management. Every machine tested before dispatch.' },
    { icon: '🛡️', title: '5 Year Gear Box Warranty', desc: 'Industry-best 5-year warranty on gear box + 1-year motor warranty on all machines.' },
    { icon: '🏭', title: 'Direct Manufacturer', desc: 'We manufacture everything in-house at our Hubballi plant — no middlemen, best price.' },
    { icon: '🚚', title: 'Pan India Delivery', desc: 'Fast delivery and installation support across all major states in India.' },
    { icon: '🔧', title: 'After-Sales Support', desc: 'Full installation, operator training and ongoing technical support included.' },
    { icon: '💰', title: 'Best Price Guarantee', desc: 'Factory-direct pricing. No middlemen. Best market price with flexible payment options.' },
  ];

  const HOW = [
    { n: '01', t: 'Share Requirements', d: 'Call, WhatsApp or fill the enquiry form with your capacity, space & budget.' },
    { n: '02', t: 'Get Custom Quote', d: 'We send a detailed quotation with machine specs and price within 24 hours.' },
    { n: '03', t: 'Manufacturing & QC', d: 'Your machine is built at our Hubballi plant and tested by our quality team.' },
    { n: '04', t: 'Delivery & Installation', d: 'We deliver Pan India and provide full installation & operator training.' },
  ];

  const CLIENTS = ['🏨 Hotels & Resorts','🍽️ Restaurants','⛩️ Temples & Mutts','🎪 Catering Businesses','🏭 Industrial Canteens','🏫 School & College Mess','🏥 Hospital Kitchens','🪖 Defence Canteens','🛕 Dhaba & Food Stalls','🏛️ Government Bodies'];

  return (
    <>
      <Head>
        <title>Viraj Global Machinery — Commercial Food Processing Machinery | Hubballi</title>
        <meta name="description" content="ISO 9001:2015 certified manufacturer of commercial food processing machinery. Roti Making Machines, Dough Mixers, Pulverizers & 62+ machines. Direct from factory, Pan India delivery. Hubballi, Karnataka." />
        <meta property="og:title" content="Viraj Global Machinery — Commercial Food Processing Machinery" />
        <meta property="og:description" content="ISO certified manufacturer. 62+ machines. Pan India delivery. Hubballi, Karnataka." />
      </Head>

      <style>{`
        /* ── HERO ── */
        .hero { background: var(--navy); padding: 80px 0 0; position: relative; overflow: hidden; }
        .hero::before { content:''; position:absolute; top:-100px; right:-100px; width:500px; height:500px; background:radial-gradient(circle,rgba(200,134,10,0.1) 0%,transparent 65%); border-radius:50%; pointer-events:none; }
        .hero::after { content:''; position:absolute; bottom:0; left:0; right:0; height:70px; background:var(--white); clip-path:ellipse(55% 100% at 50% 100%); }
        .hero-inner { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center; padding-bottom:80px; position:relative; z-index:1; }
        .hero-eyebrow { display:inline-flex; align-items:center; gap:8px; background:rgba(200,134,10,0.15); border:1px solid rgba(200,134,10,0.3); color:var(--gold3); padding:6px 14px; border-radius:30px; font-size:11.5px; font-weight:700; letter-spacing:.8px; text-transform:uppercase; margin-bottom:22px; font-family:'Barlow Condensed',sans-serif; }
        .hero-eyebrow::before { content:''; width:6px; height:6px; background:var(--gold2); border-radius:50%; }
        .hero-title { font-family:'Fraunces',serif; font-size:50px; font-weight:900; color:var(--white); line-height:1.08; margin-bottom:20px; }
        .hero-title em { font-style:italic; color:var(--gold2); }
        .hero-sub { font-size:16px; color:rgba(255,255,255,0.55); line-height:1.8; margin-bottom:32px; max-width:480px; }
        .hero-btns { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:36px; }
        .hero-trust { display:flex; flex-wrap:wrap; gap:16px; }
        .trust-item { display:flex; align-items:center; gap:8px; font-size:12.5px; color:rgba(255,255,255,0.5); font-weight:500; }
        .trust-dot { width:18px; height:18px; background:rgba(200,134,10,0.2); border:1px solid rgba(200,134,10,0.4); border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:9px; color:var(--gold2); }

        .hero-right { display:flex; flex-direction:column; gap:14px; }
        .hero-stat-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .hstat { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:14px; padding:20px 18px; transition:all .2s; }
        .hstat:hover { background:rgba(255,255,255,0.09); border-color:rgba(200,134,10,0.3); }
        .hstat-val { font-family:'Fraunces',serif; font-size:32px; font-weight:900; color:var(--gold2); line-height:1; }
        .hstat-label { font-size:12px; color:rgba(255,255,255,0.45); margin-top:5px; font-weight:500; }
        .hero-cert-bar { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.09); border-radius:12px; padding:16px 20px; display:flex; gap:20px; justify-content:space-around; }
        .hcert { text-align:center; }
        .hcert-icon { font-size:24px; margin-bottom:5px; }
        .hcert-label { font-size:10.5px; font-weight:700; color:rgba(255,255,255,0.7); letter-spacing:.5px; text-transform:uppercase; font-family:'Barlow Condensed',sans-serif; }
        .hcert-sub { font-size:10px; color:rgba(255,255,255,0.35); margin-top:2px; }
        .hwa-card { background:rgba(37,211,102,0.1); border:1px solid rgba(37,211,102,0.25); border-radius:12px; padding:16px 20px; display:flex; align-items:center; justify-content:space-between; gap:16px; cursor:pointer; transition:all .2s; text-decoration:none; }
        .hwa-card:hover { background:rgba(37,211,102,0.16); border-color:rgba(37,211,102,0.4); }
        .hwa-left { display:flex; align-items:center; gap:12px; }
        .hwa-icon { width:36px; height:36px; background:#25D366; border-radius:9px; display:flex; align-items:center; justify-content:center; font-size:18px; }
        .hwa-title { font-size:13px; font-weight:700; color:rgba(255,255,255,0.9); }
        .hwa-sub { font-size:11.5px; color:rgba(255,255,255,0.45); margin-top:2px; }
        .hwa-arrow { color:rgba(37,211,102,0.8); font-size:18px; font-weight:700; }

        /* ── TICKER ── */
        .ticker { background:var(--gold); padding:11px 0; overflow:hidden; white-space:nowrap; }
        .ticker-track { display:inline-flex; animation:tick 30s linear infinite; }
        .ticker-track:hover { animation-play-state:paused; }
        @keyframes tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .ticker-item { display:inline-flex; align-items:center; gap:8px; color:var(--navy); font-size:13px; font-weight:700; padding:0 28px; font-family:'Barlow Condensed',sans-serif; letter-spacing:.5px; text-transform:uppercase; }
        .ticker-sep { width:4px; height:4px; background:rgba(7,17,31,0.3); border-radius:50%; flex-shrink:0; }

        /* ── PRODUCTS GRID ── */
        .fp-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:18px; margin-top:40px; }

        /* ── ABOUT ── */
        .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        .about-plate { background:var(--navy); border-radius:20px; padding:36px; position:relative; overflow:hidden; }
        .about-plate::before { content:''; position:absolute; bottom:-40px; right:-40px; width:200px; height:200px; background:radial-gradient(circle,rgba(200,134,10,0.15) 0%,transparent 65%); border-radius:50%; }
        .about-badge { position:absolute; top:-14px; right:28px; background:var(--gold); color:var(--navy); padding:8px 18px; border-radius:8px; font-size:11.5px; font-weight:800; letter-spacing:.5px; font-family:'Barlow Condensed',sans-serif; text-transform:uppercase; }
        .about-mfg-icon { font-size:64px; text-align:center; margin-bottom:24px; }
        .about-stats2 { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        .astat { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:11px; padding:16px 14px; text-align:center; }
        .astat-n { font-family:'Fraunces',serif; font-size:28px; font-weight:900; color:var(--gold2); line-height:1; }
        .astat-l { font-size:11px; color:rgba(255,255,255,0.45); margin-top:4px; font-weight:500; }
        .about-points { display:flex; flex-direction:column; gap:12px; margin:20px 0; }
        .apoint { display:flex; align-items:flex-start; gap:12px; }
        .acheck { width:22px; height:22px; background:var(--gold); border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px; font-size:11px; color:var(--navy); font-weight:900; }
        .apoint-text { font-size:14px; color:var(--text2); line-height:1.65; }
        .about-chips { display:flex; flex-wrap:wrap; gap:8px; margin-top:20px; }
        .achip { background:var(--goldl); border:1px solid var(--goldl2); color:var(--gold); padding:5px 14px; border-radius:20px; font-size:12px; font-weight:700; font-family:'Barlow Condensed',sans-serif; letter-spacing:.3px; text-transform:uppercase; }

        /* ── STATS ── */
        .stats-row { display:grid; grid-template-columns:repeat(4,1fr); }
        .sblock { text-align:center; padding:50px 20px; border-right:1px solid rgba(255,255,255,0.1); }
        .sblock:last-child { border-right:none; }
        .snum { font-family:'Fraunces',serif; font-size:54px; font-weight:900; color:var(--gold2); line-height:1; }
        .splus { font-size:26px; opacity:.6; }
        .slabel { font-size:12px; color:rgba(255,255,255,0.5); text-transform:uppercase; letter-spacing:1px; margin-top:10px; font-weight:700; font-family:'Barlow Condensed',sans-serif; }

        /* ── HOW IT WORKS ── */
        .hiw-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:28px; position:relative; margin-top:48px; }
        .hiw-grid::before { content:''; position:absolute; top:35px; left:calc(12.5% + 18px); right:calc(12.5% + 18px); height:1px; background:var(--cream3); z-index:0; }
        .hiw-step { text-align:center; position:relative; z-index:1; }
        .hiw-circle { width:70px; height:70px; background:var(--navy); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 20px; border:3px solid var(--white); outline:2px solid var(--cream3); }
        .hiw-num { font-family:'Fraunces',serif; font-size:22px; font-weight:900; color:var(--gold2); }
        .hiw-title { font-family:'Barlow Condensed',sans-serif; font-size:15px; font-weight:700; color:var(--navy); text-transform:uppercase; letter-spacing:.5px; margin-bottom:8px; }
        .hiw-desc { font-size:13.5px; color:var(--text2); line-height:1.7; }

        /* ── WHY ── */
        .why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:40px; }
        .wcard { background:var(--white); border:1.5px solid var(--cream3); border-radius:16px; padding:26px 22px; transition:all .25s; }
        .wcard:hover { border-color:var(--gold); box-shadow:0 6px 24px rgba(200,134,10,0.1); transform:translateY(-3px); }
        .wcard-icon { font-size:28px; margin-bottom:14px; }
        .wcard-title { font-family:'Barlow Condensed',sans-serif; font-size:16px; font-weight:700; color:var(--navy); text-transform:uppercase; letter-spacing:.5px; margin-bottom:8px; }
        .wcard-desc { font-size:13.5px; color:var(--text2); line-height:1.7; }

        /* ── CLIENTS ── */
        .clients-wrap { display:flex; flex-wrap:wrap; gap:12px; justify-content:center; margin-top:36px; }
        .cclient { background:var(--white); border:1.5px solid var(--cream3); border-radius:11px; padding:12px 20px; font-size:14px; font-weight:500; color:var(--text2); transition:all .2s; }
        .cclient:hover { border-color:var(--gold); color:var(--navy); background:var(--cream); }

        /* ── CERTS ── */
        .certs-flex { display:flex; gap:16px; flex-wrap:wrap; justify-content:center; margin-top:36px; }
        .cert-card { background:var(--white); border:2px solid var(--cream3); border-radius:16px; padding:26px 24px; text-align:center; min-width:140px; flex:1; max-width:175px; transition:all .25s; }
        .cert-card:hover { border-color:var(--gold); box-shadow:0 4px 20px rgba(200,134,10,0.1); }
        .cert-icon { font-size:32px; margin-bottom:10px; }
        .cert-name { font-family:'Barlow Condensed',sans-serif; font-size:13.5px; font-weight:700; color:var(--navy); text-transform:uppercase; letter-spacing:.5px; margin-bottom:4px; }
        .cert-sub { font-size:11.5px; color:var(--text3); }

        /* ── CONTACT ── */
        .contact-grid { display:grid; grid-template-columns:1fr 1.15fr; gap:56px; align-items:start; }
        .contact-card { background:var(--white); border:1.5px solid var(--cream3); border-radius:16px; padding:28px; margin-top:24px; }
        .citem { display:flex; align-items:flex-start; gap:14px; padding:14px 0; border-bottom:1px solid var(--cream3); }
        .citem:last-child { border-bottom:none; }
        .citem-icon { width:38px; height:38px; background:var(--goldl); border:1px solid var(--goldl2); border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:14px; }
        .citem-label { font-size:11px; color:var(--text3); text-transform:uppercase; letter-spacing:.5px; font-weight:700; font-family:'Barlow Condensed',sans-serif; margin-bottom:3px; }
        .citem-val { font-size:14.5px; font-weight:600; color:var(--navy); }
        .citem-val a { color:var(--navy); transition:color .2s; }
        .citem-val a:hover { color:var(--gold); }
        .form-box { background:var(--white); border:1.5px solid var(--cream3); border-radius:20px; padding:36px; box-shadow:0 12px 40px rgba(0,0,0,0.06); }
        .form-box-title { font-family:'Fraunces',serif; font-size:24px; font-weight:700; color:var(--navy); margin-bottom:6px; }
        .form-box-sub { font-size:14px; color:var(--text2); margin-bottom:24px; }

        /* ── RESPONSIVE ── */
        @media(max-width:1024px) {
          .why-grid { grid-template-columns:1fr 1fr; }
          .stats-row { grid-template-columns:1fr 1fr; }
          .sblock:nth-child(2) { border-right:none; }
          .sblock:nth-child(3) { border-top:1px solid rgba(255,255,255,0.1); }
          .hiw-grid { grid-template-columns:1fr 1fr; }
          .hiw-grid::before { display:none; }
          .contact-grid { grid-template-columns:1fr; }
        }
        @media(max-width:768px) {
          .hero-inner { grid-template-columns:1fr; }
          .hero-right { display:none; }
          .hero-title { font-size:34px; }
          .hero::after { height:50px; }
          .about-grid { grid-template-columns:1fr; }
          .why-grid { grid-template-columns:1fr; }
          .stats-row { grid-template-columns:1fr 1fr; }
          .hiw-grid { grid-template-columns:1fr 1fr; }
        }
        @media(max-width:540px) {
          .hero { padding:52px 0 0; }
          .hero-title { font-size:28px; }
          .sblock { padding:32px 12px; }
          .snum { font-size:40px; }
          .hiw-grid { grid-template-columns:1fr; }
        }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div>
              <div className="hero-eyebrow">No.1 Food Machinery Manufacturer · Hubballi</div>
              <h1 className="hero-title">Commercial Food<br/>Processing<br/><em>Machinery</em> Built<br/>to Last</h1>
              <p className="hero-sub">Viraj Global Machinery manufactures high-performance Roti Making Machines, Pulverizers, Dough Mixers & 62+ commercial kitchen machines — ISO 9001:2015 certified, trusted across India since 2014.</p>
              <div className="hero-btns">
                <Link href="/products" className="btn-gold"><FaArrowRight size={13}/> Explore 62+ Products</Link>
                <Link href="/#contact" className="btn-ghost-white">Get Free Quote</Link>
                <a href="https://wa.me/918867099199?text=Hello%2C+I+want+to+know+more+about+your+machines." target="_blank" rel="noopener noreferrer" className="btn-wa"><FaWhatsapp size={15}/> WhatsApp</a>
              </div>
              <div className="hero-trust">
                {['ISO 9001:2015','GST Verified','Made in India','Pan India Delivery'].map(t => (
                  <div key={t} className="trust-item"><div className="trust-dot">✓</div>{t}</div>
                ))}
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-stat-grid">
                <div className="hstat"><div className="hstat-val">62+</div><div className="hstat-label">Product Models</div></div>
                <div className="hstat"><div className="hstat-val">500+</div><div className="hstat-label">Happy Customers</div></div>
                <div className="hstat"><div className="hstat-val">11+</div><div className="hstat-label">Years Excellence</div></div>
                <div className="hstat"><div className="hstat-val">10+</div><div className="hstat-label">States Served</div></div>
              </div>
              <div className="hero-cert-bar">
                <div className="hcert"><div className="hcert-icon">🏅</div><div className="hcert-label">ISO Certified</div><div className="hcert-sub">9001:2015</div></div>
                <div className="hcert"><div className="hcert-icon">🛡️</div><div className="hcert-label">5 Yr Warranty</div><div className="hcert-sub">Gear Box</div></div>
                <div className="hcert"><div className="hcert-icon">🇮🇳</div><div className="hcert-label">Made In India</div><div className="hcert-sub">Hubballi Plant</div></div>
                <div className="hcert"><div className="hcert-icon">🚚</div><div className="hcert-label">Pan India</div><div className="hcert-sub">Delivery</div></div>
              </div>
              <a href="https://wa.me/918867099199" target="_blank" rel="noopener noreferrer" className="hwa-card">
                <div className="hwa-left">
                  <div className="hwa-icon">💬</div>
                  <div><div className="hwa-title">Chat on WhatsApp</div><div className="hwa-sub">+91 88670 99199 · Instant response</div></div>
                </div>
                <div className="hwa-arrow">→</div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {['Roti Making Machines','Atta Dough Mixers','Gravy Machines','Chapati Bhatti','Pulverizer Machines','Flour Mills','Vegetable Cutters','Wet Grinders','Commercial Stoves','Oil Making Machines','Sugarcane Juice Machines','Deep Fryers',
            'Roti Making Machines','Atta Dough Mixers','Gravy Machines','Chapati Bhatti','Pulverizer Machines','Flour Mills','Vegetable Cutters','Wet Grinders','Commercial Stoves','Oil Making Machines','Sugarcane Juice Machines','Deep Fryers'
          ].map((item, i) => <span key={i} className="ticker-item"><span className="ticker-sep"/> {item}</span>)}
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="section">
        <div className="container">
          <div className="centered">
            <div className="stag">⭐ Our Products</div>
            <h2 className="section-title">Machines for <em>Every Food Business</em></h2>
            <p className="section-sub">From single machines to complete commercial kitchen setups — manufactured at our Hubballi plant with ISO-certified quality.</p>
          </div>
          <div className="fp-grid">
            {featuredProducts.map(p => <ProductCard key={p.id} product={p}/>)}
          </div>
          <div style={{textAlign:'center',marginTop:36}}>
            <Link href="/products" className="btn-navy" style={{fontSize:15,padding:'14px 32px'}}>View All 62+ Products →</Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section section-cream" id="about">
        <div className="container">
          <div className="about-grid">
            <div style={{position:'relative'}}>
              <div className="about-plate">
                <div className="about-badge">Est. 2014 · Hubballi</div>
                <div className="about-mfg-icon">🏭</div>
                <div className="about-stats2">
                  <div className="astat"><div className="astat-n">62+</div><div className="astat-l">Product Models</div></div>
                  <div className="astat"><div className="astat-n">500+</div><div className="astat-l">Happy Customers</div></div>
                  <div className="astat"><div className="astat-n">11+</div><div className="astat-l">Years Excellence</div></div>
                  <div className="astat"><div className="astat-n">ISO</div><div className="astat-l">9001:2015 Certified</div></div>
                </div>
              </div>
            </div>
            <div>
              <div className="stag">About Us</div>
              <h2 className="section-title">Viraj Global <em>Machinery</em></h2>
              <p style={{fontSize:15,color:'var(--text2)',lineHeight:1.85,marginBottom:16}}>Viraj Global Machinery is a leading manufacturer and supplier of commercial food processing machinery, proudly based in <strong>Hubballi, Karnataka</strong>. Established in 2014, we have rapidly grown into a trusted name across India.</p>
              <p style={{fontSize:15,color:'var(--text2)',lineHeight:1.85}}>Our product range includes Roti Making Machines, Atta Dough Mixers, Pulverizers, Gravy Machines, Chapati Bhattis, Vegetable Cutters, and 62+ more kitchen solutions — each engineered for durability and efficiency.</p>
              <div className="about-points">
                {['ISO 9001:2015 Certified — quality guaranteed at every stage','62+ product models across 18+ machine categories','Factory-direct pricing — no middlemen, best market rates','Complete after-sales support, installation & operator training','Serving Karnataka, Maharashtra, AP, Telangana, Goa & more'].map((pt,i)=>(
                  <div key={i} className="apoint"><div className="acheck">✓</div><div className="apoint-text">{pt}</div></div>
                ))}
              </div>
              <div className="about-chips">
                {['Hotels','Restaurants','Temples','Catering','Canteens','Industrial','Govt. Bodies'].map(c=><span key={c} className="achip">{c}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section-navy" style={{padding:0}} ref={statsRef}>
        <div className="stats-row">
          <div className="sblock"><div className="snum">{years}<span className="splus">+</span></div><div className="slabel">Years of Excellence</div></div>
          <div className="sblock"><div className="snum">{customers}<span className="splus">+</span></div><div className="slabel">Happy Customers</div></div>
          <div className="sblock"><div className="snum">{products}<span className="splus">+</span></div><div className="slabel">Product Models</div></div>
          <div className="sblock"><div className="snum">{states}<span className="splus">+</span></div><div className="slabel">States Served</div></div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="container">
          <div className="centered">
            <div className="stag">Simple Process</div>
            <h2 className="section-title">How It <em>Works</em></h2>
            <p className="section-sub">From your first enquiry to machine installation — smooth and hassle-free.</p>
          </div>
          <div className="hiw-grid">
            {HOW.map(s=>(
              <div key={s.n} className="hiw-step">
                <div className="hiw-circle"><span className="hiw-num">{s.n}</span></div>
                <div className="hiw-title">{s.t}</div>
                <div className="hiw-desc">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="section section-cream">
        <div className="container">
          <div className="centered">
            <div className="stag">Why Choose VGM</div>
            <h2 className="section-title">Trusted Products. <em>Trusted Solutions.</em></h2>
          </div>
          <div className="why-grid">
            {WHY.map((c,i)=>(
              <div key={i} className="wcard">
                <div className="wcard-icon">{c.icon}</div>
                <div className="wcard-title">{c.title}</div>
                <div className="wcard-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="section">
        <div className="container">
          <div className="centered">
            <div className="stag">Our Clients</div>
            <h2 className="section-title">Who We <em>Serve</em></h2>
            <p className="section-sub">Trusted by businesses across the food industry.</p>
          </div>
          <div className="clients-wrap">
            {CLIENTS.map((c,i)=><div key={i} className="cclient">{c}</div>)}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="section section-cream">
        <div className="container">
          <div className="centered">
            <div className="stag">Certifications & Trust</div>
            <h2 className="section-title">Quality You Can <em>Count On</em></h2>
          </div>
          <div className="certs-flex">
            {[{i:'🏅',n:'ISO 9001:2015',s:'Certified by OCI'},{i:'🇮🇳',n:'Made in India',s:'Proudly Indian'},{i:'✅',n:'GST Verified',s:'29BBNPJ6341J1Z7'},{i:'🛡️',n:'5 Year Warranty',s:'Gear Box'},{i:'🔒',n:'1 Year Warranty',s:'Motor'},{i:'📋',n:'Cert No.',s:'Q-2611253294'}].map((c,i)=>(
              <div key={i} className="cert-card"><div className="cert-icon">{c.i}</div><div className="cert-name">{c.n}</div><div className="cert-sub">{c.s}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section" id="contact">
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="stag">Contact Us</div>
              <h2 className="section-title">Get a <em>Free Quote</em> Today</h2>
              <p style={{fontSize:15,color:'var(--text2)',lineHeight:1.8,margin:'16px 0 24px'}}>Tell us your requirements and our team will contact you within 24 hours with a detailed quotation.</p>
              <div className="contact-card">
                {[
                  {i:'📍',l:'Factory Address',v:'64/G/2, Pavan Industry, Tarihal Industrial Area, Hubballi – 580026',href:null},
                  {i:'📞',l:'Owner',v:'+91 90357 77333',href:'tel:+919035777333'},
                  {i:'📞',l:'Sales',v:'+91 88670 99199',href:'tel:+918867099199'},
                  {i:'💬',l:'WhatsApp Sales',v:'+91 88670 99199',href:'https://wa.me/918867099199'},
                  {i:'✉️',l:'Email',v:'virajglobalmachinery@gmail.com',href:'mailto:virajglobalmachinery@gmail.com'},
                ].map((row,i)=>(
                  <div key={i} className="citem">
                    <div className="citem-icon">{row.i}</div>
                    <div>
                      <div className="citem-label">{row.l}</div>
                      {row.href ? <div className="citem-val"><a href={row.href} target={row.href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer">{row.v}</a></div>
                        : <div style={{fontSize:13.5,color:'var(--text2)',lineHeight:1.6}}>{row.v}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-box">
              <div className="form-box-title">Send Enquiry</div>
              <div className="form-box-sub">Fill in the form — our team calls you within 24 hours.</div>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  const { getAllProducts } = await import('../lib/products');
  const featuredProducts = getAllProducts().filter(product => product.featured).slice(0, 8);
  return { props: { featuredProducts } };
};
