import path from 'path';
import { PRODUCTS } from '../data/products';
import { readJsonFile, writeJsonFile } from './jsonFile';
import type { Product, ProductOverride } from '../types/domain';

const DYNAMIC_PRODUCTS_FILE = path.join(process.cwd(), 'data', 'products-dynamic.json');

export function mergeProducts(baseProducts: Product[] = PRODUCTS, dynamicProducts: ProductOverride[] = []): Product[] {
  const productMap: Record<number, Product> = {};

  baseProducts.forEach(product => {
    productMap[product.id] = { ...product };
  });

  dynamicProducts.forEach(product => {
    if (product._deleted) {
      delete productMap[product.id];
      return;
    }

    productMap[product.id] = { ...productMap[product.id], ...product } as Product;
  });

  return Object.values(productMap).sort((a, b) => Number(a.id) - Number(b.id));
}

export function readDynamicProducts(): ProductOverride[] {
  return readJsonFile<ProductOverride[]>(DYNAMIC_PRODUCTS_FILE, []);
}

export function writeDynamicProducts(products: ProductOverride[]): void {
  writeJsonFile(DYNAMIC_PRODUCTS_FILE, products);
}

export function getAllProducts(): Product[] {
  return mergeProducts(PRODUCTS, readDynamicProducts());
}
