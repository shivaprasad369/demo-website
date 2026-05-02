import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { FaWhatsapp, FaPhone, FaShoppingCart, FaCheckCircle, FaMinus, FaPlus } from 'react-icons/fa';
import ProductCard from '../../components/ProductCard';
import { addProductToCart } from '../../lib/cart';
import { formatCurrency, getCategoryEmoji, getInclusivePrice, getTagClass } from '../../lib/productMeta';
import type { GetServerSideProps } from 'next';
import type { Product } from '../../types/domain';

interface ProductDetailProps {
  product: Product;
  related: Product[];
}

export default function ProductDetail({ product, related }: ProductDetailProps) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return <div style={{padding:'80px 24px',textAlign:'center'}}><h2>Product not found</h2><Link href="/products" className="btn-gold" style={{marginTop:20,display:'inline-flex'}}>← Back to Products</Link></div>;

  const inclPrice = getInclusivePrice(product.priceExcl, product.gst);
  const emoji = getCategoryEmoji(product.category);
  const tagClass = getTagClass(product.tag);

  const addToCart = () => {
    addProductToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const waMsg = `Hello%2C%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}%20(Qty%3A%20${qty}).%20Please%20share%20the%20price%20and%20details.`;

  return (
    <>
      <Head>
        <title>{product.name} — Viraj Global Machinery</title>
        <meta name="description" content={`${product.name} — ${product.desc} ISO certified. Pan India delivery from Hubballi, Karnataka.`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context":"https://schema.org","@type":"Product",
          "name": product.name, "description": product.desc,
          "brand": {"@type":"Brand","name":"Viraj Global Machinery"},
          "offers": {"@type":"Offer","priceCurrency":"INR","price": product.priceExcl,"availability":"https://schema.org/InStock"}
        })}} />
      </Head>

      <style>{`
        .pd-bc { background:var(--cream); border-bottom:1px solid var(--cream3); padding:12px 0; }
        .pd-bc-inner { display:flex; align-items:center; gap:6px; font-size:12.5px; color:var(--text3); }
        .pd-bc-inner a { color:var(--text3); text-decoration:none; transition:color .2s; }
        .pd-bc-inner a:hover { color:var(--gold); }
        .pd-bc-sep { opacity:.5; }

        .pd-main { padding:40px 0 60px; }
        .pd-grid { display:grid; grid-template-columns:1fr 1fr; gap:52px; align-items:start; }
        .pd-img-box { background:linear-gradient(135deg,var(--cream) 0%,var(--cream2) 100%); border-radius:20px; padding:52px; text-align:center; border:2px solid var(--cream3); position:sticky; top:100px; }
        .pd-emoji { font-size:100px; line-height:1; margin-bottom:20px; display:block; }
        .pd-img-badges { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }
        .pd-img-badge { background:var(--white); border:1.5px solid var(--cream3); border-radius:10px; padding:10px 14px; text-align:center; font-size:11px; font-weight:700; color:var(--text2); font-family:'Barlow Condensed',sans-serif; text-transform:uppercase; letter-spacing:.3px; }
        .pd-img-badge span { display:block; font-size:18px; margin-bottom:4px; }

        .pd-info {}
        .pd-cat { font-size:12px; color:var(--text3); font-weight:700; text-transform:uppercase; letter-spacing:.5px; font-family:'Barlow Condensed',sans-serif; margin-bottom:6px; }
        .pd-name { font-family:'Fraunces',serif; font-size:32px; font-weight:900; color:var(--navy); line-height:1.2; margin-bottom:12px; }
        .pd-tag-row { display:flex; align-items:center; gap:10px; margin-bottom:20px; }
        .pd-desc { font-size:15px; color:var(--text2); line-height:1.8; margin-bottom:24px; }

        .pd-price-box { background:var(--cream); border:2px solid var(--cream3); border-radius:14px; padding:20px; margin-bottom:24px; }
        .pd-price-excl { font-family:'Fraunces',serif; font-size:30px; font-weight:900; color:var(--navy); line-height:1; }
        .pd-price-label { font-size:12px; color:var(--text3); margin-top:2px; }
        .pd-price-incl { margin-top:10px; padding-top:10px; border-top:1px solid var(--cream3); font-size:13.5px; color:var(--text2); }
        .pd-price-incl strong { color:var(--navy); font-weight:700; }
        .pd-gst-note { font-size:12px; color:var(--text3); margin-top:6px; }

        .pd-qty-row { display:flex; align-items:center; gap:16px; margin-bottom:20px; }
        .pd-qty-label { font-size:13px; font-weight:700; color:var(--text2); font-family:'Barlow Condensed',sans-serif; text-transform:uppercase; letter-spacing:.5px; }
        .pd-qty-ctrl { display:flex; align-items:center; gap:0; border:1.5px solid var(--cream3); border-radius:9px; overflow:hidden; }
        .pd-qty-btn { width:36px; height:36px; background:var(--cream); border:none; cursor:pointer; font-size:14px; font-weight:700; color:var(--text2); transition:all .2s; display:flex; align-items:center; justify-content:center; }
        .pd-qty-btn:hover { background:var(--navy); color:var(--white); }
        .pd-qty-val { width:44px; height:36px; border:none; border-left:1.5px solid var(--cream3); border-right:1.5px solid var(--cream3); background:var(--white); text-align:center; font-size:15px; font-weight:700; color:var(--navy); font-family:'Fraunces',serif; }

        .pd-actions { display:flex; flex-direction:column; gap:12px; margin-bottom:28px; }
        .pd-action-row { display:flex; gap:10px; }
        .pd-add-btn { flex:1; padding:14px; font-size:14px; justify-content:center; border-radius:10px; }
        .pd-checkout-btn { flex:1; padding:14px; font-size:14px; justify-content:center; border-radius:10px; }
        .pd-wa-btn { flex:1; padding:14px; font-size:14px; justify-content:center; border-radius:10px; }
        .pd-call-btn { flex:1; padding:14px; font-size:14px; justify-content:center; border-radius:10px; background:var(--cream); border:1.5px solid var(--cream3); color:var(--navy); cursor:pointer; font-weight:700; font-family:'Barlow Condensed',sans-serif; letter-spacing:.5px; text-transform:uppercase; transition:all .2s; text-decoration:none; display:inline-flex; align-items:center; gap:8px; white-space:nowrap; }
        .pd-call-btn:hover { background:var(--navy); color:var(--white); border-color:var(--navy); }

        .pd-trust-badges { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:24px; }
        .pd-trust-badge { display:flex; align-items:center; gap:10px; background:var(--cream); border:1px solid var(--cream3); border-radius:10px; padding:12px; }
        .pd-trust-badge-icon { font-size:20px; flex-shrink:0; }
        .pd-trust-badge-text { font-size:12px; color:var(--text2); font-weight:600; line-height:1.4; }

        .pd-specs { margin-top:28px; }
        .pd-specs-title { font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:700; color:var(--text3); text-transform:uppercase; letter-spacing:1px; margin-bottom:14px; padding-bottom:8px; border-bottom:1px solid var(--cream3); }
        .pd-specs-table { width:100%; border-collapse:collapse; font-size:13.5px; }
        .pd-specs-table tr { border-bottom:1px solid var(--cream3); }
        .pd-specs-table tr:last-child { border-bottom:none; }
        .pd-specs-table td:first-child { color:var(--text3); font-weight:600; padding:10px 0; font-family:'Barlow Condensed',sans-serif; text-transform:uppercase; letter-spacing:.3px; font-size:12px; width:40%; }
        .pd-specs-table td:last-child { color:var(--navy); font-weight:500; padding:10px 0; }

        .related-section { padding:60px 0; background:var(--cream); }
        .related-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:18px; margin-top:32px; }

        .added-toast { display:inline-flex; align-items:center; gap:8px; background:var(--green); color:var(--white); padding:10px 18px; border-radius:9px; font-size:13.5px; font-weight:700; }

        @media(max-width:900px) {
          .pd-grid { grid-template-columns:1fr; }
          .pd-img-box { position:static; }
          .pd-name { font-size:26px; }
        }
        @media(max-width:540px) {
          .pd-action-row { flex-wrap:wrap; }
          .pd-trust-badges { grid-template-columns:1fr; }
        }
      `}</style>

      {/* Breadcrumb */}
      <div className="pd-bc">
        <div className="container">
          <div className="pd-bc-inner">
            <Link href="/">Home</Link><span className="pd-bc-sep">/</span>
            <Link href="/products">Products</Link><span className="pd-bc-sep">/</span>
            <Link href={`/products?cat=${encodeURIComponent(product.category)}`}>{product.category}</Link><span className="pd-bc-sep">/</span>
            <span style={{color:'var(--navy)',fontWeight:600}}>{product.name}</span>
          </div>
        </div>
      </div>

      <div className="pd-main">
        <div className="container">
          <div className="pd-grid">
            {/* Left: Image */}
            <div>
              <div className="pd-img-box">
                <span className="pd-emoji">{emoji}</span>
                <div className="pd-img-badges">
                  <div className="pd-img-badge"><span>🏅</span>ISO Certified</div>
                  <div className="pd-img-badge"><span>🛡️</span>5 Yr Warranty</div>
                  <div className="pd-img-badge"><span>🇮🇳</span>Made in India</div>
                  <div className="pd-img-badge"><span>🚚</span>Pan India</div>
                </div>
              </div>
            </div>

            {/* Right: Info */}
            <div className="pd-info">
              <div className="pd-cat">{product.category}</div>
              <h1 className="pd-name">{product.name}</h1>
              <div className="pd-tag-row">
                <span className={`tag-badge ${tagClass}`}>{product.tag}</span>
                <span style={{fontSize:12,color:'var(--text3)'}}>HSN: {product.hsn}</span>
                <span style={{fontSize:12,color:'var(--text3)'}}>GST: {product.gst}%</span>
              </div>
              <p className="pd-desc">{product.desc}</p>

              {/* Price */}
              <div className="pd-price-box">
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                  <div>
                    <div className="pd-price-excl">{formatCurrency(product.priceExcl)}</div>
                    <div className="pd-price-label">Excl. GST ({product.gst}%)</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:20,fontWeight:900,fontFamily:"'Fraunces',serif",color:'var(--gold)'}}>{formatCurrency(inclPrice)}</div>
                    <div className="pd-price-label">Incl. GST</div>
                  </div>
                </div>
                <div className="pd-price-incl">Total incl. GST: <strong>{formatCurrency(inclPrice)}</strong></div>
                <div className="pd-gst-note">Price is ex-factory, Hubballi. Transport extra. GST invoice provided.</div>
              </div>

              {/* Qty */}
              <div className="pd-qty-row">
                <span className="pd-qty-label">Quantity:</span>
                <div className="pd-qty-ctrl">
                  <button className="pd-qty-btn" onClick={() => setQty(q => Math.max(1, q-1))}><FaMinus size={11}/></button>
                  <input className="pd-qty-val" type="number" min={1} value={qty} onChange={e => setQty(Math.max(1, parseInt(e.target.value)||1))} readOnly/>
                  <button className="pd-qty-btn" onClick={() => setQty(q => q+1)}><FaPlus size={11}/></button>
                </div>
              </div>

              {/* Actions */}
              <div className="pd-actions">
                <div className="pd-action-row">
                  {added ? (
                    <div className="added-toast pd-add-btn"><FaCheckCircle size={14}/> Added to Cart!</div>
                  ) : (
                    <button className="btn-navy pd-add-btn" onClick={addToCart}><FaShoppingCart size={14}/> Add to Cart</button>
                  )}
                  <Link href="/checkout" className="btn-gold pd-checkout-btn" onClick={() => { addToCart(); }}>Proceed to Enquiry →</Link>
                </div>
                <div className="pd-action-row">
                  <a href={`https://wa.me/918867099199?text=${waMsg}`} target="_blank" rel="noopener noreferrer" className="btn-wa pd-wa-btn"><FaWhatsapp size={15}/> WhatsApp Enquiry</a>
                  <a href="tel:+918867099199" className="pd-call-btn"><FaPhone size={13}/> Call Now</a>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pd-trust-badges">
                <div className="pd-trust-badge"><span className="pd-trust-badge-icon">🏅</span><span className="pd-trust-badge-text">ISO 9001:2015 Certified Quality</span></div>
                <div className="pd-trust-badge"><span className="pd-trust-badge-icon">🇮🇳</span><span className="pd-trust-badge-text">Made in India — Hubballi Plant</span></div>
                <div className="pd-trust-badge"><span className="pd-trust-badge-icon">🛡️</span><span className="pd-trust-badge-text">5-Year Gear Box Warranty</span></div>
                <div className="pd-trust-badge"><span className="pd-trust-badge-icon">🚚</span><span className="pd-trust-badge-text">Pan India Delivery & Installation</span></div>
              </div>

              {/* Specs */}
              <div className="pd-specs">
                <div className="pd-specs-title">Product Specifications</div>
                <table className="pd-specs-table">
                  <tbody>
                    <tr><td>Category</td><td>{product.category}</td></tr>
                    <tr><td>HSN Code</td><td>{product.hsn}</td></tr>
                    <tr><td>GST Rate</td><td>{product.gst}%</td></tr>
                    <tr><td>Price (Excl. GST)</td><td>{formatCurrency(product.priceExcl)}</td></tr>
                    <tr><td>Price (Incl. GST)</td><td>{formatCurrency(inclPrice)}</td></tr>
                    <tr><td>Warranty</td><td>{product.warranty}</td></tr>
                    <tr><td>Certifications</td><td>ISO 9001:2015, Made in India</td></tr>
                    <tr><td>Material</td><td>Stainless Steel / MS Body</td></tr>
                    <tr><td>Power</td><td>Electric (Single/Three Phase)</td></tr>
                    <tr><td>Manufacturer</td><td>Viraj Global Machinery, Hubballi</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="related-section">
          <div className="container">
            <div className="stag">You May Also Like</div>
            <h2 className="section-title">Related <em>Products</em></h2>
            <div className="related-grid">
              {related.map(p => <ProductCard key={p.id} product={p}/>)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ProductDetailProps> = async ({ params }) => {
  const { getAllProducts } = await import('../../lib/products');
  const products = getAllProducts();
  const id = Number(params?.id);
  const product = products.find(p => p.id === id) || null;
  if (!product) return { notFound: true };

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  return { props: { product, related } };
};
