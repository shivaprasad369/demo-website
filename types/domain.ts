export interface Product {
  id: number;
  name: string;
  category: string;
  priceExcl: number;
  gst: number;
  hsn: string;
  desc: string;
  warranty: string;
  tag: string;
  featured: boolean;
  _custom?: boolean;
  _deleted?: boolean;
}

export type ProductOverride = Partial<Product> & Pick<Product, 'id'>;

export interface CartItem {
  id: number;
  name: string;
  category: string;
  priceExcl: number;
  gst: number;
  qty: number;
}

export interface CartTotals {
  totalExcl: number;
  totalGst: number;
  totalIncl: number;
  itemCount: number;
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
}

export type PublicUser = Omit<UserRecord, 'password'>;

export interface Enquiry {
  id: string;
  createdAt: string;
  status: 'Pending' | 'Contacted' | string;
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  company: string;
  machine: string;
  notes: string;
  products: string[];
  totalExcl: number;
  totalIncl: number;
}
