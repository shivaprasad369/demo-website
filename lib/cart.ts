import type { CartItem, CartTotals, Product } from '../types/domain';

const CART_KEY = 'vgm_cart';
const CART_EVENT = 'vgm_cart_update';

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

export function readCart(): CartItem[] {
  if (!canUseStorage()) return [];

  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]') as CartItem[];
  } catch {
    return [];
  }
}

export function writeCart(cart: CartItem[]): void {
  if (!canUseStorage()) return;

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event(CART_EVENT));
}

export function clearCart(): void {
  writeCart([]);
}

export function addProductToCart(product: Product, qty = 1): CartItem[] {
  const cart = readCart();
  const id = Number(product.id);
  const existing = cart.find(item => Number(item.id) === id);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id,
      name: product.name,
      category: product.category,
      priceExcl: Number(product.priceExcl || 0),
      gst: Number(product.gst || 0),
      qty,
    });
  }

  writeCart(cart);
  return cart;
}

export function getCartTotals(cart: CartItem[]): CartTotals {
  return cart.reduce(
    (totals, item) => {
      const lineExcl = Number(item.priceExcl || 0) * Number(item.qty || 0);
      const lineGst = Math.round(lineExcl * Number(item.gst || 0) / 100);

      totals.totalExcl += lineExcl;
      totals.totalGst += lineGst;
      totals.totalIncl += lineExcl + lineGst;
      totals.itemCount += Number(item.qty || 0);
      return totals;
    },
    { totalExcl: 0, totalGst: 0, totalIncl: 0, itemCount: 0 } satisfies CartTotals
  );
}

export { CART_EVENT };
