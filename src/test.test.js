import { describe, expect, it } from 'vitest';

import { Store } from './index';

describe('Test store', () => {
  it('should create store', () => {
    const store = new Store('Test store');

    expect(store.name).toBe('Test store');
    expect(store.products).toEqual([]);
  });

  it('should add product', () => {
    const store = new Store('Test store');
    store.addProduct({ name: 'Product 1', count: 10, price: 100 });

    expect(store.products).toEqual([
      { name: 'Product 1', count: 10, price: 100 },
    ]);
  });

  it('should not add existed product', () => {
    const store = new Store('Test store');
    store.addProduct({ name: 'Product 1', count: 10, price: 100 });
    store.addProduct({ name: 'Product 1', count: 10, price: 100 });

    expect(store.products).toEqual([
      { name: 'Product 1', count: 10, price: 100 },
    ]);
  });

  it('should not add invalid product', () => {
    const store = new Store('Test store');
    store.addProduct({ name: 'Product 1', count: 10 });

    expect(store.products).toEqual([]);
  });

  it('should get products count', () => {
    const store = new Store('Test store');
    store.addProduct({ name: 'Product 1', count: 10, price: 100 });
    store.addProduct({ name: 'Product 2', count: 20, price: 200 });

    expect(store.getProductsCount()).toBe(2);
  });

  it('should update product count', () => {
    const store = new Store('Test store');
    store.addProduct({ name: 'Product 1', count: 10, price: 100 });
    store.updateProductCountByName('Product 1', 5);

    expect(store.products).toEqual([
      { name: 'Product 1', count: 15, price: 100 },
    ]);
  });

  it('should not update not existed product', () => {
    const store = new Store('Test store');
    store.updateProductCountByName('Product 1', 5);

    expect(store.products).toEqual([]);
  });

  it('should get count by product name', () => {
    const store = new Store('Test store');
    store.addProduct({ name: 'Product 1', count: 10, price: 100 });

    expect(store.getCountByProductName('Product 1')).toBe(10);
  });

  it('should not get count by not existed product name', () => {
    const store = new Store('Test store');
    store.getCountByProductName('Product 1');

    expect(store.products).toEqual([]);
  });

  it('should get full price', () => {
    const store = new Store('Test store');
    store.addProduct({ name: 'Product 1', count: 10, price: 100 });
    store.addProduct({ name: 'Product 2', count: 20, price: 200 });

    expect(store.getFullPrice()).toBe(5000);
  });
});
