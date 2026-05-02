import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <>
      <style>{`
        .footer { background: var(--navy2); color: #fff; padding: 60px 0 0; border-top: 1px solid rgba(255,255,255,0.05); }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.4fr; gap: 44px; margin-bottom: 44px; }
        .f-brand { font-family: 'Fraunces', serif; font-size: 21px; font-weight: 700; color: #fff; margin-bottom: 6px; }
        .f-tagline { font-size: 13px; color: rgba(255,255,255,0.4); font-style: italic; margin-bottom: 16px; }
        .f-desc { font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.85; margin-bottom: 18px; }
        .f-iso { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.5); font-size: 11px; font-weight: 700; padding: 5px 14px; border-radius: 20px; font-family: 'Barlow Condensed', sans-serif; letter-spacing: .5px; text-transform: uppercase; }
        .f-socials { display: flex; gap: 8px; margin-top: 16px; }
        .f-social { width: 34px; height: 34px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.5); transition: all .2s; }
        .f-social:hover { background: var(--gold); border-color: var(--gold); color: var(--navy); }
        .f-heading { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.85); text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.07); font-family: 'Barlow Condensed', sans-serif; }
        .f-link { display: block; font-size: 13px; color: rgba(255,255,255,0.45); text-decoration: none; margin-bottom: 9px; transition: color .2s; }
        .f-link:hover { color: var(--gold3); }
        .f-link.gold { color: rgba(200,134,10,0.7); }
        .f-contact { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; }
        .f-contact-icon { color: var(--gold); margin-top: 2px; flex-shrink: 0; }
        .f-contact-text { font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.7; }
        .f-contact-text a { color: rgba(255,255,255,0.65); transition: color .2s; }
        .f-contact-text a:hover { color: #fff; }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.07); padding: 20px 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
        .f-copy { font-size: 12px; color: rgba(255,255,255,0.3); }
        .f-legal { display: flex; gap: 16px; }
        .f-legal a { font-size: 12px; color: rgba(255,255,255,0.3); text-decoration: none; transition: color .2s; }
        .f-legal a:hover { color: rgba(255,255,255,0.65); }
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; gap: 28px; } }
        @media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr; } .footer-bottom { flex-direction: column; text-align: center; } }
      `}</style>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="f-brand">Viraj Global Machinery</div>
              <div className="f-tagline">"Trusted Products. Trusted Solutions."</div>
              <div className="f-desc">ISO 9001:2015 certified manufacturer of commercial food processing machinery. Serving hotels, restaurants, temples, catering businesses and industrial kitchens across India since 2014.</div>
              <div className="f-iso">✅ ISO 9001:2015 Certified · GST Verified</div>
              <div className="f-socials">
                <a href="#" className="f-social" aria-label="Instagram"><FaInstagram size={14}/></a>
                <a href="#" className="f-social" aria-label="Facebook"><FaFacebook size={14}/></a>
                <a href="#" className="f-social" aria-label="YouTube"><FaYoutube size={14}/></a>
                <a href="#" className="f-social" aria-label="LinkedIn"><FaLinkedin size={14}/></a>
              </div>
            </div>
            <div>
              <div className="f-heading">Quick Links</div>
              <Link href="/" className="f-link">Home</Link>
              <Link href="/products" className="f-link">All Products</Link>
              <Link href="/#about" className="f-link">About Us</Link>
              <Link href="/#contact" className="f-link">Contact Us</Link>
              <Link href="/cart" className="f-link">Cart</Link>
              <Link href="/auth" className="f-link">Login / Register</Link>
            </div>
            <div>
              <div className="f-heading">Our Products</div>
              <Link href="/products?cat=Roti+Making+Machine" className="f-link">Roti Making Machines</Link>
              <Link href="/products?cat=Atta+Dough+Mixer" className="f-link">Atta Dough Mixers</Link>
              <Link href="/products?cat=2-in-1+Pulverizer" className="f-link">Pulverizer Machines</Link>
              <Link href="/products?cat=Gravy+Machine" className="f-link">Gravy Machines</Link>
              <Link href="/products?cat=Chapati+Bhatti" className="f-link">Chapati Bhatti</Link>
              <Link href="/products?cat=Commercial+Stove" className="f-link">Commercial Stoves</Link>
              <Link href="/products" className="f-link gold">View All 62+ Products →</Link>
            </div>
            <div>
              <div className="f-heading">Contact Us</div>
              <div className="f-contact"><FaMapMarkerAlt className="f-contact-icon" size={13}/><div className="f-contact-text">64/G/2, Pavan Industry, Tarihal Industrial Area, Hubballi – 580026</div></div>
              <div className="f-contact"><FaPhone className="f-contact-icon" size={12}/><div className="f-contact-text"><a href="tel:+919035777333">+91 90357 77333</a> (Owner)<br/><a href="tel:+918867099199">+91 88670 99199</a> (Sales)</div></div>
              <div className="f-contact"><FaWhatsapp className="f-contact-icon" size={14}/><div className="f-contact-text"><a href="https://wa.me/918867099199" target="_blank" rel="noopener noreferrer">+91 88670 99199</a></div></div>
              <div className="f-contact"><FaEnvelope className="f-contact-icon" size={12}/><div className="f-contact-text"><a href="mailto:virajglobalmachinery@gmail.com">virajglobalmachinery@gmail.com</a></div></div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="f-copy">© {new Date().getFullYear()} Viraj Global Machinery. All rights reserved. · GST: 29BBNPJ6341J1Z7</div>
            <div className="f-legal">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms">Terms & Conditions</Link>
              <Link href="/sitemap.xml">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
