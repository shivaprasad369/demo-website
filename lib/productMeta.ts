export const CATEGORY_EMOJI: Record<string, string> = {
  'Roti Making Machine': '🫓',
  'Atta Dough Mixer': '🌾',
  'Gravy Machine': '🍲',
  '2-in-1 Pulverizer': '⚙️',
  'Flour Mill': '🌀',
  'Vegetable Cutting Machine': '🥬',
  'Chapati Bhatti': '🔥',
  'Commercial Stove': '🍳',
  'Flour Mixing Machine': '🥣',
  'Wet Grinder': '🌿',
  'Juice Machine': '🥤',
  'Potato Peeler Machine': '🥔',
  'Dryer Machine': '💨',
  'Deep Fryer': '🍟',
  'Garlic Peeler Machine': '🧄',
  'Oil Making Machine': '🌻',
  'Other Machines': '🔧',
};

const FEATURED_TAGS = ['Popular', 'Bestseller', 'Premium', 'Industrial', 'Commercial'];

export function getCategoryEmoji(category: string): string {
  return CATEGORY_EMOJI[category] || '⚙️';
}

export function getTagClass(tag: string): string {
  return FEATURED_TAGS.includes(tag) ? `tag-${tag}` : 'tag-default';
}

export function getInclusivePrice(priceExcl: number, gst: number): number {
  return Math.round(Number(priceExcl || 0) * (1 + Number(gst || 0) / 100));
}

export function formatCurrency(value: number): string {
  return `₹${Number(value || 0).toLocaleString('en-IN')}`;
}
