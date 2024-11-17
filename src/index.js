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
function createStore(name) {
  /**
   * @type StoreType
   */
  return {
    name,
    products: [],
    isValidProduct(product) {
      return (
        'name' in product &&
        typeof product.name === 'string' &&
        'count' in product &&
        typeof product.count === 'number' &&
        'price' in product &&
        typeof product.price === 'number'
      );
    },
    getProductsCount() {
      return this.products.length;
    },
    addProduct(newProduct) {
      if (this.products.find((product) => product.name === newProduct.name)) {
        console.log('Product existed');
        return;
      }

      if (!this.isValidProduct(newProduct)) {
        console.log('Product invalid');
        return;
      }

      this.products.push(newProduct);
    },
    updateProductCountByName(searchedName, count) {
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
    },
    getFullPrice() {
      return this.products.reduce((acc, currentValue) => {
        return acc + currentValue.count * currentValue.price;
      }, 0);
    },
    getCountByProductName(searchName) {
      const product = this.products.find(
        (productItem) => productItem.name === searchName,
      );

      if (product) {
        return product.count;
      }

      console.log('Not existed product');
    },
  };
}

export const ob = createStore();
