/**
 * @typedef Product
 * @property {string} name
 * @property {number} count
 * @property {number} price
 */

/**
 * @typedef StoreType
 * @property {() => number} getFullPrice
 * @property {() => number} getProductsCount
 * @property {(Product) => void} addProduct
 * @property {(string) => number} getCountByProductName
 * @property {(searchedName: string, count: number) => number} updateProductCountByName
 * @property {string} name
 * @property {Product[]} products
 * @property {(Product) => boolean} isValidProduct
 */

/**
 * @param {string} name
 */
export function Store(name) {
  /**
   * @type StoreType
   */
  this.name = name;
  this.products = [];
  this.isValidProduct = function (product) {
    return (
      'name' in product &&
      typeof product.name === 'string' &&
      'count' in product &&
      typeof product.count === 'number' &&
      'price' in product &&
      typeof product.price === 'number'
    );
  };
  this.getProductsCount = function () {
    return this.products.length;
  };
  this.addProduct = function (newProduct) {
    if (this.products.find((product) => product.name === newProduct.name)) {
      console.log('Product existed');
      return;
    }

    if (!this.isValidProduct(newProduct)) {
      console.log('Product invalid');
      return;
    }

    this.products.push(newProduct);
  };
  this.updateProductCountByName = function (searchedName, count) {
    const currentProduct = this.products.find(
      (product) => product.name === searchedName,
    );

    if (!currentProduct) {
      console.log('Not existed product');
      return;
    }

    currentProduct.count += count;
    console.log(
      `Product ${currentProduct.name} updated count. Current count - ${currentProduct.count}`,
    );
  };
  this.getFullPrice = function () {
    return this.products.reduce((acc, currentValue) => {
      return acc + currentValue.count * currentValue.price;
    }, 0);
  };
  this.getCountByProductName = function (searchName) {
    const product = this.products.find(
      (productItem) => productItem.name === searchName,
    );

    if (product) {
      return product.count;
    }

    console.log('Not existed product');
  };
}

export const ob = new Store();

// this.products = [
// { name: 'Milk', count: 10, price: 2, },
// { name: 'Meat', count: 5, price: 8, }
// { name: 'Cheese', count: 10, price: 4, }
// ]

// 1st iteration; acc = 0; currentValue = { name: 'Milk', count: 10, price: 2, },
// return 20
// 2nd iteration; acc = 20; currentValue = { name: 'Meat', count: 5, price: 8, }
// return 60
// 3rd iteration; acc = 60; currentValue = { name: 'Cheese', count: 10, price: 4,

