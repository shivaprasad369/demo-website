import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaBars, FaTimes, FaPhone, FaWhatsapp, FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { CART_EVENT, getCartTotals, readCart } from '../lib/cart';
import type { PublicUser } from '../types/domain';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState<PublicUser | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const updateCart = () => {
      setCartCount(getCartTotals(readCart()).itemCount);
    };
    const updateUser = () => {
      const u = localStorage.getItem('vgm_user');
      setUser(u ? JSON.parse(u) as PublicUser : null);
    };
    updateCart(); updateUser();
    window.addEventListener(CART_EVENT, updateCart);
    window.addEventListener('vgm_user_update', updateUser);
    window.addEventListener('storage', updateCart);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener(CART_EVENT, updateCart);
      window.removeEventListener('vgm_user_update', updateUser);
      window.removeEventListener('storage', updateCart);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('vgm_user');
    setUser(null);
    window.dispatchEvent(new Event('vgm_user_update'));
    router.push('/');
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      <style>{`
        .topbar { background: var(--navy); padding: 7px 0; font-size: 12px; color: rgba(255,255,255,0.55); }
        .topbar-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
        .topbar a { color: rgba(255,255,255,0.65); transition: color .2s; padding: 0 12px; border-left: 1px solid rgba(255,255,255,0.1); }
        .topbar a:first-child { border-left: none; }
        .topbar a:hover { color: var(--gold3); }
        .tb-left { display: flex; align-items: center; gap: 16px; font-size: 12px; }
        .tb-sep { color: rgba(255,255,255,0.2); }

        .navbar { background: var(--white); border-bottom: 1px solid rgba(0,0,0,0.08); position: sticky; top: 0; z-index: 500; transition: box-shadow .3s; }
        .navbar.scrolled { box-shadow: 0 2px 20px rgba(0,0,0,0.1); }
        .navbar-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; height: 70px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }

        .logo { display: flex; align-items: center; gap: 12px; text-decoration: none; flex-shrink: 0; }
        .logo-icon { width: 46px; height: 46px; background: var(--navy); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; overflow: hidden; }
        .logo-name { font-family: 'Fraunces', serif; font-size: 17px; font-weight: 700; color: var(--navy); line-height: 1.1; }
        .logo-sub { font-family: 'Barlow Condensed', sans-serif; font-size: 10px; color: var(--text3); letter-spacing: 1px; text-transform: uppercase; font-weight: 600; }

        .nav-links { display: flex; list-style: none; gap: 2px; align-items: center; }
        .nav-links a { color: var(--text2); font-size: 14px; font-weight: 500; padding: 8px 14px; border-radius: 7px; transition: all .2s; white-space: nowrap; }
        .nav-links a:hover, .nav-links a.active { color: var(--navy); background: var(--cream); }

        .navbar-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .nav-iso { background: var(--cream); border: 1px solid var(--cream3); color: var(--text3); font-size: 11px; font-weight: 700; padding: 5px 12px; border-radius: 20px; white-space: nowrap; font-family: 'Barlow Condensed', sans-serif; letter-spacing: .5px; text-transform: uppercase; }
        .nav-cart { position: relative; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 9px; background: var(--cream); border: 1.5px solid var(--cream3); color: var(--text2); transition: all .2s; cursor: pointer; text-decoration: none; }
        .nav-cart:hover { border-color: var(--gold); color: var(--gold); }
        .cart-badge { position: absolute; top: -6px; right: -6px; background: var(--gold); color: var(--navy); width: 18px; height: 18px; border-radius: 50%; font-size: 10px; font-weight: 800; display: flex; align-items: center; justify-content: center; }
        .nav-user { display: flex; align-items: center; gap: 6px; background: var(--cream); border: 1.5px solid var(--cream3); color: var(--text2); font-size: 12.5px; font-weight: 600; padding: 7px 12px; border-radius: 9px; cursor: pointer; text-decoration: none; transition: all .2s; white-space: nowrap; }
        .nav-user:hover { border-color: var(--gold); color: var(--navy); }
        .nav-logout { background: none; border: 1.5px solid var(--cream3); color: var(--text3); padding: 7px 10px; border-radius: 9px; cursor: pointer; transition: all .2s; display: flex; align-items: center; }
        .nav-logout:hover { border-color: var(--red-err); color: var(--red-err); }
        .nav-cta { background: var(--gold); color: var(--white); border: none; padding: 10px 18px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; white-space: nowrap; transition: all .2s; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; font-family: 'Barlow Condensed', sans-serif; letter-spacing: .5px; text-transform: uppercase; }
        .nav-cta:hover { background: var(--gold2); }

        .hamburger { display: none; background: none; border: none; color: var(--navy); font-size: 22px; cursor: pointer; padding: 4px; }
        .mobile-menu { display: none; background: var(--white); border-top: 1px solid var(--cream3); padding: 16px 24px 24px; }
        .mobile-menu.open { display: block; }
        .mobile-menu a { display: block; padding: 13px 0; color: var(--text); font-size: 15px; font-weight: 500; border-bottom: 1px solid var(--cream3); }
        .mobile-menu a:hover { color: var(--gold); }
        .mobile-btns { display: flex; gap: 10px; margin-top: 16px; flex-wrap: wrap; }

        @media (max-width: 960px) { .nav-links, .nav-iso { display: none; } .hamburger { display: block; } }
        @media (max-width: 480px) { .logo-name { font-size: 14px; } .topbar { display: none; } }
      `}</style>

      <div className="topbar">
        <div className="topbar-inner">
          <div className="tb-left">
            <span>📍 Tarihal Industrial Area, Hubballi – 580026</span>
            <span className="tb-sep">|</span>
            <span>✅ ISO 9001:2015 Certified</span>
          </div>
          <div>
            <a href="tel:+919035777333"><FaPhone size={10} style={{marginRight:4}}/>+91 90357 77333</a>
            <a href="mailto:virajglobalmachinery@gmail.com">virajglobalmachinery@gmail.com</a>
          </div>
        </div>
      </div>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link href="/" className="logo">
            <div className="logo-icon">
              <Image src="/logo.png" alt="VGM Logo" width={46} height={46} style={{objectFit:'contain'}} priority />
            </div>
            <div>
              <div className="logo-name">Viraj Global Machinery</div>
              <div className="logo-sub">Hubballi · Est. 2014</div>
            </div>
          </Link>

          <ul className="nav-links">
            {navLinks.map(l => (
              <li key={l.href}>
                <Link href={l.href} className={router.pathname === l.href ? 'active' : ''}>{l.label}</Link>
              </li>
            ))}
          </ul>

          <div className="navbar-right">
            <span className="nav-iso">🏅 ISO 9001:2015</span>
            <Link href="/cart" className="nav-cart">
              <FaShoppingCart size={16} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            {user ? (
              <>
                <Link href="/auth" className="nav-user"><FaUser size={12} /> {user.name?.split(' ')[0]}</Link>
                <button className="nav-logout" onClick={logout} title="Logout"><FaSignOutAlt size={13} /></button>
              </>
            ) : (
              <Link href="/auth" className="nav-user"><FaUser size={12} /> Login</Link>
            )}
            <Link href="/#contact" className="nav-cta">Get Free Quote</Link>
          </div>

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(l => <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</Link>)}
          {user && <a onClick={() => { logout(); setMenuOpen(false); }} style={{cursor:'pointer',color:'var(--red-err)'}}>Logout ({user.name?.split(' ')[0]})</a>}
          <div className="mobile-btns">
            <Link href="/#contact" className="btn-gold" style={{fontSize:13}} onClick={() => setMenuOpen(false)}>Get Free Quote</Link>
            <a href="https://wa.me/918867099199" target="_blank" rel="noopener noreferrer" className="btn-wa" style={{fontSize:13}}>
              <FaWhatsapp size={15} /> WhatsApp
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
