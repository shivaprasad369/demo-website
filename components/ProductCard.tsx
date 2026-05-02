import { useState } from 'react';
import Link from 'next/link';
import { FaEye, FaShoppingCart } from 'react-icons/fa';
import { addProductToCart } from '../lib/cart';
import { formatCurrency, getCategoryEmoji, getInclusivePrice, getTagClass } from '../lib/productMeta';
import type { MouseEvent } from 'react';
import type { Product } from '../types/domain';

type ProductCardView = 'grid' | 'list';

interface ProductCardProps {
  product: Product;
  view?: ProductCardView;
}

interface ProductCardViewModel extends Product {
  added: boolean;
  href: string;
  emoji: string;
  tagClass: string;
  priceExclLabel: string;
  priceInclLabel: string;
  shortDescription: string;
}

interface InternalCardProps {
  card: ProductCardViewModel;
  onAddToCart: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function ProductCard({ product, view = 'grid' }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const card = buildProductCardViewModel(product, added);

  const handleAddToCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addProductToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <>
      {view === 'list' ? (
        <ProductListCard card={card} onAddToCart={handleAddToCart} />
      ) : (
        <ProductGridCard card={card} onAddToCart={handleAddToCart} />
      )}
      <ProductCardStyles />
    </>
  );
}

function buildProductCardViewModel(product: Product, added: boolean): ProductCardViewModel {
  const incl = getInclusivePrice(product.priceExcl, product.gst);

  return {
    ...product,
    added,
    href: `/products/${product.id}`,
    emoji: getCategoryEmoji(product.category),
    tagClass: getTagClass(product.tag),
    priceExclLabel: formatCurrency(product.priceExcl),
    priceInclLabel: formatCurrency(incl),
    shortDescription: product.desc ? `${product.desc.slice(0, 70)}...` : '',
  };
}

function ProductListCard({ card, onAddToCart }: InternalCardProps) {
  return (
    <div className="pcard-list">
      <div className="pcard-list-emoji">{card.emoji}</div>
      <div className="pcard-list-body">
        <div className="pcard-list-cat">{card.category}</div>
        <Link href={card.href} className="pcard-list-name">{card.name}</Link>
        <p className="pcard-list-desc">{card.desc}</p>
        <div className="pcard-list-meta">
          <span className={`tag-badge ${card.tagClass}`}>{card.tag}</span>
          <span className="pcard-list-hsn">HSN: {card.hsn}</span>
        </div>
      </div>
      <div className="pcard-list-right">
        <div className="pcard-price-main">{card.priceExclLabel}</div>
        <div className="pcard-price-incl">{card.priceInclLabel} incl. GST</div>
        <div className="pcard-list-actions">
          <Link href={card.href} className="btn-navy" style={{ padding: '9px 16px', fontSize: 12 }}>
            <FaEye size={11} /> View
          </Link>
          <button className="btn-gold" style={{ padding: '9px 14px', fontSize: 12 }} onClick={onAddToCart}>
            <FaShoppingCart size={11} /> {card.added ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductGridCard({ card, onAddToCart }: InternalCardProps) {
  return (
    <div className="pcard">
      <Link href={card.href} className="pcard-img-wrap">
        {card.tag && <span className={`tag-badge ${card.tagClass} pcard-tag`}>{card.tag}</span>}
        <div className="pcard-emoji">{card.emoji}</div>
      </Link>
      <div className="pcard-body">
        <div className="pcard-cat">{card.category}</div>
        <Link href={card.href} className="pcard-name">{card.name}</Link>
        <p className="pcard-desc">{card.shortDescription}</p>
        <div className="pcard-price-row">
          <div>
            <div className="pcard-price-main">{card.priceExclLabel}</div>
            <div className="pcard-price-gst">+{card.gst}% GST = {card.priceInclLabel}</div>
          </div>
        </div>
        <div className="pcard-actions">
          <button className="btn-gold pcard-cart-btn" style={{ flex: 1, padding: '10px', fontSize: 12, justifyContent: 'center' }} onClick={onAddToCart}>
            <FaShoppingCart size={12} /> {card.added ? 'Added!' : 'Add to Cart'}
          </button>
          <Link href={card.href} className="pcard-view-btn">
            <FaEye size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProductCardStyles() {
  return (
    <style>{`
      .pcard { background: var(--white); border: 1.5px solid #ebebeb; border-radius: 14px; overflow: hidden; transition: all .25s; display: flex; flex-direction: column; }
      .pcard:hover { border-color: var(--cream3); box-shadow: 0 8px 28px rgba(0,0,0,0.09); transform: translateY(-3px); }
      .pcard-img-wrap { display: block; background: linear-gradient(135deg, var(--cream) 0%, var(--cream2) 100%); padding: 28px; text-align: center; position: relative; border-bottom: 1px solid #f0e8d8; min-height: 130px; display: flex; align-items: center; justify-content: center; }
      .pcard-tag { position: absolute; top: 10px; left: 10px; }
      .pcard-emoji { font-size: 52px; line-height: 1; }
      .pcard-body { padding: 16px; display: flex; flex-direction: column; flex: 1; gap: 6px; }
      .pcard-cat { font-size: 11px; color: var(--text3); font-weight: 700; text-transform: uppercase; letter-spacing: .5px; font-family: 'Barlow Condensed', sans-serif; }
      .pcard-name { font-family: 'Fraunces', serif; font-size: 15px; font-weight: 700; color: var(--navy); line-height: 1.3; text-decoration: none; display: block; }
      .pcard-name:hover { color: var(--gold); }
      .pcard-desc { font-size: 12.5px; color: var(--text2); line-height: 1.55; flex: 1; }
      .pcard-price-row { margin-top: 4px; }
      .pcard-price-main { font-family: 'Fraunces', serif; font-size: 17px; font-weight: 900; color: var(--navy); }
      .pcard-price-gst { font-size: 11px; color: var(--text3); margin-top: 2px; }
      .pcard-actions { display: flex; gap: 8px; margin-top: 8px; }
      .pcard-cart-btn { display: inline-flex; align-items: center; gap: 6px; border-radius: 8px; border: none; cursor: pointer; }
      .pcard-view-btn { width: 38px; height: 38px; border-radius: 8px; background: var(--cream); border: 1.5px solid var(--cream3); display: flex; align-items: center; justify-content: center; color: var(--text2); transition: all .2s; flex-shrink: 0; }
      .pcard-view-btn:hover { border-color: var(--gold); color: var(--gold); }

      .pcard-list { display: flex; align-items: center; gap: 20px; background: var(--white); border: 1.5px solid #ebebeb; border-radius: 14px; padding: 18px; transition: all .25s; }
      .pcard-list:hover { border-color: var(--cream3); box-shadow: 0 4px 16px rgba(0,0,0,0.07); }
      .pcard-list-emoji { font-size: 42px; width: 70px; height: 70px; background: var(--cream); border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .pcard-list-body { flex: 1; min-width: 0; }
      .pcard-list-cat { font-size: 11px; color: var(--text3); font-weight: 700; text-transform: uppercase; letter-spacing: .5px; font-family: 'Barlow Condensed', sans-serif; margin-bottom: 3px; }
      .pcard-list-name { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 700; color: var(--navy); text-decoration: none; display: block; margin-bottom: 5px; }
      .pcard-list-name:hover { color: var(--gold); }
      .pcard-list-desc { font-size: 13px; color: var(--text2); line-height: 1.55; margin-bottom: 8px; }
      .pcard-list-meta { display: flex; align-items: center; gap: 10px; }
      .pcard-list-hsn { font-size: 11px; color: var(--text3); }
      .pcard-list-right { text-align: right; flex-shrink: 0; }
      .pcard-price-incl { font-size: 11.5px; color: var(--text3); margin-top: 3px; }
      .pcard-list-actions { display: flex; gap: 8px; margin-top: 12px; justify-content: flex-end; }
    `}</style>
  );
}
