import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaTrash, FaMinus, FaPlus, FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import { CART_EVENT, getCartTotals, readCart, writeCart } from '../lib/cart';
import { formatCurrency, getCategoryEmoji, getInclusivePrice } from '../lib/productMeta';
import type { CartItem } from '../types/domain';

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = () => setCart(readCart());
    load(); setLoaded(true);
    window.addEventListener(CART_EVENT, load);
    return () => window.removeEventListener(CART_EVENT, load);
  }, []);

  const save = (c: CartItem[]) => { writeCart(c); setCart(c); };
  const updateQty = (id: number, delta: number) => { const c = cart.map(i => i.id === id ? {...i, qty: Math.max(1, i.qty + delta)} : i); save(c); };
  const remove = (id: number) => save(cart.filter(i => i.id !== id));
  const clear = () => save([]);

  const { totalExcl, totalGst, totalIncl, itemCount } = getCartTotals(cart);
  const waMsg = cart.map(i => `${i.name} x${i.qty}`).join(', ');

  return (
    <>
      <Head>
        <title>Cart — Viraj Global Machinery</title>
      </Head>
      <style>{`
        .cart-hero { background:var(--navy); padding:36px 0; }
        .cart-hero h1 { font-family:'Fraunces',serif; font-size:32px; font-weight:900; color:var(--white); }
        .cart-hero h1 em { font-style:italic; color:var(--gold2); }
        .cart-bc { display:flex; gap:6px; font-size:12px; color:rgba(255,255,255,0.4); margin-bottom:10px; }
        .cart-bc a { color:rgba(255,255,255,0.5); text-decoration:none; }
        .cart-bc a:hover { color:var(--gold3); }

        .cart-layout { display:grid; grid-template-columns:1fr 340px; gap:28px; padding:36px 0 60px; align-items:start; }
        .cart-section { background:var(--white); border:1.5px solid var(--cream3); border-radius:16px; overflow:hidden; }
        .cart-section-header { padding:18px 22px; border-bottom:1px solid var(--cream3); display:flex; justify-content:space-between; align-items:center; }
        .cart-section-title { font-family:'Fraunces',serif; font-size:18px; font-weight:700; color:var(--navy); }
        .cart-clear-btn { background:none; border:1.5px solid var(--cream3); border-radius:7px; padding:6px 12px; font-size:12px; color:var(--text3); cursor:pointer; transition:all .2s; }
        .cart-clear-btn:hover { border-color:var(--red-err); color:var(--red-err); }

        .cart-item { display:flex; align-items:center; gap:16px; padding:18px 22px; border-bottom:1px solid var(--cream3); }
        .cart-item:last-child { border-bottom:none; }
        .cart-item-emoji { font-size:36px; width:60px; height:60px; background:var(--cream); border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .cart-item-info { flex:1; min-width:0; }
        .cart-item-cat { font-size:11px; color:var(--text3); font-weight:700; text-transform:uppercase; letter-spacing:.5px; font-family:'Barlow Condensed',sans-serif; margin-bottom:3px; }
        .cart-item-name { font-family:'Fraunces',serif; font-size:15px; font-weight:700; color:var(--navy); margin-bottom:5px; line-height:1.3; }
        .cart-item-price { font-size:13px; color:var(--text2); }
        .cart-item-right { display:flex; align-items:center; gap:14px; flex-shrink:0; }
        .cart-qty { display:flex; align-items:center; border:1.5px solid var(--cream3); border-radius:8px; overflow:hidden; }
        .cart-qty-btn { width:30px; height:30px; background:var(--cream); border:none; cursor:pointer; font-size:12px; color:var(--text2); transition:all .2s; display:flex; align-items:center; justify-content:center; }
        .cart-qty-btn:hover { background:var(--navy); color:var(--white); }
        .cart-qty-val { width:36px; height:30px; border:none; border-left:1.5px solid var(--cream3); border-right:1.5px solid var(--cream3); background:var(--white); text-align:center; font-size:14px; font-weight:700; color:var(--navy); font-family:'Fraunces',serif; }
        .cart-item-total { font-family:'Fraunces',serif; font-size:16px; font-weight:900; color:var(--navy); min-width:90px; text-align:right; }
        .cart-item-total small { display:block; font-size:11px; color:var(--text3); font-family:'Barlow',sans-serif; font-weight:400; }
        .cart-remove { background:none; border:none; cursor:pointer; color:var(--text3); padding:6px; transition:color .2s; }
        .cart-remove:hover { color:var(--red-err); }

        .summary-box { background:var(--white); border:1.5px solid var(--cream3); border-radius:16px; padding:24px; position:sticky; top:100px; }
        .summary-title { font-family:'Fraunces',serif; font-size:18px; font-weight:700; color:var(--navy); margin-bottom:18px; padding-bottom:12px; border-bottom:1px solid var(--cream3); }
        .summary-row { display:flex; justify-content:space-between; align-items:center; font-size:14px; color:var(--text2); margin-bottom:10px; }
        .summary-total { display:flex; justify-content:space-between; align-items:center; font-family:'Fraunces',serif; font-size:20px; font-weight:900; color:var(--navy); margin:14px 0; padding-top:14px; border-top:2px solid var(--navy); }
        .b2b-note { background:var(--goldl); border:1px solid var(--goldl2); border-radius:10px; padding:12px 14px; font-size:12.5px; color:var(--text2); line-height:1.65; margin:14px 0; }
        .summary-btns { display:flex; flex-direction:column; gap:10px; margin-top:16px; }

        .empty-cart { text-align:center; padding:60px 24px; }
        .empty-cart-icon { font-size:56px; margin-bottom:16px; }
        .empty-cart-title { font-family:'Fraunces',serif; font-size:24px; font-weight:700; color:var(--navy); margin-bottom:8px; }
        .empty-cart-sub { font-size:14px; color:var(--text2); margin-bottom:24px; }

        @media(max-width:900px) { .cart-layout { grid-template-columns:1fr; } .summary-box { position:static; } }
        @media(max-width:540px) { .cart-item { flex-wrap:wrap; } .cart-item-right { width:100%; justify-content:space-between; } }
      `}</style>

      <div className="cart-hero">
        <div className="container">
          <div className="cart-bc"><Link href="/">Home</Link><span>/</span><span>Cart</span></div>
          <h1>My <em>Cart</em></h1>
        </div>
      </div>

      <div className="container">
        {!loaded || cart.length === 0 ? (
          <div className="empty-cart" style={{paddingTop:60}}>
            <div className="empty-cart-icon">🛒</div>
            <div className="empty-cart-title">Your cart is empty</div>
            <div className="empty-cart-sub">Add machines from our product catalogue to proceed with enquiry</div>
            <Link href="/products" className="btn-gold">Browse All Products →</Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Cart Items */}
            <div>
              <div className="cart-section">
                <div className="cart-section-header">
                  <div className="cart-section-title">Cart ({itemCount} items)</div>
                  <button className="cart-clear-btn" onClick={clear}>Clear All</button>
                </div>
                {cart.map(item => {
                  const exclTotal = item.priceExcl * item.qty;
                  const inclTotal = getInclusivePrice(exclTotal, item.gst);
                  return (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-emoji">{getCategoryEmoji(item.category)}</div>
                      <div className="cart-item-info">
                        <div className="cart-item-cat">{item.category}</div>
                        <Link href={`/products/${item.id}`} className="cart-item-name" style={{textDecoration:'none'}}>{item.name}</Link>
                        <div className="cart-item-price">{formatCurrency(item.priceExcl)} excl. GST per unit</div>
                      </div>
                      <div className="cart-item-right">
                        <div className="cart-qty">
                          <button className="cart-qty-btn" onClick={()=>updateQty(item.id,-1)}><FaMinus size={9}/></button>
                          <div className="cart-qty-val">{item.qty}</div>
                          <button className="cart-qty-btn" onClick={()=>updateQty(item.id,1)}><FaPlus size={9}/></button>
                        </div>
                        <div className="cart-item-total">
                          {formatCurrency(inclTotal)}
                          <small>incl. GST</small>
                        </div>
                        <button className="cart-remove" onClick={()=>remove(item.id)} title="Remove"><FaTrash size={13}/></button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div className="summary-box">
              <div className="summary-title">Order Summary</div>
              <div className="summary-row"><span>Subtotal (excl. GST)</span><span>{formatCurrency(totalExcl)}</span></div>
              <div className="summary-row"><span>GST (avg.)</span><span>{formatCurrency(totalGst)}</span></div>
              <div className="summary-total"><span>Total</span><span>{formatCurrency(totalIncl)}</span></div>
              <div className="b2b-note">💼 <strong>B2B Note:</strong> Final price confirmed after enquiry. Transport charges extra. GST invoice provided on purchase.</div>
              <div className="summary-btns">
                <Link href="/checkout" className="btn-gold" style={{justifyContent:'center',padding:'14px'}}>
                  <FaArrowRight size={13}/> Proceed to Enquiry
                </Link>
                <a href={`https://wa.me/918867099199?text=Hello%2C%20I%20want%20to%20enquire%20about%3A%20${encodeURIComponent(waMsg)}`} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{justifyContent:'center',padding:'14px'}}>
                  <FaWhatsapp size={15}/> Send WhatsApp Quote
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
