import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { FaWhatsapp, FaArrowUp } from 'react-icons/fa';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isAdmin = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      <Component {...pageProps} />
      {!isAdmin && <Footer />}
      {!isAdmin && (
        <>
          <a
            href="https://wa.me/918867099199?text=Hello%20Viraj%20Global%20Machinery%2C%20I%20am%20interested%20in%20your%20machines."
            target="_blank" rel="noopener noreferrer"
            className="wa-float" aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp color="#fff" size={26} />
          </a>
          <button
            className={`back-top ${showTop ? 'visible' : ''}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <FaArrowUp size={14} />
          </button>
        </>
      )}
    </>
  );
}
